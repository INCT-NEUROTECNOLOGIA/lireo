export interface SectionContent {
  type: string;
  text?: string;
  items?: ListItem[];
  subsection?: Subsection[];
  image?: Image;
  obs?: string;
}

export interface ListItem {
  bold?: string;
  text?: string;
  image?: Image;
  obs?: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Subsection {
  title: string;
  content: SectionContent[];
}

export interface SectionUserGuideProps {
  title: string;
  content: SectionContent[];
}
