import { Image } from "expo-image";
import { ColorValue } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

export type learnCategoriesTypes = {
  title: string;
  color: ColorValue;
  image: Image;
  description?: string;
};

export const learnCategories: learnCategoriesTypes[] = [
  {
    title: "science",
    color: Colors.mainBlue,
    image: require("@/assets/images/learn/science.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.”\n\n - Albert Einstein`,
  },
  {
    title: "lifestyle",
    color: "#5B7B5D",
    image: require("@/assets/images/learn/lifestyle.jpg"),
    description:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.\n\n – Aristotle",
  },
  {
    title: "tutorials",
    color: "#F9A947",
    image: require("@/assets/images/learn/lifestyle.jpg"),
  },
  {
    title: "psychology",
    color: "#FF997C",
    image: require("@/assets/images/learn/psychology.jpg"),
  },
];
