import { Position } from "./position.type";
import { PrefixEnum } from "./prefix.enum";
import { SuffixEnum } from "./suffix.enum";

export type Morph = {
  text: PrefixEnum | SuffixEnum | string;
  position: Position;
};
