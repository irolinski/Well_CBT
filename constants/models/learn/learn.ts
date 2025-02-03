import { Image } from "expo-image";
import { ColorValue } from "react-native";

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

export type ArticleTypes = {
  title: string;
  subtitle: string;
  category: string;
  time?: number;
  bgImage: articleBgImage;
  articleBody: articleBody;
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
};

export type learnArticleCardTypes = learnRelatedArticleCardTypes & {
  subtitle?: string;
  frameColor?: ColorValue;
  textColor?: string;
};
