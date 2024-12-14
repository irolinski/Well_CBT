import { Image } from "expo-image";

export type articleParagraph = { header: string; body: string };
export type articleBody = articleParagraph[];
export type articleCustomImage = {
  image: Image;
  subtitle: string;
};

export type ArticleTypes = {
  title: string;
  subtitle: string;
  category: string;
  time?: number;
  bgImage: Image;
  articleBody: articleBody;
  customImage?: articleCustomImage;
  relatedArticleIds?: number[];
  id: number;
};

export type learnRelatedArticleCardTypes = {
  title: string;
  time?: number;
  image: Image;
  link: string;
};

export type learnArticleCardTypes = learnRelatedArticleCardTypes & {
  subtitle?: string;
  frameColor?: string;
  textColor?: string;
};
