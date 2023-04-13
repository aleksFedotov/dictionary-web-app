import { render, screen } from '@testing-library/svelte';
import Result from '../Result.svelte';
import type { IData } from '$lib/types';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockData: IData = {
  word: 'test',
  phonetic: 'ˈtɛst',
  phonetics: [{ audio: 'https://test-audio.mp3', text: 'tɛst' }],
  meanings: [
    {
      partOfSpeech: 'noun',
      definitions: [
        {
          definition: 'a word used to describe someone or something',
          example: 'The quick brown fox jumps over the lazy dog.',
          synonyms: [],
          antonyms: [],
        },
      ],
      synonyms: ['term', 'expression'],
      antonyms: ['nonword', 'unexpression'],
    },
  ],
  sourceUrls: ['https://test-source-url.com'],
};

describe('Result component testing', () => {
  test('should render word', () => {
    render(Result, { data: mockData });
    const word = screen.getByText(mockData.word);
    expect(word).toBeInTheDocument();
  });
  test('should render word', () => {
    render(Result, { data: mockData });
    const word = screen.getByText(mockData.word);
    expect(word).toBeInTheDocument();
  });
  test('should render phonetic if data has one', () => {
    render(Result, { data: mockData });
    const phonetic = screen.getByText(mockData.phonetic!);
    expect(phonetic).toBeInTheDocument();
  });
  test('should not render phonetic if data has no one', () => {
    const mockDataWithoutPhonetic = {
      ...mockData,
      phonetic: null,
    };
    render(Result, { data: mockDataWithoutPhonetic });
    const phonetic = screen.queryByLabelText('phonetic');
    expect(phonetic).toBeNull();
  });
  test('should render audio btn and play audio when clicked', async () => {
    const audioMock = {
      play: vi.fn(),
    } as unknown as HTMLAudioElement;

    vi.spyOn(window, 'Audio').mockImplementation(() => audioMock);
    render(Result, { data: mockData });

    const playBtn = screen.getByRole('button');
    expect(playBtn).toBeInTheDocument();

    await userEvent.click(playBtn);
    expect(audioMock.play).toHaveBeenCalled();
  });
  test('should not render audio btn if data has no audio data', async () => {
    const mockDataWithoutAudio = {
      ...mockData,
      phonetics: [{ text: 'tɛst', audio: '' }],
    };
    render(Result, { data: mockDataWithoutAudio });

    const playBtn = screen.queryByRole('button');
    expect(playBtn).toBeNull();
  });

  test('should render 1 meaning component', () => {
    render(Result, { data: mockData });

    const meanings = screen.getAllByTestId(/meaning/i);
    expect(meanings).toHaveLength(1);
  });
  test('should not render  meaning component if there is no data', () => {
    const mockDataWithoutMeanings = {
      ...mockData,
      meanings: [],
    };
    render(Result, { data: mockDataWithoutMeanings });

    const meanings = screen.queryAllByTestId(/meaning/i);
    expect(meanings).toHaveLength(0);
  });

  test('should render source url', () => {
    render(Result, { data: mockData });
    const source = screen.getByLabelText(/source url/i);
    expect(source).toBeInTheDocument();
  });

  test('should not render source url if there is no data', () => {
    const mockDataWithoutMeanings = {
      ...mockData,
      sourceUrls: [],
    };
    render(Result, { data: mockDataWithoutMeanings });
    const source = screen.queryByLabelText(/source url/i);
    expect(source).toBeNull();
  });
});
