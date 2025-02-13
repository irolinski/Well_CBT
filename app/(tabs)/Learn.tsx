import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Text from '@/components/global/Text';
import FrameMenu from '@/components/home/FrameMenu';
import LearnArticleCard from '@/components/learn/ArticleCard';
import LearnCategoryCard from '@/components/learn/LearnCategoryCard';
import { learnArticles } from '@/constants/models/learn/articles';
import { learnCategories, learnCategoriesTypes } from '@/constants/models/learn/categories';
import { Colors } from '@/constants/styles/colorTheme';

const Learn = () => {
  const { t } = useTranslation("learn");

  const articleNumber = (Math.random() * (learnArticles.length - 1)) | 0;

  return (
    <FrameMenu title={t("index.title")}>
      <View>
        <View className="mb-4">
          <Text className="mb-6 mt-2 text-left text-2xl">
            {t("index.todays_pick")}
          </Text>
          <View className="items-center justify-center">
            <LearnArticleCard
              title={learnArticles[articleNumber].title}
              subtitle={learnArticles[articleNumber].subtitle}
              time={learnArticles[articleNumber].time}
              link={`/learn/categories/${learnArticles[articleNumber].category}/${learnArticles[articleNumber].id}`}
              id={learnArticles[articleNumber].id}
              image={learnArticles[articleNumber].bgImage.image}
              imagePlacement={
                learnArticles[articleNumber].bgImage.cardPlacementY
              }
              frameColor={"#F28E4E"}
            />
          </View>
        </View>
        <Text
          className="mb-4 mt-2 text-left text-2xl"
          style={{ color: Colors.offBlack }}
        >
          {t("index.categories")}
        </Text>
        <View className="flex-row flex-wrap justify-center overflow-hidden">
          {learnCategories.map(
            (category: learnCategoriesTypes, index: number) => (
              <LearnCategoryCard
                name={t(`categories.${category.title}.title`)}
                backgroundColor={category.color}
                link={`/learn/categories/${category.title}`}
                key={index}
              />
            ),
          )}
        </View>
      </View>
    </FrameMenu>
  );
};

export default Learn;
