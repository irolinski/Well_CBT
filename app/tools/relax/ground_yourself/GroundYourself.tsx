import React, { useEffect, useRef } from "react";
import { Animated, Easing, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "@/components/BackButton";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { setCurrentSlide } from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch, RootState } from "@/state/store";
import Ground_Touch_Page_1 from "./touch/page_1";
import Ground_Touch_Page_2 from "./touch/page_2";
import Ground_Touch_Page_3 from "./touch/page_3";
import Ground_Touch_Page_4 from "./touch/page_4";

const GroundYourself = () => {
  const dispatch = useDispatch<AppDispatch>();
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );

  const refPagerView = useRef<PagerView>(null);
  const instructionTextAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimation = (
    animRef: Animated.Value,
    duration: number,
    outputVal: number,
  ) => {
    Animated.timing(animRef, {
      toValue: outputVal,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const nextSlide = () => {
    refPagerView.current!.setPage(groundYourselfToolState.currentSlide + 1);
  };
  const goToFirstSlide = () => {
    refPagerView.current!.setPage(0);
  };

  useEffect(() => {
    fadeAnimation(instructionTextAnim, 1500, 1);
  });

  return (
    <React.Fragment>
      <View
        className="top-0 z-10 mb-6 h-16 w-full flex-row items-center justify-between px-6 py-3"
        style={{ top: SCREEN_HEIGHT * 0.055 }}
      >
        <BackButton color={Colors.offBlack} />
        <Text>Touch</Text>
      </View>
      <View
        style={{
          height: SCREEN_HEIGHT,
          paddingTop: SCREEN_HEIGHT * 0.025,
        }}
      >
        <View className="items-cetner relative mx-4 mb-10 pb-4">
          {/* Exercise slides */}
          <View className="h-full w-full px-4">
            <PagerView
              scrollEnabled={false}
              className="h-full w-full justify-center"
              initialPage={0}
              ref={refPagerView}
              onPageSelected={(
                evt: NativeSyntheticEvent<
                  Readonly<{
                    position: Double;
                  }>
                >,
              ) => {
                dispatch(setCurrentSlide(evt.nativeEvent.position));
              }}
            >
              <Ground_Touch_Page_1
                objKey={1}
                onButtonPress={() => {
                  nextSlide();
                }}
              />
              <Ground_Touch_Page_2
                objKey={2}
                onButtonPress={() => {
                  nextSlide();
                }}
              />
              <Ground_Touch_Page_3
                objKey={3}
                onButtonPress={() => {
                  nextSlide();
                }}
              />
              <Ground_Touch_Page_4
                objKey={4}
                handleOneMore={() => {
                  goToFirstSlide();
                }}
              />
            </PagerView>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default GroundYourself;
