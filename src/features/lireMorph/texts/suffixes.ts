import { AffixCombination } from "../types/affixCombination.type";
import { SuffixEnum } from "../types/suffix.enum";

export const suffixes = <AffixCombination[]>[
  {
    affix: SuffixEnum.AL,
    radicals: [
      "dent",
      "cultur",
      "musical",
      "region",
      "anim",
      "soci",
      "centr",
      "forma",
      "natur",
      "vis",
      "digit",
      "invern",
    ],
  },
  {
    affix: SuffixEnum.ISTA,
    radicals: ["dent", "jorn", "pian"],
  },
];
