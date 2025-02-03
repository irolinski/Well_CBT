import { Image } from "expo-image";
import { ColorValue } from "react-native";

export type learnCategoriesTypes = {
  title: string;
  color: ColorValue;
  image: Image;
  description: string;
};

export const learnCategories: learnCategoriesTypes[] = [
  {
    title: "Science",
    color: "#8DBED8",
    image: require("@/assets/images/learn/science.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.” ${"\n"} ${"\n"} - Albert Einstein`,
  },
  {
    title: "Lifestyle",
    color: "#5B7B5D",
    image: require("@/assets/images/learn/lifestyle.jpg"),
    description:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.\n\n – Aristotle",
  },
  {
    title: "Tutorials",
    color: "#F9A947",
    image: require("@/assets/images/learn/lifestyle.jpg"),
    description: "",
  },
  {
    title: "Psychology",
    color: "#FF997C",
    image: require("@/assets/images/learn/psychology.jpg"),
    description: "",
  },
];
