import { Image, ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

const ToolCard = ({
  name,
  image,
  icon,
  link,
  onPress,
}: {
  name: string;
  image?: ImageSource;
  icon: ReactNode;
  link: Href;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      className="mb-4"
      style={{ height: 90 }}
      onPress={() => {
        onPress && onPress();
        router.push(`${link}` as Href);
      }}
      activeOpacity={0.85}
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
      />

      <View className="absolute h-full w-full justify-center">
        <View className="ml-4 flex-row items-center">
          {icon}
          <Text
            className="z-10 ml-4 text-left text-lg"
            style={{ color: Colors.whiteSmoke }}
          >
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ToolCard;
