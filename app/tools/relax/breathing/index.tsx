import { Href, router } from "expo-router";
import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { toolBackgrounds } from "@/assets/images/tools/backgrounds/backgrounds";
import AdvanceButton from "@/components/AdvanceButton";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/styles/colorTheme";

const BreathingIndexPage = () => {
  return (
    <React.Fragment>
      <ImageBackground source={toolBackgrounds.breathing}>
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
                  Relax with breathing
                </Text>
                <Text
                  className="my-2 text-sm"
                  style={{ color: Colors.offWhite }}
                >
                  In the following exercise, you'll practice{" "}
                  <Text style={{ fontWeight: 500 }}>calming your nerves</Text>{" "}
                  using deep breathing.{"\n\n"}You may start right away, or you
                  can <Text style={{ fontWeight: 500 }}>customize</Text> the
                  exercise to better fit your needs using the settings panel
                  (accessible by clicking the icon in the top-right corner of
                  the screen).
                </Text>
              </View>
            </View>
            <View className="my-16 w-full">
              <AdvanceButton
                className="w-full"
                title="Let's begin"
                onPress={() =>
                  router.replace("tools/relax/breathing/Breathe" as Href)
                }
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </React.Fragment>
  );
};

export default BreathingIndexPage;
