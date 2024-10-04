import { View, Text, Pressable, ImageBackground } from "react-native";
import React, { ReactNode } from "react";
import { Href, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { JournalImage, PhoneImage } from "@/constants/models/images";

const ToolCard = ({
  name,
  image,
  link,
}: {
  name: string;
  image?: any;
  link: string;
}) => {
  return (
    <Pressable
      className="mb-4 h-20 rounded-xl"
      onPress={() => router.push(`${link}` as Href)}
    >
      <View className="rounded-xl">
        <ImageBackground
          source={image}
          resizeMode="cover"
          className="overflow-hidden rounded-xl"
        >
          <LinearGradient
            colors={["#DED4D", "transparent"]}
            start={[0, 1]}
            end={[1, 0]}
          >
            <View className="flex h-full max-h-full w-full justify-center">
              <Text
                className="ml-4 text-left text-lg"
                style={{ color: "#F5F5F5" }}
              >
                {name}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default ToolCard;
