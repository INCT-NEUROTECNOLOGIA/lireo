import { ROUTE_PATHS } from '../../../../config/routes';

export const userGuideTextLireMorph = {
  title: 'Como usar o LireMorph',
  text: 'Este guia apresenta as principais funcionalidades do LireMorph',
  sections: {
    objective: {
      title: 'Objetivo',
      icon: 'bi bi-bullseye',
      id: 'objective',
      className: 'objective',
      content: [
        {
          type: 'text',
          text: 'A atividade LireMorph tem como objetivo desenvolver a consciência morfológica, permitindo a exploração da formação de palavras a partir de prefixos, radicais e sufixos. Ao experimentar diferentes combinações, o leitor amplia seu vocabulário e compreende melhor o funcionamento da estrutura das palavras.',
        },
      ],
    },
    morfemaBase: {
      title: 'Escolher o morfema base',
      icon: 'bi bi-grid-1x2',
      id: 'morfemaBase',
      className: 'morfemaBase',
      content: [
        {
          type: 'text',
          text: 'Primeiro, escolha qual morfema ficará no centro da tela e servirá como base para as combinações: prefixo, radical ou sufixo.',
        },
        {
          type: 'text',
          text: 'Para selecionar o morfema base, basta clicar em uma das opções:',
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/morpheme_choice.png',
            alt: 'Botões para escolher morfema base: Prefixo, Radical, Sufixo',
          },
        },
        {
          type: 'listChevron',
          items: [
            {
              bold: 'Prefixo',
              text: ': seleciona um prefixo como base;', //  combine com radicais e sufixos.
            },
            {
              bold: 'Radical',
              text: ': seleciona o radical como base;', // ideal para ver variações morfológicas.
            },
            {
              bold: 'Sufixo',
              text: ': seleciona um sufixo como base;', // combine com prefixos e radicais.
            },
          ],
        },
      ],
    },

    prefixo: {
      title: 'Prefixo',
      icon: 'bi bi-arrow-left-right',
      id: 'prefixo',
      className: 'prefixo',
      content: [
        {
          type: 'text',
          text: 'Para começar, use a caixa de seleção para escolher um dos prefixos disponíveis.', // Os prefixos aparecem em uma lista de opções e podem ser combinados com radicais e sufixos para formar palavras.
        },
        {
          type: 'listChevron',
          items: [
            {
              bold: 'Selecionar prefixo',
              text: ' — use a caixa de seleção para escolher uma das opções disponíveis.',
            },
            {
              bold: 'Formar palavras',
              text: ' — após escolher um prefixo, combine-o com um radical e/ou sufixo para ver as palavras possíveis.',
            },
          ],
        },
        {
          type: 'image',
          image: {
            src: '/userGuideLireMorphImgs/prefix_selection.png',
            alt: 'Selecionar prefixo',
          },
        },
      ],
    },

    sufixo: {
      title: 'Sufixo',
      icon: 'bi bi-arrow-return-right',
      id: 'sufixo',
      className: 'sufixo',
      content: [
        {
          type: 'text',
          text: 'Em seguida, escolha um sufixo. Os sufixos alteram o sentido ou a classe gramatical das palavras formadas.',
        },
        {
          type: 'listChevron',
          items: [
            {
              bold: 'Selecionar sufixo',
              text: ' — use a caixa de seleção para escolher uma das opções disponíveis.',
            },
            {
              bold: 'Formar palavras',
              text: ' — após escolher um sufixo, combine-o com um prefixo e/ou radical para gerar variações de palavras.',
            },
          ],
        },
        {
          type: 'image',
          image: {
            src: '/userGuideLireMorphImgs/suffix_selection.png',
            alt: 'Selecionar sufixo',
          },
        },
      ],
    },

    radical: {
      title: 'Radical',
      icon: 'bi bi-kanban',
      id: 'radical',
      className: 'radical',
      content: [
        {
          type: 'text',
          text: 'Por fim, selecione um radical — a base da palavra. O radical é combinado com prefixos e sufixos para formar palavras completas.',
        },
        {
          type: 'list',
          items: [
            {
              bold: 'Selecionar radical: ',
              text: 'use a caixa de seleção para escolher uma das opções disponíveis.',
            },
            {
              bold: 'Combinações: ',
              text: 'formule palavras usando os prefixos e sufixos selecionados; experimente diferentes combinações para observar mudanças de sentido.',
            },
          ],
        },
        {
          type: 'image',
          image: {
            src: '/userGuideLireMorphImgs/radical_selection.png',
            alt: 'Selecionar radical',
          },
        },
      ],
    },

    formarPalavras: {
      title: 'Formar palavras',
      icon: 'bi bi-pencil-square',
      id: 'formarPalavras',
      className: 'formarPalavras',
      content: [
        {
          type: 'text',
          text: 'Após selecionar prefixo, sufixo e radical, a atividade mostrará as palavras formadas. Analise sentido, ortografia e possíveis variações.',
        },
        {
          type: 'listCheck',
          items: [
            {
              bold: 'Experimentar combinações: ',
              text: 'tente diferentes prefixos/sufixos para perceber como o significado muda.',
            },
            {
              bold: 'Verificar ortografia: ',
              text: 'confira se a palavra resultante está grafada corretamente.',
            },
            {
              bold: 'Registrar descobertas: ',
              text: 'anote observações sobre sentido, classe gramatical e alterações morfológicas.',
            },
          ],
        },
        {
          type: 'image',
          image: {
            src: '/userGuideLireMorphImgs/formed_words.png',
            alt: 'Palavras formadas',
          },
        },
      ],
    },

    exemplos: {
      title: 'Exemplos e atividades sugeridas',
      icon: 'bi bi-journal-text',
      id: 'exemplos',
      className: 'exemplos',
      content: [
        {
          type: 'text',
          text: 'Use os exemplos para praticar: peça aos alunos que criem listas de palavras com um mesmo radical, que classifiquem por significado ou que criem frases com as palavras formadas.',
        },
        {
          type: 'list',
          items: [
            {
              bold: 'Atividade 1: ',
              text: 'Formar 10 palavras a partir de um radical escolhido.',
            },
            {
              bold: 'Atividade 2: ',
              text: 'Classificar palavras formadas por campos semânticos (ex.: movimento, sensação).',
            },
          ],
        },
      ],
    },

    support: {
      title: 'Suporte',
      icon: 'bi bi-question-circle',
      id: 'support',
      className: 'support',
      content: [
        {
          type: 'text',
          text: 'Em caso de dúvidas, dificuldades ou sugestões sobre a atividade LireMorph, consulte a seção de contato e ajuda:',
        },
        {
          type: 'link',
          text: 'Sobre Nós',
          href: ROUTE_PATHS.ABOUT_US,
        },
      ],
    },
  },
};
