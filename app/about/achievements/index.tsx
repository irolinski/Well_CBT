import { Image } from "expo-image";
import React from "react";
import { ScrollView, View } from "react-native";
import AchievementCard from "@/components/about/AchievementCard";
import MenuNav from "@/components/global/MenuNav";
import Text from "@/components/global/Text";
import {
  AchievementObj,
  allAchievementsArr,
} from "@/constants/models/about_achievements";

// need to fetch progress from db and merge it with achievements arr

const index = () => {
  return (
    <React.Fragment>
      <ScrollView
        className="h-full pb-8"
        style={{ backgroundColor: "#FBFBFB" }}
      >
        {/* Nav */}
        <MenuNav name="Achievements" />
        <View className="mx-5 mt-8">
          <Text
            className="mb-4 mt-2 text-left text-2xl"
            style={{ color: "#27261F" }}
          >
            All achievements
          </Text>
          <View className="pb-10">
            {allAchievementsArr.map(
              (achievement: AchievementObj, indexNum: number) => (
                <AchievementCard
                  title={achievement.title}
                  description={achievement.description_before}
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
          <Image
            className="h-4 w-1/2"
            source={require("@/assets/images/logo_braid.webp")}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default index;
