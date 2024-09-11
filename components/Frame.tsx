import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Frame = (props: any) => {
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 pt-8 px-2 justify-center">
        {props.children}
      </SafeAreaView>
      <StatusBar style="dark"/>
    </View>
  );
};

export default Frame;
