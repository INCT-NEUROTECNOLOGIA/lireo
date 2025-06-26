import { ROUTE_PATHS } from "../../../../config/routes";

export const userGuideText = {
  title: "Como usar o LIRE-FLOW",
  text: "Este guia apresenta as principais funcionalidades da plataforma.",
  sections: {
    loadText: {
      title: "Carregar um texto",
      icon: "bi bi-book",
      id: "loadText",
      className: "loadText",
      content: [
        {
          type: "text",
          text: "Formas de inserir um texto:",
        },
        {
          type: "listCheck",
          items: [
            {
              bold: "Arraste e solte um arquivo .txt",
              text: " na área de upload.",
            },
            {
              bold: "Clique em “Selecione um arquivo”",
              text: " para escolher um .txt do seu dispositivo.",
            },
            {
              bold: "Escolha um texto pronto",
              text: " na lista ao lado.",
            },
          ],
        },
        {
          type: "text",
          text: "Após o carregamento, o nome do arquivo será exibido e o conteúdo aparecerá na tela.",
        },
      ],
    },

    readingControls: {
      title: "Controles de Leitura",
      icon: "bi bi-stopwatch",
      id: "readingControls",
      className: "readingControls",
      content: [
        {
          type: "text",
          text: "Acima do texto estão os controles que permitem personalizar a experiência:",
        },
        {
          type: "image",
          image: {
            src: "/userGuideImgs/reading_controls.png",
            alt: "Controles de Leitura",
          },
        },
        {
          type: "list",
          items: [
            {
              bold: "Escolha um nível: ",
              text: "permite selecionar o nível de leitura.",
            },
            {
              bold: "Velocidade de leitura: ",
              text: "controle deslizante que define o ritmo de leitura (entre 0.1x e 3x).",
            },
            {
              bold: "Palavras por minuto (PPM): ",
              text: "estimativa do número de palavras lidas por minuto com base nas configurações escolhidas.",
            },
          ],
        },
      ],
    },

    readingLevels: {
      title: "Níveis de Leitura",
      icon: "bi bi-list-ul",
      id: "readingLevels",
      className: "readingLevels",
      content: [
        {
          type: "text",
          text: "Os níveis exibidos na página representam os anos do ensino fundamental. Cada nível corresponde a um ano escolar, seguindo esta equivalência:",
        },
        {
          type: "listChevron",
          items: [
            { text: "Nível 1 representa o 2º ano" },
            { text: "Nível 2 representa o 3º ano" },
            { text: "Nível 3 representa o 4º ano" },
            { text: "Nível 4 representa o 5º ano" },
            { text: "Nível 5 representa o 6º ano" },
            { text: "Nível 6 representa o 7º ano" },
            { text: "Nível 7 representa o 8º ano" },
            { text: "Nível 8 representa o 9º ano" },
          ],
        },
        {
          type: "text",
          text: "Essa classificação foi pensada para adaptar a experiência de leitura ao estágio de desenvolvimento do leitor, ajustando automaticamente a estimativa de fluência esperada para cada faixa escolar, baseada na tabela a seguir:",
        },
        {
          type: "image",
          image: {
            src: "/userGuideImgs/tabela_fluencia_leitora.jpg",
            alt: "Tabela de Fluência Leitora",
          },
        },
      ],
    },

    manualReadingControls: {
      title: "Controles Manuais de Leitura",
      icon: "bi bi-sliders",
      id: "manualReadingControls",
      className: "manualReadingControls",
      content: [
        {
          type: "text",
          text: "Além do controle deslizante para ajustar a velocidade da leitura, é possível alterar manualmente o número de palavras por minuto (ppm) através do campo numérico ao lado:",
        },
        {
          type: "text",
          bold: " basta clicar e digitar o valor desejado.",
        },
        {
          type: "imageSmall",
          image: {
            src: "/userGuideImgs/words_per_minute_input.png",
            alt: "Campo para ajuste manual de palavras por minuto",
          },
        },
      ],
    },

    tips: {
      title: "Dicas Úteis",
      icon: "bi bi-lightbulb",
      id: "tips",
      className: "tips",
      content: [
        {
          type: "listCheck",
          items: [
            {
              text: "Arquivos simples no formato .txt garantem melhor compatibilidade.",
            },
            {
              text: "Para trocar o texto, basta carregar um novo arquivo ou selecionar outro da lista.",
            },
            {
              text: "A plataforma é responsiva — compatível com computadores, tablets e celulares.",
            },
          ],
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
