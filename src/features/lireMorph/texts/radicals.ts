import { MorphemicWord } from '../types/morphemicWord.type';
import { PrefixesEnum } from '../types/prefix.enum';
import { SuffixEnum } from '../types/suffix.enum';

export const radicals = <MorphemicWord[]>[
  {
    radical: 'flor',
    prefixes: [],
    suffixes: [
      SuffixEnum.IDO,
      SuffixEnum.ESCER,
      SuffixEnum.ICULTURA,
      SuffixEnum.ISTA,
    ],
  },
  {
    radical: 'escr',
    prefixes: [],
    suffixes: [
      SuffixEnum.EVER,
      SuffixEnum.ITO,
      SuffixEnum.ITOR,
      SuffixEnum.ITORIO,
    ],
  },
  {
    radical: 'pensa',
    prefixes: [],
    suffixes: [SuffixEnum.MENTO, SuffixEnum.DOR],
  },
  {
    radical: 'audi',
    prefixes: [],
    suffixes: [SuffixEnum.CAO, SuffixEnum.TORIO, SuffixEnum.TIVEL],
  },
  {
    radical: 'limp',
    prefixes: [],
    suffixes: [SuffixEnum.EZA, SuffixEnum.O],
  },
  {
    radical: 'cort',
    prefixes: [],
    suffixes: [SuffixEnum.E, SuffixEnum.ANTE],
  },
  {
    radical: 'constru',
    prefixes: [],
    suffixes: [SuffixEnum.TOR, SuffixEnum.CAO],
  },
  {
    radical: 'trabalh',
    prefixes: [],
    suffixes: [SuffixEnum.A, SuffixEnum.ADOR],
  },
  {
    radical: 'viv',
    prefixes: [PrefixesEnum.RE],
    suffixes: [SuffixEnum.ER, SuffixEnum.A],
  },
  {
    radical: 'cant',
    prefixes: [],
    suffixes: [SuffixEnum.ORA, SuffixEnum.ORIA],
  },
  {
    radical: 'pedr',
    prefixes: [],
    suffixes: [SuffixEnum.EIRO, SuffixEnum.EGULHO, SuffixEnum.ARIA],
  },
  {
    radical: 'cafe',
    prefixes: [],
    suffixes: [SuffixEnum.TERIA, SuffixEnum.TEIRA, SuffixEnum.ZAL],
  },
  {
    radical: 'ferr',
    prefixes: [],
    suffixes: [
      SuffixEnum.EIRO,
      SuffixEnum.OVIA,
      SuffixEnum.ADURA,
      SuffixEnum.AMENTA,
    ],
  },
  {
    radical: 'livr',
    prefixes: [],
    suffixes: [SuffixEnum.ARIA, SuffixEnum.EIRO],
  },
  {
    radical: 'mar',
    prefixes: [],
    suffixes: [SuffixEnum.INHO, SuffixEnum.ITIMO],
  },
  {
    radical: 'fort',
    prefixes: [],
    suffixes: [SuffixEnum.IFICAR, SuffixEnum.ALEZA, SuffixEnum.ISSIMO],
  },
  {
    radical: 'dent',
    prefixes: [],
    suffixes: [SuffixEnum.ISTA, SuffixEnum.AL],
  },
];