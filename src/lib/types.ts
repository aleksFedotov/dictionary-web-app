export interface IPhonetics {
  text: string;
  audio: string;
  sourceUrl?: string;
  license?: ILicense;
}
export interface ILicense {
  name: string;
  url: string;
}

export interface IDefinition {
  definition: string;
  synonyms?: string[];
  antonyms?: string[];
  example?: string;
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
  synonyms: string[];
  antonyms: string[];
}

export interface IData {
  word: string;
  phonetic: string | null;
  phonetics: IPhonetics[];
  meanings: IMeaning[];
  license?: ILicense;
  sourceUrls: string[];
  title?: string;
  message?: string;
  resolution?: string;
}

export interface IStoreData {
  data: IData;
  isLoading: boolean;
  status: string;
}
