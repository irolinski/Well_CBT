import { Image } from 'expo-image';
import { ColorValue } from 'react-native';

export type articleParagraph = { header: string; body: string };
export type articleBody = articleParagraph[];
export type articleCustomImage = {
  image: Image;
  subtitle: string;
};
type articleBgImage = {
  image: Image;
  cardPlacementY?: number;
};

type ArticleCategory = "psychology" | "science" | "tutorial" | "lifestyle";

export type ArticleTypes = {
  title: string;
  subtitle?: string;
  category: ArticleCategory;
  time?: number;
  bgImage: articleBgImage;
  customImage?: articleCustomImage;
  relatedArticleIds?: number[];
  id: number;
};

export type learnRelatedArticleCardTypes = {
  title: string;
  time?: number;
  image: Image;
  imagePlacement?: number;
  link: string;
  id: number;
};

export type learnArticleCardTypes = learnRelatedArticleCardTypes & {
  subtitle?: string;
  frameColor?: ColorValue;
  textColor?: string;
};

export type ArticlesInCurrentLanguageType = Record<
  string,
  {
    title: `${number}`;
    subtitle: string;
    body: string;
  }
>;
