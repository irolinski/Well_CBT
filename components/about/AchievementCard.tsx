import { Image } from "expo-image";
import React from "react";
import { DimensionValue, View } from "react-native";
import { achievementLockedImage } from "@/assets/images/about/achievements/achievements";
import { Colors } from "@/constants/styles/colorTheme";
import { interpolateNumbers } from "@/utils/algorithms";
import { Feather } from "@expo/vector-icons";
import Text from "../global/Text";

export type AchievementCardType = {
  title: string;
  description_before: string;
  description_after: string;
  image: Image;
  score_current: number | undefined;
  score_required: number | undefined;
};

const AchievementCard = ({
  title,
  description_before,
  description_after,
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

  let isUnlocked = false;
  if (score_current && score_required) {
    isUnlocked = score_current >= score_required;
  }
  return (
    <View
      className="my-2 w-full flex-row rounded-2xl border pb-4 pt-2"
      style={{ borderColor: Colors.lightGray }}
    >
      <View className="w-1/3 flex-row items-center justify-center">
        <Image
          className="h-24 w-24"
          source={isUnlocked ? image : achievementLockedImage}
          contentFit="contain"
        />
      </View>
      <View className="ml-2 mt-3 w-2/3 flex-col">
        <View className="mr-6 flex-row">
          <Text className="mr-10 text-xl" style={{ fontFamily: "Kodchasan" }}>
            {title}
          </Text>
          <View
            className="absolute right-1 h-6 w-6 items-center justify-center rounded-full"
            style={{
              backgroundColor: isUnlocked ? Colors.gold : Colors.mainGray,
            }}
          >
            {isUnlocked ? (
              <Feather name="check" size={20} color="white" />
            ) : (
              <View style={{ marginBottom: 1 }}>
                <Feather name="lock" size={14} color="white" />
              </View>
            )}
          </View>
        </View>
        <View className="my-2 w-3/4">
          <Text>{isUnlocked ? description_after : description_before}</Text>
        </View>
        {score_required && score_required > 1 && (
          <View className="flex-row items-center">
            {score_current && score_required ? (
              <View
                className="mr-2 h-2 justify-center"
                style={{ backgroundColor: Colors.mainGray, width: "70%" }}
              >
                <View
                  className="h-full bg-yellow-400"
                  style={{ width: progressPercentValString }}
                ></View>
              </View>
            ) : null}
            <View className="mx-1 items-center" style={{ width: "20%" }}>
              {score_current && score_required ? (
                <Text>
                  {score_current <= score_required
                    ? score_current
                    : score_required}
                  /{score_required}
                </Text>
              ) : null}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AchievementCard;
