import { Image } from "expo-image";
import React from "react";
import { DimensionValue, Text, View } from "react-native";
import { achievementLockedImage } from "@/assets/images/about/achievements/achievements";
import { interpolateNumbers } from "@/utils/algorithms";
import { Feather } from "@expo/vector-icons";

export type AchievementCardType = {
  title: string;
  description: string;
  image: Image;
  score_current: number | undefined;
  score_required: number | undefined;
};

const AchievementCard = ({
  title,
  description,
  image,
  score_current,
  score_required,
}: AchievementCardType) => {
  const getProgressPercentVal = (): number | undefined => {
    if (score_current && score_required) {
      const progressPercentVal = interpolateNumbers(
        score_current,
        0,
        score_required,
        0,
        100,
      );
      return progressPercentVal;
    }
  };

  const progressPercentValString =
    `${getProgressPercentVal()}%` as DimensionValue;

  const unlocked = score_current === score_required;
  console.log(score_current + " " + score_current);

  return (
    <View
      className="my-2 w-full flex-row rounded-2xl border pb-4 pt-2"
      style={{ borderColor: "#D9D9D9" }}
    >
      <View className="w-1/3 flex-row items-center justify-center">
        <Image
          className="h-24 w-24"
          source={unlocked ? image : achievementLockedImage}
          contentFit="contain"
        />
      </View>
      <View className="ml-2 mt-3 w-2/3 flex-col">
        <View className="mr-6 flex-row">
          <Text className="mr-10 text-xl" style={{ fontFamily: "Kodchasan" }}>
            {title}
          </Text>
          <View
            className="absolute right-0 h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: unlocked ? "#FCCC15" : "#B8B8B8" }}
          >
            {unlocked ? (
              <Feather name="check" size={20} color="white" />
            ) : (
              <View style={{ marginBottom: 1 }}>
                <Feather name="lock" size={14} color="white" />
              </View>
            )}
          </View>
        </View>
        <View className="my-2 w-3/4">
          <Text>{description}</Text>
        </View>
        <View className="flex-row items-center">
          {score_current && score_required ? (
            <View
              className="mr-2 h-2 w-3/4 justify-center"
              style={{ backgroundColor: "#B8B8B8" }}
            >
              <View
                className="h-full bg-yellow-400"
                style={{ width: progressPercentValString }}
              ></View>
            </View>
          ) : null}

          <View className="mx-1">
            {score_current && score_required ? (
              <Text>
                {score_current}/{score_required}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AchievementCard;
