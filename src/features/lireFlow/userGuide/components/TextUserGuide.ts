export const userGuideText = {
  title: "Como usar o LIRE-FLOW",
  text: "Este guia apresenta as principais funcionalidades da plataforma:",
  sections: [
    {
      title: "Página Inicial",
      content: [
        {
          type: "text",
          text: "Ao acessar o site, é exibido o cabeçalho com o nome Lire-O e as seguintes opções:",
        },
        {
          type: "list",
          items: [
            { bold: "Página Inicial", text: ": retorna à tela principal." },
            {
              bold: "Sobre Nós",
              text: ": apresenta informações sobre o projeto e a equipe envolvida.",
            },
            {
              bold: "Guia do Usuário",
              text: ": reúne instruções sobre como utilizar o site.",
            },
          ],
        },
      ],
    },

    {
      title: "Leitor de Texto",
      content: [
        {
          type: "text",
          text: "Espaço destinado à prática de leitura. Funcionamento descrito a seguir:",
        },
        {
          type: "subsection",
          subsection: [
            {
              title: "a) Carregar um texto",
              content: [
                {
                  type: "text",
                  text: "Há diferentes formas de inserção:",
                },
                {
                  type: "list",
                  items: [
                    {
                      bold: ".txt",
                      text: ", o formato suportado: arraste e solte o arquivo nessa área.",
                      image: {
                        src: "/userGuideImgs/drag_and_drop_upload.png",
                        alt: "Arrastar e Soltar Upload",
                      },
                    },
                    {
                      text: "Selecionar um arquivo diretamente do dispositivo, clicando no botão “Selecione um arquivo”.",
                      image: {
                        src: "/userGuideImgs/select_texts_defaults.png",
                        alt: "Selecionar Textos Padrões",
                      },
                    },
                    {
                      text: "Escolher um texto pronto na lista suspensa ao lado.",
                      image: {
                        src: "/userGuideImgs/select_texts_defaults.png",
                        alt: "Selecionar Textos Padrões",
                      },
                    },
                  ],
                  text: "Após o carregamento, o nome do arquivo será exibido e o conteúdo aparecerá na tela.",
                },
              ],
            },
            {
              title: "b) Visualização do texto",
              content: [
                {
                  type: "text",
                  text: "O conteúdo carregado é exibido de forma centralizada, com o título em destaque, seguido pelos parágrafos formatados para facilitar a leitura.",
                },
                {
                  type: "image",
                  image: {
                    src: "/userGuideImgs/text_preview.png",
                    alt: "Visualização do Texto",
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Controles de Leitura",
      content: [
        {
          type: "text",
          text: "Acima do texto estão os controles que permitem personalizar a experiência:",
        },
        {
          type: "list",
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
        {
          type: "image",
          image: {
            src: "/userGuideImgs/reading_controls.png",
            alt: "Controles de Leitura",
          },
        },
        {
          type: "observation",
          obs: "*",
          text: "Os níveis exibidos na página representam os anos do ensino fundamental. Cada nível corresponde a um ano escolar, seguindo esta equivalência:",
        },
        {
          type: "list",
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
        {
          type: "subsection",
          subsection: [
            {
              title: "Botões de controle:",
              content: [
                {
                  type: "list",
                  items: [
                    {
                      bold: "Iniciar: ",
                      text: "inicia a leitura com destaque progressivo das palavras.",
                    },
                    {
                      bold: "Pausar: ",
                      text: "interrompe temporariamente a leitura.",
                    },
                    {
                      bold: "Reiniciar: ",
                      text: "retorna ao início do texto.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Leitura com Destaque",
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

    {
      title: "Dicas Úteis",
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
  ],
};
