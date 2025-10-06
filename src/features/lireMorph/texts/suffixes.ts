import { AffixCombination } from "../types/affixCombination.type";
import { SuffixEnum } from "../types/suffix.enum";

export const suffixes = <AffixCombination[]>[
  {
    affix: SuffixEnum.AL,
    radicals: [
      "dent",
      "cultur",
      "music",
      "region",
      "anim",
      "soci",
      "centr",
      "form",
      "natur",
      "visu",
      "digit",
      "invern",
    ],
  },
  {
    affix: SuffixEnum.ISTA,
    radicals: ["dent", "jorn", "pian"],
  },
];
