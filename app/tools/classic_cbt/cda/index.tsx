import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import Frame from "@/components/Frame";
import CustomButton from "@/components/CustomButton";
import { Href, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

const cda = () => {
  return (
    <Frame>
      <BackButton />
      <View className="flex-1 justify-center">
        <Text className="top-8 text-2xl text-center">
          Cognitive Distortion Analysis
        </Text>
        <View className="flex-1 justify-center mx-8 ">
          <Text className="text-lg font-bold">Header</Text>
          <Text className="text-sm my-12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
            pariatur perferendis inventore porro quasi quidem dignissimos eos
            velit fugiat at quibusdam perspiciatis, dicta qui asperiores
            sapiente deleniti harum, distinctio ea.
          </Text>
          <Button title="Learn More" />
        </View>
        <CustomButton
          containerStyles="bottom-8 mx-auto"
          title="Start"
          onPress={() => router.navigate("./page_1")}
        />
      </View>
    </Frame>
  );
};

export default cda;
