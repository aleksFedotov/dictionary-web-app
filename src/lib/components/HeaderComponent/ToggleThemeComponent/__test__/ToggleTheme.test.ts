import ToggleTheme from '../ToggleTheme.svelte';
import { screen, render, fireEvent, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { themeStore } from '$lib/stores/themeStore';
import { fontStore } from '$lib/stores/fontStore';

describe('Toggle Theme component testing', () => {
  test('should render component', () => {
    render(ToggleTheme);
    const comp = screen.getByLabelText('dark mode toggle');
    expect(comp).toBeInTheDocument();
  });

  test('should change to dark mode after click', async () => {
    const user = userEvent.setup();
    render(ToggleTheme);
    const comp = screen.getByLabelText('dark mode toggle');
    const dark = screen.getByLabelText('dark mode');
    expect(dark).toBeInTheDocument();
    await user.click(comp);
    const light = screen.getByLabelText('light mode');
    expect(light).toBeInTheDocument();
  });
  test('should change to light mode after click', async () => {
    const user = userEvent.setup();
    render(ToggleTheme);
    const comp = screen.getByLabelText('dark mode toggle');
    const light = screen.getByLabelText('light mode');
    expect(light).toBeInTheDocument();
    await user.click(comp);
    const dark = screen.getByLabelText('dark mode');
    expect(dark).toBeInTheDocument();
  });
});
