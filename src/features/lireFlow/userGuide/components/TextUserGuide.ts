export const userGuideText = {
  title: "Como usar o LIRE-FLOW",
  text: "Este guia apresenta as principais funcionalidades da plataforma.",
  sections: {
    loadText: {
      title: "Leitor de Texto",
      icon: "bi bi-book",
      id: "loadText",
      subtitle: "Carregar um texto",
      content: {
        text1: "Formas de inserir um texto:",
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
        text2:
          "Após o carregamento, o nome do arquivo será exibido e o conteúdo aparecerá na tela.",
      },
    },

    readControls: {
      title: "Controles de Leitura",
      icon: "bi bi-stopwatch",
      id: "readControls",
      text: "Acima do texto estão os controles que permitem personalizar a experiência:",
      content: {
        image: {
          src: "/userGuideImgs/reading_controls.png",
          alt: "Controles de Leitura",
        },
        items: [
          {
            obs: "*",
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
      subsection: {
        title: "Ajuste Manual da Velocidade de Leitura",
        content: {
          text: "Além do controle deslizante para ajustar a velocidade da leitura, é possível alterar manualmente o número de palavras por minuto (ppm) através do campo numérico ao lado: basta clicar e digitar o valor desejado.",
          image: {
            src: "/userGuideImgs/words_per_minute_input.png",
            alt: "Campo para ajuste manual de palavras por minuto",
          },
        },
      },
    },

    readLevels: {
      title: "Níveis de Leitura",
      icon: "bi bi-list-ul",
      id: "readLevels",
      content: {
        observation: {
          obs: "*",
          text: "Os níveis exibidos na página representam os anos do ensino fundamental. Cada nível corresponde a um ano escolar, seguindo esta equivalência:",
        },
        itemsLevels: [
          { text: "Nível 1 representa o 2º ano" },
          { text: "Nível 2 representa o 3º ano" },
          { text: "Nível 3 representa o 4º ano" },
          { text: "Nível 4 representa o 5º ano" },
          { text: "Nível 5 representa o 6º ano" },
          { text: "Nível 6 representa o 7º ano" },
          { text: "Nível 7 representa o 8º ano" },
          { text: "Nível 8 representa o 9º ano" },
        ],
        text: "Essa classificação foi pensada para adaptar a experiência de leitura ao estágio de desenvolvimento do leitor, ajustando automaticamente a estimativa de fluência esperada para cada faixa escolar, baseada na tabela a seguir:",
        imageLevels: {
          src: "/userGuideImgs/tabela_fluencia_leitora.jpg",
          alt: "Tabela de Fluência Leitora",
        },
      },
    },

    h: {
      title: "Leitura com Destaque",
      icon: "bi bi-highlighter",
      content: [
        {
          type: "text",
          text: "Durante a leitura, as palavras são automaticamente destacadas uma a uma, auxiliando o acompanhamento visual e promovendo atenção, ritmo e fluência.",
        },
        {
          type: "image",
          image: {
            src: "/userGuideImgs/highlighted_reading.png",
            alt: "Leitura com Destaque",
          },
        },
      ],
    },

    tips: {
      title: "Dicas Úteis",
      icon: "bi bi-lightbulb",
      id: "tips",
      content: [
        {
          type: "list",
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
      content: {
        text1:
          "Em caso de dúvidas, dificuldades ou sugestões, consulte a seção ",
        link: "Sobre Nós",
        text2: " para obter informações de contato.",
      },
    },
  },
};
