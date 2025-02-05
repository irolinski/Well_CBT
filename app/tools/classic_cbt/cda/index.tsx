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
      <ImageBackground source={toolBackgrounds.thought_challange}>
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
                  Cognitive Distortion Analysis
                </Text>
                <Text
                  className="my-2 text-sm"
                  style={{ color: Colors.offWhite }}
                >
                  Cognitive Distortion Analysis is an exercise designed to
                  target negative thought patterns.{"\n\n"}
                  You’ll <Text style={{ fontWeight: 500 }}>describe</Text> a
                  situation, <Text style={{ fontWeight: 500 }}>note</Text> an
                  automatic thought,{" "}
                  <Text style={{ fontWeight: 500 }}>identify</Text> any
                  cognitive distortions, and{" "}
                  <Text style={{ fontWeight: 500 }}>reformulate</Text> the
                  thought more rationally.
                  {"\n\n"}For more details, go to a detailed by clicking the
                  link below.
                </Text>
              </View>
            </View>
            <View className="my-16 w-full">
              <AdvanceButton
                className="w-full"
                title="Let's begin"
                onPress={() =>
                  router.replace("tools/classic_cbt/cda/page_1" as Href)
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
