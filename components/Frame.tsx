import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

const Frame = (props: any) => {
  return (
    <View className="flex-1">
      <View className="flex-1 pt-16 mx-6 justify-center">{props.children}</View>
      <StatusBar style="dark" />
    </View>
  );
};

export default Frame;
