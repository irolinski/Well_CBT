import {
  View,
  Text,
  Pressable,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";

const LearnCard = ({
  name,
  link,
  image,
}: {
  name: string;
  link: string;
  image: ImageSourcePropType | undefined;
}) => {
  return (
    <Pressable
      className="flex-1 mb-8 h-52 rounded-lg justify-center"
      onPress={() => router.push(link as Href)}
    >
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="flex-1 ounded-lg justify-center"
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.8)"]}
          className="flex-1 justify-center items-center"
        >
          <Text className="text-center font-bold text-2xl text-gray-100 ">
            {name}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export default LearnCard;
