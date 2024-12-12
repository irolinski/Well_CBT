import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageSourcePropType,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type LearnArticleCardTypes = {
  title: string;
  subtitle?: string;
  time?: number;
  link: string;
  image: ImageSourcePropType | undefined;
  frameColor?: string;
  textColor?: string;
};

const LearnArticleCard = ({
  title,
  subtitle,
  time,
  link,
  image,
  frameColor,
  textColor,
}: LearnArticleCardTypes) => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <Pressable
      className="mx-8 mb-8 flex-1 justify-center overflow-hidden rounded-xl"
      style={{ height: 250, width: windowWidth * 0.9 }}
      onPress={() => router.push(link as Href)}
    >
      <Image source={image} className="flex-1 justify-center rounded-2xl" />
      <View
        className="absolute bottom-0 w-full px-4 pb-4 pt-5"
        style={{ height: "56%", backgroundColor: frameColor ?? "#8DBED8" }}
      >
        <View className="">
          <View style={{ height: "50%" }}>
            <Text
              className="text-lg"
              style={{ color: "#FFFFFF", fontWeight: 500 }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                className="my-1.5 text-base italic"
                style={{ color: "#FFFFFF" }}
              >
                {subtitle}
              </Text>
            )}
          </View>
          <View
            className="mt-0.5 w-full flex-row justify-between"
            style={{ height: "50%" }}
          >
            <View className="justify-center">
              {time && (
                <Text
                  className="text-base"
                  style={{ color: textColor ?? "#FFFFFF", opacity: 0.75 }}
                >
                  {time} min read
                </Text>
              )}
            </View>
            <View
              className="items-center justify-center"
              style={{ width: "50%" }}
            >
              <TouchableOpacity
                className="flex-row items-center justify-center rounded-lg"
                style={{
                  width: "95%",
                  height: "85%",
                  backgroundColor: "#fbfbfb",
                }}
                onPress={() => router.push(`${link}` as Href)}
              >
                <Text className="mx-1 text-sm" style={{ color: "#212529" }}>
                  Go to article
                </Text>
                <View className="mx-1">
                  <Feather name="arrow-right" size={24} color="#757575" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default LearnArticleCard;
