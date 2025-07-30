import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo";
import AchievementCard from "@/components/about/AchievementCard";
import MenuNav from "@/components/global/MenuNav";
import Text from "@/components/global/Text";
import {
  AchievementObj,
  AchievementProgressObj,
  allAchievementsModelsArr,
} from "@/constants/models/about/achievements";
import { Colors } from "@/constants/styles/colorTheme";
import { handleGetAchievementProgressData } from "@/db/achievements/controllers";
import { updateAchievementProgress } from "@/db/achievements/global";

const AchievementsPage = () => {
  const { t } = useTranslation("about");

  const [achievementsDataState, setAchievementsDataState] = useState<
    AchievementObj[] | undefined
  >();

  const getAchievementProgressData = async () => {
    const achievementProgressData: AchievementProgressObj[] | undefined =
      await handleGetAchievementProgressData();

    if (achievementProgressData) {
      let achievementListWithProgressData = [...allAchievementsModelsArr];
      achievementListWithProgressData = allAchievementsModelsArr.map((obj) => {
        let progressDatum = achievementProgressData.find(
          (datum) => datum.id === obj.id,
        );
        if (progressDatum) {
          obj.score_current = progressDatum.currentScore;
        }
        return obj;
      });
      setAchievementsDataState(achievementListWithProgressData);
    } else {
      throw Error(
        "Error: Occured a problem while fetching achievement progress data.",
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("running func");
      updateAchievementProgress();
      getAchievementProgressData();
    }, []),
  );

  return (
    <React.Fragment>
      <ScrollView
        className="h-full pb-8"
        style={{ backgroundColor: Colors.offWhite }}
      >
        {/* Nav */}
        <MenuNav name={t(`achievements.title`)} />
        <View className="mx-5 mt-8">
          <Text
            className="mb-4 mt-2 text-left text-2xl"
            style={{ color: Colors.offBlack }}
          >
            {t(`achievements.all_achievements`)}
          </Text>
          <View className="pb-10">
            {achievementsDataState &&
              achievementsDataState.map(
                (achievement: AchievementObj, indexNum: number) => (
                  <AchievementCard
                    title={t(
                      `achievements.achievement_data.${achievement.id}.title`,
                    )}
                    description_before={t(
                      `achievements.achievement_data.${achievement.id}.description_before`,
                    )}
                    description_after={t(
                      `achievements.achievement_data.${achievement.id}.description_after`,
                    )}
                    image={achievement.image}
                    score_current={achievement.score_current}
                    score_required={achievement.score_required}
                    key={indexNum}
                  />
                ),
              )}
          </View>
        </View>
        <View className="mb-12 mt-6 h-4 w-full flex-row items-center justify-center">
          <Image className="h-4 w-1/2" source={logoImages.logo_braid_divider} />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default AchievementsPage;
