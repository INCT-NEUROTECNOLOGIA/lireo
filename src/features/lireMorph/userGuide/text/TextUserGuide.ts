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
          text: 'Essa atividade tem como objetivo desenvolver a consciência morfológica, permitindo a exploração da formação de palavras a partir de prefixos, radicais e sufixos. Ao experimentar diferentes combinações, o leitor amplia seu vocabulário e compreende melhor o funcionamento da estrutura das palavras.',
        },
      ],
    },
    typeOfMorpheme: {
      title: 'Escolher o tipo de morfema',
      icon: 'bi bi-grid-1x2',
      id: 'typeOfMorpheme',
      className: 'typeOfMorpheme',
      content: [
        {
          type: 'text',
          text: 'O primeiro passo é escolher o tipo de morfema que servirá como base das combinações. Esse morfema ficará fixo no centro da tela.',
        },
        {
          type: 'text',
          text: 'Para isso, clique em uma das opções localizadas no canto esquerdo da tela:',
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/types_of_morpheme.png',
            alt: 'Botões para escolher morfema base: Prefixo, Radical, Sufixo',
          },
        },
      ],
    },
    morphemeSelection: {
      title: 'Selecionar morfema base',
      icon: 'bi bi-menu-button',
      id: 'morphemeSelection',
      className: 'morphemeSelection',
      content: [
        {
          type: 'text',
          text: 'Depois de escolher o tipo de morfema, selecione qual elemento específico será utilizado como base para formar as palavras.',
        },
        {
          type: 'text',
          text: 'Use a caixa de seleção exibida no canto esquerdo da tela para escolher o morfema desejado.',
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/morpheme_selection.png',
            alt: 'Botões para escolher morfema base: Prefixo, Radical, Sufixo',
          },
        },
      ],
    },
    morphemeVisibility: {
      title: 'Exibição de morfemas',
      icon: 'bi bi-eye',
      id: 'morphemeVisibility',
      className: 'morphemeVisibility',
      content: [
        {
          type: 'text',
          text: 'O LireMorph permite controlar a exibição dos morfemas complementares, como prefixos e sufixos, durante a atividade.',
        },
        {
          type: 'text',
          text: 'Ao lado da caixa de seleção, há botões que indicam se os morfemas correspondentes estão habilitados ou desabilitados para exibição na tela.',
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/morpheme_visibility.png',
            alt: 'Botões para exibir ou ocultar prefixos e sufixos no LireMorph',
          },
        },
        {
          type: 'text',
          text: 'Essa funcionalidade ajuda o usuário a focar nas combinações desejadas, testando diferentes estruturas de palavras com maior controle.',
        },
      ],
    },
    wordFormation: {
      title: 'Formação de palavras',
      icon: 'bi bi-pencil-square',
      id: 'wordFormation',
      className: 'wordFormation',
      content: [
        {
          type: 'text',
          text: 'Arraste os demais morfemas para o centro da tela para combiná-los com o morfema base e formar novas palavras.',
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/words_formation1.png',
            alt: 'Processo de formação de palavras no LireMorph',
          },
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/words_formation2.png',
            alt: 'Arrastando morfemas para formação palavras',
          },
        },
        {
          type: 'imageSmall',
          image: {
            src: '/userGuideLireMorphImgs/words_formation3.png',
            alt: 'Palavras formadas no LireMorph',
          },
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
          text: 'Em caso de dúvidas, dificuldades ou sugestões, consulte a seção destinada às informações de contato:',
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
