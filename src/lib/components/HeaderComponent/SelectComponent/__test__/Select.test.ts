import { render, fireEvent, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Select from '../Select.svelte';
import { fontStore } from '$lib/stores/fontStore';
import { get } from 'svelte/store';

describe('Select', () => {
  test('should toggle dropdown when button is clicked', async () => {
    const { component } = render(Select);
    const button = screen.getByLabelText('Font select');

    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();

    await fireEvent.click(button);
    expect(screen.queryByTestId('dropdown')).toBeInTheDocument();

    // await fireEvent.click(button);
    // await component.$set();
    // expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  test('should change font when an option is selected', async () => {
    render(Select);
    const button = screen.getByLabelText('Font select');
    await userEvent.click(button);
    const optionSans = screen.getByLabelText('San serif font');
    const optionSerif = screen.getByLabelText('Serif font');
    const optionMono = screen.getByLabelText('Mono font');

    await userEvent.click(optionSerif);
    expect(get(fontStore)).toBe('Serif');

    await userEvent.click(button);

    await userEvent.click(optionSans);
    expect(get(fontStore)).toBe('San Serif');

    await userEvent.click(button);

    await userEvent.click(optionMono);
    expect(get(fontStore)).toBe('Mono');
  });

  test('should change font with keyboard', async () => {
    render(Select);
    const button = screen.getByLabelText('Font select');
    await fireEvent.keyDown(button, { key: 'Enter' });
    const optionSans = screen.getByLabelText('San serif font');
    const optionSerif = screen.getByLabelText('Serif font');
    const optionMono = screen.getByLabelText('Mono font');

    expect(screen.queryByTestId('dropdown')).toBeInTheDocument();

    await fireEvent.keyDown(optionSerif, { key: 'Enter' });
    expect(get(fontStore)).toBe('Mono');

    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.queryByTestId('dropdown')).toBeInTheDocument();

    await fireEvent.keyDown(optionSans, { key: 'ArrowDown' });
    await fireEvent.keyDown(optionSans, { key: 'Enter' });
    expect(get(fontStore)).toBe('Mono');

    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.queryByTestId('dropdown')).toBeInTheDocument();

    await fireEvent.keyDown(optionMono, { key: 'ArrowUp' });
    await fireEvent.keyDown(optionMono, { key: 'Enter' });
    expect(get(fontStore)).toBe('Mono');

    await fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.queryByTestId('dropdown')).toBeInTheDocument();

    // await fireEvent.keyDown(button, { key: 'Escape' });
    // expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });
});
