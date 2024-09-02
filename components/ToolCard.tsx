import { View, Text, Pressable } from "react-native";
import React, { Component, ReactElement } from "react";
import { Href, router } from "expo-router";

const ToolCard = ({
  name,
  link,
  icon,
}: {
  name: string;
  link: string;
  icon: ReactElement;
}) => {
  return (
    <Pressable
      className="h-24 mb-4 rounded-md bg-gray-200"
      onPress={() => router.push(`${link}` as Href)}
    >
      <View className="w-full h-full max-h-full flex flex-row justify-center">
        <View className="w-1/4 h-full flex justify-center">
          <View className="mx-auto">{icon}</View>
        </View>
        <View className="w-3/4 px-4 h-full justify-center ">
          <Text className="text-center text-lg font-bold">{name} </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ToolCard;
