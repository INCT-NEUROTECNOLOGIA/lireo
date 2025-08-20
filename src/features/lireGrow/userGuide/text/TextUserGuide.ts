import { ROUTE_PATHS } from "../../../../config/routes";

export const userGuideText = {
  title: "Como usar o LireGrow",
  text: "Este guia apresenta as principais funcionalidades do LireGrow",
  sections: {
    chooseText: {
      title: "Escolher uma frase",
      icon: "bi bi-book",
      id: "chooseText",
      className: "chooseText",
      content: [
        {
          type: "text",
          text: "Para começar, selecione uma frase que será utilizada na leitura progressiva:",
        },
        {
          type: "listChevron",
          items: [
            {
              bold: "Use a caixa de seleção",
              text: " para escolher uma das frases disponíveis.",
            },
          ],
        },
        {
          type: "imageSmall",
          image: {
            src: "/userGuideLireGrowImgs/phrases_list.png",
            alt: "Lista de frases",
          },
        },
      ],
    },

    fontSize: {
      title: "Ajuste do Tamanho da Fonte",
      icon: "bi bi-type",
      id: "fontSize",
      className: "fontSize",
      content: [
        {
          type: "text",
          text: "Para facilitar a leitura, o LireGrow permite ajustar o tamanho da fonte das frases por meio de um controle deslizante:",
        },
        {
          type: "imageSmall",
          image: {
            src: "/userGuideLireGrowImgs/font_size_control.png",
            alt: "Controle de tamanho da fonte",
          },
        },
      ],
    },

    progressiveReading: {
      title: "Leitura Progressiva",
      icon: "bi bi-eye",
      id: "progressiveReading",
      className: "progressiveReading",
      content: [
        {
          type: "text",
          text: "A frase escolhida será exibida aos poucos, incentivando o foco do leitor.",
        },
        {
          type: "list",
          items: [
            {
              bold: "Próxima parte ",
              text: ": ao clicar no botão é revelada mais uma parte da frase.",
            },
          ],
        },
        {
          type: "image",
          image: {
            src: "/userGuideLireGrowImgs/progressive_reading1.png",
            alt: "Exemplo de leitura progressiva",
          },
        },
        {
          type: "image",
          image: {
            src: "/userGuideLireGrowImgs/progressive_reading2.png",
            alt: "Exemplo de leitura progressiva",
          },
        },
        {
          type: "image",
          image: {
            src: "/userGuideLireGrowImgs/progressive_reading3.png",
            alt: "Exemplo de leitura progressiva",
          },
        },
      ],
    },

    comprehension: {
      title: "Atividades de Compreensão",
      icon: "bi bi-check2-square",
      id: "comprehension",
      className: "comprehension",
      content: [
        {
          type: "text",
          text: "Ao final da leitura, o LireGrow propõe um exercício de compreensão:",
        },
        {
          type: "listCheck",
          items: [
            {
              bold: "Seleção de imagem: ",
              text: "escolha, entre as opções apresentadas, a figura que corresponde ao conteúdo da frase.",
            },
            {
              bold: "Verificar: ",
              text: "ao clicar no botão é verificado se a imagem selecionada está correta.",
            },
            {
              bold: "Próxima frase: ",
              text: "aparece quando a resposta está correta e inicia uma nova rodada de leitura progressiva.",
            },
          ],
        },
        {
          type: "image",
          image: {
            src: "/userGuideLireGrowImgs/comprehension_activity_imgs.png",
            alt: "Exemplo de atividade de compreensão",
          },
        },
        {
          type: "image",
          image: {
            src: "/userGuideLireGrowImgs/comprehension_activity.png",
            alt: "Exemplo de atividade de compreensão",
          },
        },
      ],
    },

    support: {
      title: "Suporte",
      icon: "bi bi-question-circle",
      id: "support",
      className: "support",
      content: [
        {
          type: "text",
          text: "Em caso de dúvidas, dificuldades ou sugestões, consulte a seção destinada às informações de contato: ",
        },
        {
          type: "link",
          text: "Sobre Nós",
          href: ROUTE_PATHS.ABOUT_US,
        },
      ],
    },
  },
};
