import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import AdvanceButton from "@/components/AdvanceButton";
import { router } from "expo-router";
import BackButton from "@/components/BackButton";

const Cda = () => {
  return (
    <React.Fragment>
      <View className="absolute top-12 left-6 z-10">
        <BackButton />
      </View>
      <View className="bg-gray-500 px-6 h-full justify-center">
        <View className="justify-center items-center">
          <View className="absolute top-8 left-8"></View>
          <View>
            <View className="my-4 mr-[15vw] justify-center">
              <Text
                className="text-2xl my-4 font-bold text-left "
                style={{ fontFamily: "KodchasanMedium", color: "#F5F5F5" }}
              >
                Cognitive Distortion Analysis
              </Text>
              <Text className="text-sm my-2" style={{ color: "#F5F5F5" }}>
                Lorem ipsum dolor sit amet consectetur. Amet maecenas varius non
                urna eget vulputate vulputate viverra. Amet in lectus nisl
                phasellus sit nunc cum ac duis. Pharetra eget sociis sit id sit
                mattis est nunc. Habitasse tincidunt risus felis in nibh nam
                adipiscing.
              </Text>
            </View>
          </View>
          <View className=" my-16 w-full">
            <AdvanceButton
              containerStyles="w-full"
              title="Let's begin"
              onPress={() => router.navigate("./page_1")}
            />
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Cda;
