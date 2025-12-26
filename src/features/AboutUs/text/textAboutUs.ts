import '../layout/aboutUs.css';
import { Member } from '../components/Section';

export const projectCreators: Member[] = [
  {
    type: 'teamMember',
    name: 'Profa. Dra. Luciana Mendonça Alves',
    role: 'Coordenadora do projeto',
    position: 'Departamento de Fonoaudiologia',
    education: 'Faculdade de Medicina/UFMG',
    affiliation: 'CRFa 6-1319',
    photo: '/images/DraLucianaMendonca_TeamMemberPicture.png',
  },
  {
    type: 'teamMember',
    name: 'Ramiro Noronha Reis Ribeiro',
    role: 'Desenvolvedor',
    position: 'Bolsista de Iniciação Científica',
    education: 'Ciência da Computação',
    affiliation: 'Instituto de Ciências Exatas/UFMG',
    photo: '/images/Ramiro_TeamMemberPicture.png',
  },
  {
    type: 'teamMember',
    name: 'Ana Julia Ferreira Garcia',
    role: 'Desenvolvedora',
    position: 'Bolsista de Iniciação Científica',
    education: 'Técnico em Desenvolvimento de Sistemas',
    affiliation: ' COLTEC/UFMG',
    photo: '/images/AnaJulia_TeamMemberPicture.png',
  },

];

export const projectCollaborators: Member[] = [
  {
    type: 'teamMember',
    name: 'Isadora Ramos Pereira',
    role: 'Colaboradora',
    position: 'Bolsista de Iniciação Científica',
    education: 'Técnico em Desenvolvimento de Sistemas',
    affiliation: ' COLTEC/UFMG',
    photo: '/images/Isadora_TeamMemberPicture.jpg',
  },
  {
    type: 'teamMember',
    name: 'Thiago Calebe Ramos dos Santos',
    role: 'Colaborador',
    position: 'Bolsista de Iniciação Científica',
    education: 'Técnico em Desenvolvimento de Sistemas',
    affiliation: ' COLTEC/UFMG',
    photo: '/images/Thiago_TeamMemberPicture.jpg',
  },
  {
    type: 'teamMember',
    name: 'Izabelly Monteiro',
    role: 'Colaboradora',
    position: 'Docente de Língua Portuguesa',
    education: 'Licenciada em Letras',
    affiliation: 'Faculdade de Letras/UFMG',
    photo: '/images/Izabelly_TeamMemberPicture.jpg',
  },
  {
    type: 'teamMember',
    name: 'Debora Fraga Lodi',
    role: 'Colaboradora',
    position: 'Departamento de Fonoaudiologia',
    education: 'Faculdade de Medicina/UFMG',
    affiliation: 'CRFa 6-5743',
    photo: '/images/Debora_TeamMemberPicture.jpg',
  },
  {
    type: 'teamMember',
    name: 'Débora Marques de Miranda',
    role: 'Colaboradora',
    position: 'Professora Associada',
    education: 'Coordenadora do Centro de Tecnologia da Faculdade de Medicina',
    affiliation: 'Departamento de Pediatria/UFMG',
    photo: '/images/DéboraMarques_TeamMemberPicture.jpg',
  },
];

export const projectExecution: Member[] = [
  {
    type: 'collaborator',
    photo: '/images/logo-Faculdade-de-Medicina-UFMG.png',
    alt: 'Faculdade de Medicina - UFMG',
  },
  {
    type: 'collaborator',
    photo: '/images/logo-UFMG.png',
    alt: 'UFMG',
  },
  {
    type: 'collaborator',
    photo: '/images/logo-Neurotec-INCT .png',
    alt: 'INCT',
  },
];


export const aboutUsText = {
  summary: {
    title: 'Sobre Nós',
    description:
      'O LIRE-O é um site interativo com atividades lúdicas para treinar leitura, focado em melhorar a decodificação, fluência e compreensão por meio de minijogos e desafios gamificados.',
  },
  ourStory: {
    section: [
      {
        title: 'Nossa História',
        description: [
          'O LIRE-O nasceu como um projeto acadêmico desenvolvido na Universidade Federal de Minas Gerais (UFMG), dentro de um contexto de pesquisa voltado ao ensino e à aprendizagem da leitura. Idealizado por estudantes e professores comprometidos com a educação de qualidade, o projeto surgiu com o propósito de transformar a forma como crianças e adolescentes desenvolvem sua fluência leitora.',
          'Sabemos que, para muitos, o ato de ler pode parecer uma obrigação ou um desafio muito difícil de superar. Por isso, o LIRE-O foi pensado como um espaço onde a leitura se torna leve, divertida e acessível. Através de minijogos e desafios gamificados, os alunos são estimulados a praticar a leitura de forma natural e envolvente, no seu próprio ritmo, de forma a superar as dificuldades.',
          'Ao mesmo tempo, terapeutas, pais e professores encontram no LIRE-O uma ferramenta de apoio, que permite acompanhar o progresso dos leitores e incentivar o hábito da leitura no cotidiano.',
          'Mais do que um site, o LIRE-O é fruto de uma construção coletiva e acadêmica que acredita que ler pode — e deve — ser uma aventura prazerosa desde os primeiros passos.',
        ],
      },
      {
        title: 'A origem do nome LIRE-O',
        description: [
          'Uma curiosidade: o nome do nosso projeto se inspirou na fusão da delicadeza de uma flor, o lírio, com o verbo ler em francês: lire. Assim, a marca foi desenhada com a ideia de construir um ícone que seja a fusão entre os desenhos estilizados de um lírio e um livro.',
          'O lírio é reconhecido pela sua delicadeza, beleza e elegância. É um símbolo de pureza, nobreza e renascimento em várias culturas ao redor do mundo. E para nós, não há beleza e nobreza maior do que a leitura! Ela nos faz renascer a cada história, a cada aprendizado e a cada conquista que esta importante habilidade nos proporciona.',
        ],
        quote: {
          text: '"Observai os lírios, como crescem. Não trabalham nem fiam e, no entanto, eu vos digo: nem Salomão, em toda a sua glória, jamais se vestiu como um só dentre eles."',
          origin: 'Lucas 12:27',
        },
      },
    ],
  },
  creatorsSection: 'Idealizadores do Projeto',
  collaboratorsSection: 'Colaboradores do Projeto',
  executionSection: 'Realização',
};
