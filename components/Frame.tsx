import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

const Frame = (props: any) => {
  return (
    <View className="flex-1">
      <View className="flex-1 pt-20 mx-6 justify-center">{props.children}</View>
      <StatusBar style="dark" />
    </View>
  );
};

export default Frame;
