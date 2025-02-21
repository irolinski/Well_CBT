import { ArticleTypes } from "./learn";

//article details to be found in locale/--language--/learn.json files

export const learnArticles: ArticleTypes[] = [
  {
    title: "The Art of Mindful Breathing",
    time: 5,
    category: "psychology",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_1.webp`),
      cardPlacementY: 17,
    },
    relatedArticleIds: [4, 5],
    id: 1,
  },
  {
    title: "What is CBT?",
    time: 4,
    category: "psychology",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_2.webp`),
    },
    relatedArticleIds: [],
    id: 2,
  },
  {
    title: "The Role of Diet in Mental Health",
    time: 6,
    category: "science",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_3.webp`),
      cardPlacementY: 15,
    },
    relatedArticleIds: [],
    id: 3,
  },
  {
    title: "Social Media vs. Mental Health",
    time: 7,
    category: "science",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_4.webp`),
      cardPlacementY: 15,
    },

    relatedArticleIds: [1, 5],
    id: 4,
  },
  {
    title: "How to get a Good Night's Sleep",
    time: 5,
    category: "lifestyle",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_5.webp`),
      cardPlacementY: 5,
    },
    relatedArticleIds: [1, 4],
    id: 5,
  },
  {
    title: "Relax with the Classics",
    time: 3,
    category: "lifestyle",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_6.webp`),
      cardPlacementY: -3,
    },
    relatedArticleIds: [],
    id: 6,
  },
  {
    title: "CBT Outside the Therapist's Office",
    time: 6,
    category: "science",
    bgImage: {
      image: require(`@/assets/images/learn/articles/bg/bg_7.webp`),
      cardPlacementY: -35,
    },
    relatedArticleIds: [],
    id: 7,
  },
];
