import { Image } from 'expo-image';

export type learnCategoriesTypes = {
  title: string;
  image: Image;
  description?: string;
  disabled?: boolean;
};

export const learnCategories: learnCategoriesTypes[] = [
  {
    title: "science",
    image: require("@/assets/images/learn/science.jpg"),
    description: `“All of science is nothing more than the refinement of everyday thinking.”\n\n - Albert Einstein`,
  },
  {
    title: "lifestyle",
    image: require("@/assets/images/learn/lifestyle.jpg"),
    description:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.\n\n – Aristotle",
  },
  {
    title: "tutorials",
    image: require("@/assets/images/learn/tutorials.jpg"),
    disabled: true,
  },
  {
    title: "psychology",
    image: require("@/assets/images/learn/psychology.jpg"),
  },
];
