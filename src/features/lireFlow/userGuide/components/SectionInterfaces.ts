export interface SectionUserGuideProps {
  title: string;
  id: string;
  className: string;
  content: SectionContent[];
}

interface SectionContent {
  type: string;
  text?: string;
  items?: ListItem[];
  image?: Image;
  href?: string;
}

interface ListItem {
  bold?: string;
  text?: string;
  image?: Image;
}

interface Image {
  src: string;
  alt: string;
}
