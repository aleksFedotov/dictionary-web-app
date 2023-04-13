import type { PageServerLoad } from './$types';

import { error as svelteError } from '@sveltejs/kit';
import type { IData } from '../../lib/types';

export const load: PageServerLoad = async ({
  fetch,
  params: { query },
  url,
}) => {
  const fetchWord = async (query: string): Promise<IData[]> => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    );

    if (!res.ok) {
      throw svelteError(res.status, 'Not Found');
    }
    const data = await res.json();

    return data;
  };

  try {
    const { pathname } = url;

    const data = fetchWord(query);
    return {
      result: data,
      pathname,
    };
  } catch (error) {
    throw svelteError(505, 'something went wrong');
  }
};
