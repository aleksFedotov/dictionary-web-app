import { render, screen } from '@testing-library/svelte';
import { fireEvent } from '@testing-library/dom';
import Status from '../Status.svelte';

describe('Status component', () => {
  test('should display welcome message and emoji when status is "welcome"', () => {
    render(Status, { props: { status: 'welcome' } });
    const welcomeEmoji = screen.getByLabelText(/Welcome emoji/i);
    const welcomeHeader = screen.getByText(/Free Web Dictionary/i);
    const welcomeText = screen.getByText(
      /start using this free online dictionary/i
    );

    expect(welcomeEmoji).toBeInTheDocument();
    expect(welcomeHeader).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });

  test('should display not found message and emoji when status is "notFound"', () => {
    render(Status, { props: { status: 'notFound' } });
    const notFoundEmoji = screen.getByLabelText(/no emoji/i);
    const notFoundHeader = screen.getByText(/No Definitions Found/i);
    const notFoundText = screen.getByText(
      /Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead./i
    );

    expect(notFoundEmoji).toBeInTheDocument();
    expect(notFoundHeader).toBeInTheDocument();
    expect(notFoundText).toBeInTheDocument();
  });

  test('should display error message and emoji when status is "error"', () => {
    render(Status, { props: { status: 'error' } });
    const errorEmoji = screen.getByLabelText(/sad emoji/i);
    const errorHeader = screen.getByText(/Sorry, Something Went Wrong/i);
    const errorText = screen.getByText(
      /Sorry ! There is something wrong with our servers and we are working on it, please try again in a few minutes/i
    );

    expect(errorEmoji).toBeInTheDocument();
    expect(errorHeader).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });
});
