import { Href, router } from "expo-router";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { toolBackgrounds } from "@/assets/images/tools/backgrounds/backgrounds";
import AdvanceButton from "@/components/AdvanceButton";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/styles/colorTheme";

const Cda = () => {
  return (
    <React.Fragment>
      <ImageBackground source={toolBackgrounds.mood_journal}>
        <View className="absolute left-6 top-12 z-10">
          <BackButton />
        </View>
        <View className="h-full justify-center px-6">
          <View className="items-center justify-center">
            <View className="absolute left-8 top-8"></View>
            <View>
              <View className="my-4 mr-[15%] justify-center">
                <Text
                  className="my-4 text-left text-2xl font-bold"
                  style={{
                    fontFamily: "KodchasanMedium",
                    color: Colors.whiteSmoke,
                  }}
                >
                  Mood Journal
                </Text>
                <Text
                  className="my-2 text-sm"
                  style={{ color: Colors.offWhite }}
                >
                  CBT Journaling helps track and manage emotions effectively.
                  You’ll start by rating your mood, then select the emotions
                  you’re feeling from a list and think a bit about your
                  feelings' context. This process promotes self-awareness and
                  emotional clarity.
                </Text>
              </View>
            </View>
            <View className="my-16 w-full">
              <AdvanceButton
                className="w-full"
                title="Let's begin"
                onPress={() =>
                  router.replace("tools/classic_cbt/journal/log_1" as Href)
                }
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </React.Fragment>
  );
};

export default Cda;
