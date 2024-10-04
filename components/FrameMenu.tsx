import { Dimensions, ScrollView, View } from "react-native";
import React from "react";
import ToolHeader from "./ToolHeader";
import { Logo } from "./Logo";

const FrameMenu = (props: any) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const topFrameHeight = windowHeight / 6;
  const scrollViewHeight = windowHeight - topFrameHeight;

  return (
    <React.Fragment>
      <View
        className="top-0 justify-center"
        style={{
          width: windowWidth,
          height: topFrameHeight,
          backgroundColor: "#8dbed8",
        }}
      >
        <View className="relative mx-8 flex-row items-center justify-between">
          <ToolHeader className="text-3xl" bright={true}>
            {props.title}
          </ToolHeader>
          <Logo sizePx={52} />
        </View>
      </View>
      <ScrollView
        className="absolute flex-1 rounded-2xl bg-white pt-4"
        style={{
          top: topFrameHeight - 15,
          width: windowWidth,
          height: scrollViewHeight,
        }}
      >
        <View className="mx-4" style={{ paddingBottom: topFrameHeight * 1.2 }}>
          {props.children}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default FrameMenu;
