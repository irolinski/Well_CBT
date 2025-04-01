import React from "react";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { Logo } from "../global/Logo";
import ToolHeader from "../tools/ToolHeader";

const TOP_FRAME_HEIGHT = SCREEN_HEIGHT / 6.5;
const SCROLL_VIEW_HEIGHT = SCREEN_HEIGHT - TOP_FRAME_HEIGHT;

const LOGO_SIZE = 52;
const LOGO_VIEW_WIDTH = SCREEN_WIDTH * 0.85;
const LOGO_VIEW_OFFSET_BOTTOM = SCREEN_HEIGHT * 0.03;

const FrameMenu = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <React.Fragment>
      <View
        className="absolute justify-center"
        style={{
          width: SCREEN_WIDTH,
          height: TOP_FRAME_HEIGHT,
          backgroundColor: Colors.mainBlue,
        }}
      >
        <View
          className="absolute mx-8 mt-8 flex-row items-center justify-between"
          style={{
            width: LOGO_VIEW_WIDTH,
            bottom: LOGO_VIEW_OFFSET_BOTTOM,
          }}
        >
          <ToolHeader className="text-3xl" bright={true}>
            {title}
          </ToolHeader>
          <Logo sizePx={LOGO_SIZE} />
        </View>
      </View>
      <ScrollView
        className="absolute flex-1 rounded-2xl bg-white pt-4"
        style={{
          top: TOP_FRAME_HEIGHT - 15,
          width: SCREEN_WIDTH,
          height: SCROLL_VIEW_HEIGHT,
        }}
      >
        <View
          className="mx-4"
          style={{ paddingBottom: TOP_FRAME_HEIGHT * 1.2 }}
        >
          {children}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default FrameMenu;
