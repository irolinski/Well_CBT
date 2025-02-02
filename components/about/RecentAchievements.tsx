import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import {
  AchievementObj,
  allAchievementsArr,
} from "@/constants/models/about_achievements";
import {
  AchievementProgressObj,
  handleGetAchievementProgressData,
} from "@/db/achievements/achievements";
import { Feather } from "@expo/vector-icons";
import AdvanceButton from "../AdvanceButton";
import Text from "../global/Text";
import CarouselBadge from "./CarouselBadge";
import CarouselDetails from "./CarouselDetails";

const RecentAchievements = () => {
  const windowHeight = Dimensions.get("window").height;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentAchievementsDataState, setRecentAchievementsDataState] =
    useState<AchievementObj[] | undefined>();

  const getRecentAchievementProgressData = async () => {
    const achievementProgressData: AchievementProgressObj[] | undefined =
      await handleGetAchievementProgressData();

    if (achievementProgressData) {
      const achievementListWithProgressData = allAchievementsArr.map((obj) => {
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
      });

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
      throw Error(
        "Error: Occurred a problem while fetching achievement progress data.",
      );
    }
  };

  useEffect(() => {
    getRecentAchievementProgressData();
  }, []);

  if (recentAchievementsDataState && recentAchievementsDataState!.length >= 2) {
    const nextPosition = () => {
      if (selectedIndex < recentAchievementsDataState.length - 1) {
        setSelectedIndex((prev) => prev + 1);
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
    const handleFlingHorizontal = Gesture.Simultaneous(
      onFlingLeft,
      onFlingRight,
    );

    return (
      <GestureDetector gesture={handleFlingHorizontal}>
        <View
          className="overflow-hidden rounded-xl"
          style={{
            backgroundColor: "#F5F5F5",
            height:
              windowHeight > 750 ? windowHeight * 0.57 : windowHeight * 0.6,
          }}
        >
          {/* Top Section */}
          <View
            className="absolute top-0 w-full flex-row justify-center"
            style={{ height: "50%" }}
          >
            {recentAchievementsDataState.map((datum, indexNum) => (
              <CarouselBadge
                image={datum.image}
                index={indexNum}
                key={indexNum}
                selectedIndex={selectedIndex}
              />
            ))}
          </View>
          {/* Change page by tapping on badges */}
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
                backgroundColor: "#8DBED8",
                top: 0,
              }}
            ></View>

            {selectedIndex > 0 && (
              <TouchableOpacity
                className="absolute left-0 z-30 h-12 w-14 items-start justify-center"
                style={{ top: 0.085 * windowHeight }}
                onPress={() => prevPosition()}
              >
                <Feather name="chevron-left" size={36} color="#FFFFFF" />
              </TouchableOpacity>
            )}

            {selectedIndex < recentAchievementsDataState.length - 1 && (
              <TouchableOpacity
                className="absolute right-0 z-30 h-12 w-14 items-end justify-center"
                style={{ top: 0.085 * windowHeight }}
                onPress={() => nextPosition()}
              >
                <Feather name="chevron-right" size={36} color="#FFFFFF" />
              </TouchableOpacity>
            )}

            {recentAchievementsDataState.map((datum, indexNum) => (
              <CarouselDetails
                title={datum.title}
                description={datum.description_after}
                index={indexNum}
                selectedIndex={selectedIndex}
                key={indexNum}
              />
            ))}
          </View>
          <View className="absolute bottom-0 right-4 z-20 my-4 flex-row justify-end">
            <AdvanceButton
              title="See all"
              onPress={() => {
                router.push("/about/achievements" as Href);
              }}
              btnStyle={{
                width: 150,
                height: 45,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#D9D9D9",
                borderRadius: 12,
              }}
              textStyle={{ color: "#27261F" }}
            />
          </View>
        </View>
      </GestureDetector>
    );
  } else {
    return (
      // add a placeholder here
      <View
        className="overflow-hidden rounded-xl"
        style={{
          backgroundColor: "#F5F5F5",
          height: windowHeight > 750 ? windowHeight * 0.57 : windowHeight * 0.6,
        }}
      >
        <Text>Placeholder</Text>
      </View>
    );
  }
};

export default RecentAchievements;
