import { Href, router } from "expo-router";
import React from "react";
import { Button, Pressable, Text, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/styles/colorTheme";

const BreathingIndexPage = () => {
  return (
    <React.Fragment>
      <View className="absolute left-6 top-12 z-10">
        <BackButton />
      </View>
      <View className="h-full justify-center bg-gray-500 px-6">
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
              <Text className="my-2 text-sm" style={{ color: Colors.offWhite }}>
                Lorem ipsum dolor sit amet consectetur. Amet maecenas varius non
                urna eget vulputate vulputate viverra. Amet in lectus nisl
                phasellus sit nunc cum ac duis. Pharetra eget sociis sit id sit
                mattis est nunc. Habitasse tincidunt risus felis in nibh nam
                adipiscing.
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
    </React.Fragment>
  );
};

export default BreathingIndexPage;
