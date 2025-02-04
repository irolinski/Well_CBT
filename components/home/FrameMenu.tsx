import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { Logo } from "../global/Logo";
import ToolHeader from "../tools/ToolHeader";

const FrameMenu = (props: any) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const topFrameHeight = windowHeight / 6.5;
  const scrollViewHeight = windowHeight - topFrameHeight;

  const logoViewWidth = windowWidth * 0.85;
  const logoViewOffsetBottom = windowHeight * 0.03;

  return (
    <React.Fragment>
      <View
        className="absolute justify-center"
        style={{
          width: windowWidth,
          height: topFrameHeight,
          backgroundColor: Colors.mainBlue,
        }}
      >
        <View
          className="absolute mx-8 mt-8 flex-row items-center justify-between"
          style={{
            width: logoViewWidth,
            bottom: logoViewOffsetBottom,
          }}
        >
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
