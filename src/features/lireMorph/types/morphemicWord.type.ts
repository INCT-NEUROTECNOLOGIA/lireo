import { PrefixesEnum } from "./prefix.enum";
import { SuffixEnum } from "./suffix.enum";

export type MorphemicWord = {
  prefixes: PrefixesEnum[];
  radical: string;
  suffixes: SuffixEnum[];
};