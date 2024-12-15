import { Image } from "expo-image";
import { ColorValue } from "react-native";

type learnCategoriesTypes = {
  title: string;
  color: ColorValue;
  image: Image;
  description: string;
};

export const learnCategories: learnCategoriesTypes[] = [
  {
    title: "Science",
    color: "#8DBED8",
    image: require("@/assets/images/learn/telescope_.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.” ${"\n"} ${"\n"} - Albert Einstein`,
  },
  {
    title: "Lifestyle",
    color: "#81C784",
    image: require("@/assets/images/learn/telescope_.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.” ${"\n"} ${"\n"} - Albert Einstein`,
  },
  {
    title: "Tutorials",
    color: "#F9A947",
    image: require("@/assets/images/learn/telescope_.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.” ${"\n"} ${"\n"} - Albert Einstein`,
  },
  {
    title: "Psychology",
    color: "#73848D",
    image: require("@/assets/images/learn/telescope_.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.” ${"\n"} ${"\n"} - Albert Einstein`,
  },
];
