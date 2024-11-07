import { View, Text, Pressable } from "react-native";
import React from "react";
import { Href, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageSource } from "expo-image";

const ToolCard = ({
  name,
  image,
  link,
}: {
  name: string;
  image?: ImageSource;
  link: string;
}) => {
  return (
    <Pressable
      className="mb-4"
      style={{ height: 90 }}
      onPress={() => router.push(`${link}` as Href)}
    >
      <Image
        className="z-0 rounded-xl"
        source={image}
        contentFit="cover"
        style={{ width: "100%", height: "100%" }}
        transition={200}
      />
      <LinearGradient
        colors={["#202020", "transparent"]} // Updated hex code
        start={[0, 1]}
        end={[1, 0]}
        style={{
          position: "absolute", // Ensures the gradient is on top
          height: "100%",
          width: "100%",
          borderRadius: 8, 
        }}
      ></LinearGradient>

      <View className="absolute flex h-full w-full justify-center">
        <Text
          className="z-10 ml-4 text-left text-lg"
          style={{ color: "#F5F5F5" }}
        >
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

export default ToolCard;
