import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useSelector } from "react-redux";
import { groundYourselfImages } from "@/assets/images/tools/ground_yourself/ground_yourself";
import ArrowRightButton from "@/components/ArrowRightButton";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import OneWordTextInput from "@/components/tools/ground_yourself/OneWordTextInput";
import TypewriterText from "@/components/TypewriterText";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { isValidName } from "@/utils/inputValidations";

const FIRST_SLIDE_TIME_MS = 2500;

const Ground_Environment_Page_3 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const refPagerView = useRef<PagerView>(null);

  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };

  const goToFirstSlide = () => {
    refPagerView.current!.setPage(0);
  };

  const rotation = useRef(new Animated.Value(0)).current;

  // run slides
  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setTimeout(() => {
        setCurrentInstruction("instruction_1");
        nextSlide();
      }, FIRST_SLIDE_TIME_MS);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
      <View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <TypewriterText
          text="Notice your surroundings"
          size={20}
          cursorColor={Colors.mainGray}
          speed="fast"
          isActive={groundYourselfToolState.currentSlide === objKey}
        />
        <PagerView
          className="h-full w-full"
          initialPage={0}
          ref={refPagerView}
          onPageSelected={(
            evt: NativeSyntheticEvent<
              Readonly<{
                position: Double;
              }>
            >,
          ) => {
            setCurrentSlide(evt.nativeEvent.position);
          }}
        >
          {/* blank slide */}
          <View className="h-full w-full items-center justify-start" key="1">
            <View
              className="flex-row justify-between"
              style={{
                marginTop: SCREEN_HEIGHT * 0.1,
                marginBottom: SCREEN_HEIGHT * 0.1,
              }}
            >
              <Image
                contentFit="scale-down"
                source={groundYourselfImages.chair}
                style={{
                  height: SCREEN_HEIGHT * 0.15,
                  width: SCREEN_HEIGHT * 0.15,
                }}
              />
              <Image
                contentFit="scale-down"
                source={groundYourselfImages.streetlamp}
                style={{
                  height: SCREEN_HEIGHT * 0.15,
                  width: SCREEN_HEIGHT * 0.15,
                }}
              />
            </View>
          </View>
          {/* toes slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="2"
          >
            {/* <FadeInView
              className="w-full"
              isActive={currentInstruction === "toes_2"}
              inputVal={1}
              outputVal={0}
            >
              <View className="w-full">
                <TypewriterText
                  text="First, wiggle your toes"
                  textColor={Colors.darkGray}
                  size={20}
                  cursorColor={Colors.mainGray}
                  speed="fast"
                  delaySeconds={1}
                  isActive={currentInstruction === "toes_1"}
                  showOverflow={true}
                  onFinish={() => setCurrentInstruction("toes_2")}
                />
              </View>
            </FadeInView>

            <FadeInView
              className="w-full"
              inputVal={0}
              outputVal={1}
              isActive={currentInstruction === "toes_2"}
              style={{ transform: [{ translateY: lift_toes_2 }] }}
            >
              <View className="w-full">
                <TypewriterText
                  className="mt-8"
                  text="Now, stretch your legs and feet"
                  textColor={Colors.darkGray}
                  size={20}
                  cursorColor={Colors.mainGray}
                  speed="fast"
                  delaySeconds={2}
                  isActive={currentInstruction === "toes_2"}
                  showOverflow={true}
                />
                <TypewriterText
                  className="mt-4"
                  text="notice the feeling, take your time"
                  textColor={Colors.darkGray}
                  size={14}
                  speed="fast"
                  delaySeconds={3}
                  isActive={currentInstruction === "toes_2"}
                  showOverflow={true}
                />
                <TypewriterText
                  className="mt-2"
                  text="(when you're ready, tap the button below)"
                  textColor={Colors.mainGray}
                  size={13}
                  speed="very_fast"
                  delaySeconds={6}
                  isActive={currentInstruction === "toes_2"}
                  onFinish={() => setCurrentInstruction("toes_3")}
                  showOverflow={true}
                />
              </View>
            </FadeInView> */}
            <Animated.View>
              <Image
                contentFit="fill"
                style={{
                  marginTop: SCREEN_HEIGHT * 0.06,
                  marginBottom: SCREEN_HEIGHT * 0.1,
                  height: SCREEN_HEIGHT * 0.1,
                  width: SCREEN_HEIGHT * 0.1 * 1.3,
                }}
                source={groundYourselfImages.foot}
              />
            </Animated.View>
            <FadeInView
              inputVal={0}
              outputVal={1}
              className="flex-row items-center justify-center"
            >
              <ArrowRightButton
                onPress={() => {
                  nextSlide();
                }}
              />
            </FadeInView>
          </View>
          {/* fingers slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="3"
          >
            <TypewriterText
              text="Now, stretch your fingers"
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={20}
              speed="fast"
              showOverflow={true}
            />
            <TypewriterText
              className="mb-6 mt-2"
              text="(hands can follow their lead if they wish)"
              textColor={Colors.mainGray}
              size={14}
              speed="fast"
              showOverflow={true}
            />
            <Image
              contentFit="fill"
              style={{
                marginTop: SCREEN_HEIGHT * 0.05,
                marginBottom: SCREEN_HEIGHT * 0.125,

                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_HEIGHT * 0.25,
              }}
              source={groundYourselfImages.stretchfingers}
            />

            <View className="flex-row items-center justify-center">
              <ArrowRightButton
                onPress={() => {
                  nextSlide();
                }}
              />
            </View>
          </View>
          {/* back slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="4"
          >
            <Animated.View>
              <FadeInView inputVal={1} outputVal={0}>
                <TypewriterText
                  text="Now, focus on your back"
                  textColor={Colors.darkGray}
                  cursorColor={Colors.mainGray}
                  size={20}
                  speed="fast"
                  showOverflow={true}
                />
              </FadeInView>
            </Animated.View>
            <Animated.View>
              <FadeInView className="mt-6" inputVal={0} outputVal={1}>
                <View className="mt-8 w-full items-center">
                  <TypewriterText
                    text="Feel it around, stretch it out"
                    textColor={Colors.darkGray}
                    cursorColor={Colors.mainGray}
                    size={20}
                    delaySeconds={1.5}
                    speed="fast"
                    showOverflow={true}
                  />
                  <TypewriterText
                    className="mt-4"
                    text="(when you're done, tap the button to proceed)"
                    textColor={Colors.mainGray}
                    size={14}
                    delaySeconds={2}
                    speed="fast"
                    showOverflow={true}
                  />
                </View>
                <View className="flex-row justify-center">
                  <Image
                    className="h-28 w-32"
                    contentFit="fill"
                    style={{
                      marginTop: SCREEN_HEIGHT * 0.06,
                      marginBottom: SCREEN_HEIGHT * 0.15,
                    }}
                    source={groundYourselfImages.stretch}
                  />
                </View>
              </FadeInView>
              <FadeInView
                className="flex-row items-center justify-center"
                inputVal={0}
                outputVal={1}
              >
                <ArrowRightButton
                  onPress={() => {
                    nextSlide();
                  }}
                />
              </FadeInView>
            </Animated.View>
          </View>
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="5"
          >
            <TypewriterText
              text="Now, name one sensation you feel in any of your limbs"
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={20}
              speed="fast"
              showOverflow={true}
            />
            <TypewriterText
              className="mt-4"
              text="(it can also be a feeling you got while doing this exercise)"
              textColor={Colors.mainGray}
              size={12}
              speed="fast"
              showOverflow={true}
            />

            <Image
              className="h-28 w-32"
              contentFit="fill"
              style={{
                marginTop: SCREEN_HEIGHT * 0.06,
                marginBottom: SCREEN_HEIGHT * 0.1,
              }}
              source={groundYourselfImages.scanbody}
            />
          </View>
        </PagerView>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Environment_Page_3;
