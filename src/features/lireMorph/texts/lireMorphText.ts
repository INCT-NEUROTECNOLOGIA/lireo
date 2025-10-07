import { PrefixEnum } from "../types/prefix.enum";
import { SuffixEnum } from "../types/suffix.enum";

export const lireMorphText = {
  summary: {
    title: "LireMorph",
    texts: [
      "O objetivo desta tarefa é explorar a formação das palavras por meio da combinação de seus elementos.",
      "Durante a atividade, o leitor verá um radical e deverá unir a ele diferentes prefixos e sufixos espalhados pela tela.",
      "Ao formar novas palavras, será possível observar como cada parte modifica ou amplia o sentido original.",
      "Essa atividade desenvolve habilidades como consciência morfológica, ampliação de vocabulário e compreensão da estrutura da língua.",
    ],
    linkText: "Para mais informações, acesse o ",
    link: "Guia do Usuário.",
  },
  modes: ["prefixo", "radical", "sufixo"],
  placeholderSelect: "Selecione um ",
  radicalExample: {
    radical: "exempl",
    suffixes: [
      SuffixEnum.O,
      SuffixEnum.AR,
      SuffixEnum.IFICAR,
      SuffixEnum.ARIO,
      SuffixEnum.OZINHO,
      SuffixEnum.AO,
    ],
    prefixes: [PrefixEnum.RE],
  },
  prefixExample: {
    affix: PrefixEnum.RE,
    radicals: ["exemplo", "criar", "lembrar", "ciclar"],
  },
  suffixExample: {
    affix: SuffixEnum.AR,
    radicals: ["exempl", "mostr", "ensin", "formul"],
  },
};
