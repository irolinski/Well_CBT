import { ArticleTypes } from "./learn";

export const learnArticles: ArticleTypes[] = [
  {
    title: "Symphonie Fantastique",
    subtitle: "How to get rich in 45 days",
    time: 20,
    category: "Science",
    bgImage: require("@/assets/images/learn/demo_2.jpg"),
    customImage: {
      image: require("@/assets/images/learn/demo.jpg"),
      subtitle: "Dwa pingwiny z dudami",
    },
    articleBody: [
      {
        header: "Header 1",
        body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, ipsa doloribus aspernatur minus eligendi id unde aliquid fugit quibusdam quis, nemo eaque natus velit ipsam incidunt facilis deleniti libero. Tempore!",
      },
      {
        header: "Header 2",
        body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, ipsa doloribus aspernatur minus eligendi id unde aliquid fugit quibusdam quis, nemo eaque natus velit ipsam incidunt facilis deleniti libero. Tempore!",
      },
    ],
    relatedArticleIds: [13],
    id: 12,
  },
  {
    title: "Dangers of self-diagnosis",
    subtitle: "American Journal of Psychology",
    time: 20,
    category: "Science",
    bgImage: require("@/assets/images/learn/demo.jpg"),
    customImage: {
      image: require("@/assets/images/learn/demo_2.jpg"),
      subtitle: "Wino musujące, 2041",
    },
    articleBody: [
      {
        header: "Header 1",
        body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, ipsa doloribus aspernatur minus eligendi id unde aliquid fugit quibusdam quis, nemo eaque natus velit ipsam incidunt facilis deleniti libero. Tempore!",
      },
      {
        header: "Header 2",
        body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A, ipsa doloribus aspernatur minus eligendi id unde aliquid fugit quibusdam quis, nemo eaque natus velit ipsam incidunt facilis deleniti libero. Tempore!",
      },
    ],
    relatedArticleIds: [12],
    id: 13,
  },
];
