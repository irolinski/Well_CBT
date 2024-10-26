import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, View } from "react-native";

const windowHeight = Dimensions.get("window").height;

const Frame = (props: any) => {
  return (
    <View className="flex-1">
      <View
        className={`mx-6 flex-1 justify-center pt-8 ${windowHeight > 750 ? "my-24" : "my-10"}`}
      >
        {props.children}
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

export default Frame;
