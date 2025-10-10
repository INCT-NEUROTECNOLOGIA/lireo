import { PrefixesEnum } from "./prefix.enum";
import { SuffixEnum } from "./suffix.enum";

export type Morphema = {
  mainMorph: string;
  morphs:
    | PrefixesEnum[]
    | SuffixEnum[]
    | string[]
    | (PrefixesEnum[] & SuffixEnum[])[];
};
