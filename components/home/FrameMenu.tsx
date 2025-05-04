import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logoImages } from '@/assets/images/global/logo/logo';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/styles/values';
import ToolHeader from '../tools/ToolHeader';

const LOGO_VIEW_WIDTH = SCREEN_WIDTH * 0.85;
const LOGO_VIEW_OFFSET_BOTTOM = SCREEN_HEIGHT * 0.03;

const FrameMenu = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const insets = useSafeAreaInsets();
  const TOP_FRAME_HEIGHT = 85 + insets.top;

  return (
    <View style={{ flex: 1 }}>
      {/* Top Frame */}
      <View
        style={{
          width: SCREEN_WIDTH,
          height: TOP_FRAME_HEIGHT,
          backgroundColor: Colors.mainBlue,
          paddingTop: insets.top,
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <View
          className="mx-8 mt-8 flex-row items-center justify-between"
          style={{
            width: LOGO_VIEW_WIDTH,
            bottom: LOGO_VIEW_OFFSET_BOTTOM,
            position: "absolute",
          }}
        >
          <ToolHeader className="text-3xl" bright={true}>
            {title}
          </ToolHeader>
          <Image
            source={logoImages.logo}
            contentFit="contain"
            style={{ width: 90, height: 55 }}
          />
        </View>
      </View>

      {/* ScrollView takes the rest of the screen */}
      <View
        style={{
          flex: 1,
          marginTop: TOP_FRAME_HEIGHT - 15,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 16,
            paddingHorizontal: 16,
            paddingBottom: TOP_FRAME_HEIGHT,
          }}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

export default FrameMenu;
