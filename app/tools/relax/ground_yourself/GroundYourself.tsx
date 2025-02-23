import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "@/components/BackButton";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { setCurrentSlide } from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch, RootState } from "@/state/store";
import Ground_Touch_Page_1 from "./touch/page_1";
import Ground_Touch_Page_2 from "./touch/page_2";

// time per slide is a bad idea as I want to show different elements at different times in the space of a single slide too
// i need a hook that runs a function upon finishing typewriter effect or upon displaying the next slide;
// those functions need to call next functions
//what have I put myself into

const BAR_LENGTH = SCREEN_WIDTH * 0.85;

const GroundYourself = () => {
  const dispatch = useDispatch<AppDispatch>();
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );

  const [slideTimeLimit, setSlideTimeLimit] = useState<number>(10);
  const [slideTimeRemaining, setSlideTimeRemaining] = useState<number>(10);

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

  const progressBarAnim = useRef(new Animated.Value(-BAR_LENGTH)).current;
  const animateProgressBar = (duration: number) => {
    let val = -BAR_LENGTH + (slideTimeRemaining / slideTimeLimit) * BAR_LENGTH;
    Animated.timing(progressBarAnim, {
      toValue: val,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const nextSlide = () => {
    refPagerView.current!.setPage(groundYourselfToolState.currentSlide + 1);
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

              <View key="3">
                <TypewriterText
                  text="Focus on the fabric of your clothes, from head to toe."
                  size={20}
                  speed="very_fast"
                  isActive={groundYourselfToolState.currentSlide === 2}
                />
              </View>

              <View key="4">
                <TypewriterText
                  text="How would you describe its texture?"
                  size={20}
                  speed="fast"
                  isActive={groundYourselfToolState.currentSlide === 3}
                />
              </View>

              <View key="5">
                <TypewriterText
                  text="What is its color?"
                  size={20}
                  speed="fast"
                  isActive={groundYourselfToolState.currentSlide === 4}
                />
              </View>

              <View key="6">
                <TypewriterText
                  text="How does it make you feel?"
                  size={20}
                  speed="fast"
                  isActive={groundYourselfToolState.currentSlide === 5}
                />
              </View>
            </PagerView>

            {/* Progress bar */}
            {/* <View
              className="bottom-8 items-center justify-center"
              style={{
                width: "100%",
                transform: [{ translateY: SCREEN_HEIGHT * 0.01 }],
              }}
            >
              <View
                className="overflow-hidden"
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: Colors.offWhite,
                  Radius: 5,
                }}
              >
                <Animated.View
                  style={{
                    width: SCREEN_WIDTH,
                    height: 6,
                    backgroundColor: Colors.darkGray,
                    transform: [
                      {
                        translateX: -500,
                      },
                    ],
                    top: 0,
                  }}
                ></Animated.View>
              </View>
            </View> */}
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default GroundYourself;
