import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { learnArticleCardTypes } from "@/constants/models/learn/learn";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { Feather } from "@expo/vector-icons";

const LearnArticleCard = ({
  title,
  subtitle,
  time,
  link,
  image,
  imagePlacement,
  textColor,
}: learnArticleCardTypes) => {
  const { t } = useTranslation("learn");

  return (
    <Pressable
      className="relative mx-8 justify-center overflow-hidden rounded-xl"
      style={{ height: 280, width: SCREEN_WIDTH * 0.9 }}
      onPress={() => router.push(link as Href)}
    >
      <Image
        source={image}
        className="top-0 w-full justify-center rounded-xl"
        style={{
          height: 400,
          transform: [{ translateY: `${imagePlacement}%` as `${number}%` }],
        }}
        contentFit="cover"
      />
      <BlurView
        className="absolute bottom-0 w-full justify-center px-4 pb-4 pt-5"
        style={{
          height: "56%",
          backgroundColor: "rgba(184, 184, 184, 0.65)",
        }}
        intensity={25}
        tint="systemMaterialDark"
      >
        <View>
          <View>
            <Text
              className="text-lg"
              style={{ color: Colors.white, fontWeight: 500 }}
            >
              {title}
            </Text>

            <Text
              className="my-1.5 text-base italic"
              style={{ color: Colors.white }}
            >
              {subtitle}
            </Text>
          </View>
          <View
            className="mt-0.5 w-full flex-row justify-between"
            style={{ height: 50 }}
          >
            <View className="justify-center">
              {time && (
                <Text
                  className="text-base"
                  style={{ color: textColor ?? Colors.white, opacity: 0.75 }}
                >
                  {t(`article_card.num_minute_read`, { num: time })}
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
                  height: "90%",
                  backgroundColor: Colors.offWhite,
                }}
                onPress={() => router.push(`${link}` as Href)}
              >
                <Text
                  className="mx-1 text-sm"
                  style={{ color: Colors.blackPearl }}
                >
                  {t("index.go_to_article")}
                </Text>
                <View className="mx-1">
                  <Feather
                    name="arrow-right"
                    size={24}
                    color={Colors.darkGray}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BlurView>
    </Pressable>
  );
};

export default LearnArticleCard;
