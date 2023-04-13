import { render, screen } from '@testing-library/svelte';
import type { IMeaning } from '$lib/types';

import Meaning from '../Meaning.svelte';

const meaning: IMeaning = {
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
};

describe('Meaning component testing', () => {
  test('should render component', () => {
    render(Meaning, { meaning });
    const comp = screen.getByTestId('meaning');
    expect(comp).toBeInTheDocument();
  });

  test('should render part of spech', () => {
    render(Meaning, { meaning });
    const partOfSpeech = screen.getByText(meaning.partOfSpeech);
    expect(partOfSpeech).toBeInTheDocument();
  });

  test('should render definition', () => {
    render(Meaning, { meaning });
    const def = screen.getByText(meaning.definitions[0].definition);
    expect(def).toBeInTheDocument();
  });

  test('should render example if definition has one', () => {
    render(Meaning, { meaning });
    const example = screen.getByText(`"${meaning.definitions[0].example}"`);
    expect(example).toBeInTheDocument();
  });

  test('should not render example if definition does not have one', () => {
    const meaningWithoutExample: IMeaning = {
      ...meaning,
      definitions: [
        { definition: 'a word used to describe someone or something' },
      ],
    };
    render(Meaning, { meaning: meaningWithoutExample });
    const example = screen.queryByLabelText(/example/i);
    expect(example).toBeNull();
  });

  test('should render synonyms', () => {
    render(Meaning, { meaning });
    const synonyms = screen.getByLabelText(/synonyms/i);
    const synonym1 = screen.getByText(meaning.synonyms[0]);
    const synonym2 = screen.getByText(meaning.synonyms[1]);

    expect(synonyms).toBeInTheDocument();
    expect(synonym1).toBeInTheDocument();
    expect(synonym2).toBeInTheDocument();
  });

  test('should render antonyms', () => {
    render(Meaning, { meaning });
    const antonyms = screen.getByLabelText(/antonyms/i);
    const antonym1 = screen.getByText(meaning.antonyms[0]);
    const antonym2 = screen.getByText(meaning.antonyms[1]);

    expect(antonyms).toBeInTheDocument();
    expect(antonym1).toBeInTheDocument();
    expect(antonym2).toBeInTheDocument();
  });

  test('should not render synonyms if empty array', () => {
    const meaningWithoutSynonyms: IMeaning = {
      ...meaning,
      synonyms: [],
    };
    render(Meaning, { meaning: meaningWithoutSynonyms });
    const synonyms = screen.queryByLabelText(/synonyms/i);
    expect(synonyms).toBeNull();
  });
  test('should not render antonyms if empty array', () => {
    const meaningWithoutantonyms: IMeaning = {
      ...meaning,
      antonyms: [],
    };
    render(Meaning, { meaning: meaningWithoutantonyms });
    const antonyms = screen.queryByLabelText(/antonyms/i);
    expect(antonyms).toBeNull();
  });
});
