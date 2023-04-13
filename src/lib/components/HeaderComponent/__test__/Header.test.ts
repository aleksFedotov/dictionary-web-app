import { screen, render } from '@testing-library/svelte';
import Header from '../Header.svelte';

describe('Header component testing', () => {
  test('should render component', () => {
    render(Header);
    const logo = screen.getByLabelText(/Logo return to main page/i);
    const select = screen.getByLabelText(/Font select/i);
    const toggle = screen.getByLabelText(/dark mode toggle/i);
  });
});
