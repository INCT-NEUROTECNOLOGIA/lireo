import { Position } from "./position.type";
import { PrefixesEnum } from "./prefix.enum";
import { SuffixEnum } from "./suffix.enum";

export type Affix = {
  text: PrefixesEnum | SuffixEnum;
  position: Position;
};