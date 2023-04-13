import { render, screen, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Search from '../Search.svelte';
import { loadingStore } from '$lib/stores/loadingStore';
import { goto } from '$app/navigation';
import { vi } from 'vitest';

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));

describe('YourSearch', () => {
  beforeEach(() => {
    goto('https://example.com'); // set initial page pathname
  });

  test('renders an input and a search button', () => {
    render(Search);

    const search = screen.getByLabelText(/Search input/i);
    expect(search).toBeInTheDocument();
    const searchBtn = screen.getByRole('button');
    expect(searchBtn).toBeInTheDocument();
  });

  test('displays an error message if the input is empty', async () => {
    render(Search);
    const search = screen.getByLabelText(/Search input/i);
    await userEvent.type(search, '  ');
    const searchBtn = screen.getByRole('button');
    await fireEvent.submit(searchBtn);
    const error = screen.getByText('Whoops, can’t be empty…');
    expect(error).toBeInTheDocument();
  });

  test('navigates to a new page if the input is valid', async () => {
    const homepage = 'http://localhost';

    render(Search);
    const search = screen.getByLabelText(/Search input/i);
    await userEvent.type(search, 'search-term');
    const searchBtn = screen.getByRole('button');
    await fireEvent.submit(searchBtn);
    expect(goto).toHaveBeenCalledWith(homepage + '/search-term');
  });

  test('displays a loading spinner while waiting for navigation', async () => {
    loadingStore.set(true);
    render(Search);
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
