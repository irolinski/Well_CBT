import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, TouchableOpacity, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { recentAchievementsPlaceholderImage } from "@/assets/images/about/achievements/achievements";
import {
  AchievementObj,
  AchievementProgressObj,
  allAchievementsModelsArr,
} from "@/constants/models/about/achievements";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { handleGetAchievementProgressData } from "@/db/achievements/controllers";
import { logOpenAchievementsPageEvent } from "@/services/firebase/firebase";
import { Feather } from "@expo/vector-icons";
import AdvanceButton from "../AdvanceButton";
import CarouselBadge from "./CarouselBadge";
import CarouselDetails from "./CarouselDetails";

const RecentAchievements = () => {
  const { t } = useTranslation(["about", "common"]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentAchievementsDataState, setRecentAchievementsDataState] =
    useState<AchievementObj[] | undefined>();

  const getRecentAchievementProgressData = async () => {
    const achievementProgressData: AchievementProgressObj[] | undefined =
      await handleGetAchievementProgressData();

    if (achievementProgressData) {
      const achievementListWithProgressData = allAchievementsModelsArr.map(
        (obj) => {
          const progressDatum = achievementProgressData.find(
            (datum) => datum.id === obj.id,
          );
          if (progressDatum) {
            obj.score_current = progressDatum.currentScore;

            if (progressDatum.dateUnlocked) {
              obj.dateUnlocked = new Date(progressDatum.dateUnlocked); // Ensure Date object
            }
          }
          return obj;
        },
      );

      const recentAchievementProgressData =
        achievementListWithProgressData.filter(
          (obj) => obj.score_current === obj.score_required,
        );

      const sortedRecentAchievementList = recentAchievementProgressData.sort(
        (a, b) => {
          if (!a.dateUnlocked) return 1;
          if (!b.dateUnlocked) return -1;
          return b.dateUnlocked.getTime() - a.dateUnlocked.getTime();
        },
      );

      setRecentAchievementsDataState(sortedRecentAchievementList);
    } else {
      throw Error("Error: Problem while fetching achievement progress data.");
    }
  };

  useEffect(() => {
    getRecentAchievementProgressData();
  }, []);

  const nextPosition = () => {
    if (recentAchievementsDataState) {
      if (selectedIndex < recentAchievementsDataState.length - 1) {
        setSelectedIndex((prev) => prev + 1);
      }
    }
  };

  const prevPosition = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  // Left swipe gesture
  const onFlingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      nextPosition();
    })
    .runOnJS(true);

  // Right swipe gesture
  const onFlingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      prevPosition();
    })
    .runOnJS(true);

  // Combine gestures
  const handleFlingHorizontal = Gesture.Simultaneous(onFlingLeft, onFlingRight);

  return (
    <GestureDetector gesture={handleFlingHorizontal}>
      <View
        className="overflow-hidden rounded-xl"
        style={{
          backgroundColor: Colors.whiteSmoke,
          height:
            SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT * 0.57 : SCREEN_HEIGHT * 0.67,
        }}
      >
        {/* Top Section */}
        <View
          className="absolute top-0 w-full flex-row justify-center"
          style={{ height: "50%" }}
        >
          {recentAchievementsDataState &&
          recentAchievementsDataState.length > 0 ? (
            recentAchievementsDataState.map((datum, indexNum) => (
              <CarouselBadge
                image={datum.image}
                index={indexNum}
                key={indexNum}
                selectedIndex={selectedIndex}
              />
            ))
          ) : (
            <React.Fragment>
              <CarouselBadge
                image={recentAchievementsPlaceholderImage.noIcon}
                index={0}
                selectedIndex={1}
              />
              <CarouselBadge
                image={recentAchievementsPlaceholderImage.icon}
                index={1}
                selectedIndex={1}
              />
              <CarouselBadge
                image={recentAchievementsPlaceholderImage.noIcon}
                index={2}
                selectedIndex={1}
              />
            </React.Fragment>
          )}
        </View>
        {/* Change page by tapping on badges */}
        {recentAchievementsDataState &&
          recentAchievementsDataState.length > 0 && (
            <React.Fragment>
              {selectedIndex > 0 && (
                <Pressable
                  className="absolute left-0 z-40 h-1/2 w-1/2"
                  onPress={() => prevPosition()}
                />
              )}
              {selectedIndex < recentAchievementsDataState.length - 1 && (
                <Pressable
                  className="absolute right-0 z-40 h-1/2 w-1/2"
                  onPress={() => nextPosition()}
                />
              )}
            </React.Fragment>
          )}

        {/* Bottom Section */}
        <View
          className="w-full items-center justify-center"
          style={{ top: "40%" }}
        >
          <View
            className="absolute rounded-full"
            style={{
              width: 650,
              height: 650,
              backgroundColor: Colors.mainBlue,
              top: 0,
            }}
          ></View>

          {recentAchievementsDataState &&
            recentAchievementsDataState.length > 0 && (
              <React.Fragment>
                {selectedIndex > 0 && (
                  <TouchableOpacity
                    className="absolute left-0 z-30 h-12 w-14 items-start justify-center"
                    style={{ top: 0.085 * SCREEN_HEIGHT }}
                    onPress={() => prevPosition()}
                  >
                    <Feather
                      name="chevron-left"
                      size={36}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                )}
                {selectedIndex < recentAchievementsDataState.length - 1 && (
                  <TouchableOpacity
                    className="absolute right-0 z-30 h-12 w-14 items-end justify-center"
                    style={{ top: 0.085 * SCREEN_HEIGHT }}
                    onPress={() => nextPosition()}
                  >
                    <Feather
                      name="chevron-right"
                      size={36}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                )}
              </React.Fragment>
            )}

          {recentAchievementsDataState &&
          recentAchievementsDataState.length > 0 ? (
            recentAchievementsDataState.map((achievement, indexNum) => (
              <CarouselDetails
                title={t(
                  `achievements.achievement_data.${achievement.id}.title`,
                )}
                description={t(
                  `achievements.achievement_data.${achievement.id}.description_after`,
                )}
                index={indexNum}
                selectedIndex={selectedIndex}
                key={indexNum}
              />
            ))
          ) : (
            <React.Fragment>
              <CarouselDetails
                title={t(`achievements.recent_achievements_placeholder_title`)}
                description={t(
                  `achievements.recent_achievements_placeholder_description`,
                )}
                index={0}
                selectedIndex={0}
              />
            </React.Fragment>
          )}
        </View>
        <View className="absolute bottom-0 right-4 z-20 my-4 flex-row justify-end">
          <AdvanceButton
            title={t("buttons.see_all", { ns: "common" })}
            onPress={() => {
              logOpenAchievementsPageEvent();
              router.push("/about/achievements" as Href);
            }}
            btnStyle={{
              width: 150,
              height: 45,
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: Colors.lightGray,
              borderRadius: 12,
            }}
            textStyle={{ color: Colors.offBlack }}
          />
        </View>
      </View>
    </GestureDetector>
  );
};

export default RecentAchievements;
