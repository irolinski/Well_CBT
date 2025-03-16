import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { useSelector } from "react-redux";
import { groundYourselfImages } from "@/assets/images/tools/ground_yourself/ground_yourself";
import ArrowRightButton from "@/components/ArrowRightButton";
import FadeInView from "@/components/FadeInView";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import OneWordTextInput from "@/components/tools/ground_yourself/OneWordTextInput";
import TypewriterText from "@/components/TypewriterText";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { isValidName } from "@/utils/inputValidations";

const FIRST_SLIDE_TIME_MS = 2500;

const Ground_Body_Page_3 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const [currentInstruction, setCurrentInstruction] = useState<
    | "toes_1"
    | "toes_2"
    | "toes_3"
    | "fingers"
    | "back_1"
    | "back_2"
    | "back_3"
    | "feel"
    | null
  >(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feelInput, setFeelInput] = useState<string>("");

  const refPagerView = useRef<PagerView>(null);

  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };

  const goToFirstSlide = () => {
    refPagerView.current!.setPage(0);
  };

  const rotation = useRef(new Animated.Value(0)).current;
  const lift_toes_2 = useRef(new Animated.Value(0)).current;
  const lift_back_2 = useRef(new Animated.Value(0)).current;

  //toes animations
  useEffect(() => {
    if (currentInstruction === "toes_2") {
      Animated.timing(lift_toes_2, {
        toValue: -50, // Adjust this value to control the lift-up effect
        duration: 300, // Smooth animation duration
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [currentInstruction]);

  useEffect(() => {
    if (currentInstruction === "toes_2") {
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 250,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 250,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 250,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 1,
          duration: 200,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 200,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 200,
          easing: Easing.elastic(1.5),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [currentInstruction]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-10deg", "10deg"],
  });

  // back animations

  useEffect(() => {
    if (currentInstruction === "back_2") {
      Animated.timing(lift_back_2, {
        toValue: -150,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [currentInstruction]);

  // run slides
  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setTimeout(() => {
        setCurrentInstruction("toes_1");
        nextSlide();
      }, FIRST_SLIDE_TIME_MS);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName} slideNum={objKey}>
      <View key={objKey} style={{ paddingTop: SCREEN_HEIGHT * 0.05 }}>
        <TypewriterText
          text={t("tools.ground_yourself.body.page_3.instruction_1")}
          size={20}
          cursorColor={Colors.mainGray}
          speed="fast"
          isActive={groundYourselfToolState.currentSlide === objKey}
        />
        <PagerView
          scrollEnabled={false}
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
            <View>
              <Image
                source={groundYourselfImages.feelyourbody}
                style={{
                  marginTop: SCREEN_HEIGHT * 0.2,
                  marginBottom: SCREEN_HEIGHT * 0.1,
                  height: SCREEN_HEIGHT * 0.2,
                  width: SCREEN_HEIGHT * 0.25,
                }}
              ></Image>
            </View>
          </View>
          {/* toes slide */}
          <View
            style={{ marginTop: SCREEN_HEIGHT * 0.075 }}
            className="items-center"
            key="2"
          >
            <FadeInView
              className="w-full"
              isActive={currentInstruction === "toes_2"}
              inputVal={1}
              outputVal={0}
            >
              <View className="w-full">
                <TypewriterText
                  text={t("tools.ground_yourself.body.page_3.toes_1")}
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
                  text={t("tools.ground_yourself.body.page_3.toes_2")}
                  textColor={Colors.darkGray}
                  size={20}
                  cursorColor={Colors.mainGray}
                  speed="fast"
                  delaySeconds={2}
                  isActive={currentInstruction === "toes_2"}
                  onFinish={() => setCurrentInstruction("toes_3")}
                  showOverflow={true}
                />
                <FadeInView isActive={currentInstruction === "toes_3"}>
                  <TypewriterText
                    className="mt-4"
                    text={t("tools.ground_yourself.body.page_3.toes_3")}
                    textColor={Colors.mainGray}
                    size={13}
                    speed="very_fast"
                    delaySeconds={3}
                    isActive={currentInstruction === "toes_3"}
                    showOverflow={true}
                  />
                </FadeInView>
              </View>
            </FadeInView>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolation }] }}
            >
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
              isActive={currentInstruction === "toes_3"}
            >
              <ArrowRightButton
                onPress={() => {
                  setCurrentInstruction("fingers");
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
              text={t("tools.ground_yourself.body.page_3.fingers_1")}
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={20}
              speed="fast"
              showOverflow={true}
              isActive={currentInstruction === "fingers"}
            />
            <TypewriterText
              className="mb-6 mt-2"
              text={t("tools.ground_yourself.body.page_3.fingers_2")}
              textColor={Colors.mainGray}
              size={14}
              speed="fast"
              showOverflow={true}
              isActive={currentInstruction === "fingers"}
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
                  setCurrentInstruction("back_1");
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
            <Animated.View style={{ transform: [{ translateY: lift_back_2 }] }}>
              <FadeInView
                inputVal={1}
                outputVal={0}
                isActive={currentInstruction === "back_2"}
              >
                <TypewriterText
                  text={t("tools.ground_yourself.body.page_3.back_1")}
                  textColor={Colors.darkGray}
                  cursorColor={Colors.mainGray}
                  size={20}
                  speed="fast"
                  showOverflow={true}
                  onFinish={() => setCurrentInstruction("back_2")}
                  isActive={currentInstruction === "back_1"}
                />
              </FadeInView>
            </Animated.View>
            <Animated.View style={{ transform: [{ translateY: lift_back_2 }] }}>
              <FadeInView
                className="mt-6"
                inputVal={0}
                outputVal={1}
                isActive={currentInstruction === "back_2"}
              >
                <View className="mt-8 w-full items-center">
                  <TypewriterText
                    text={t("tools.ground_yourself.body.page_3.back_2")}
                    textColor={Colors.darkGray}
                    cursorColor={Colors.mainGray}
                    size={20}
                    delaySeconds={1.5}
                    speed="fast"
                    showOverflow={true}
                    isActive={currentInstruction === "back_2"}
                  />
                  <TypewriterText
                    className="mt-4"
                    text={t("tools.ground_yourself.body.page_3.back_3")}
                    textColor={Colors.mainGray}
                    size={14}
                    delaySeconds={2}
                    speed="fast"
                    showOverflow={true}
                    isActive={currentInstruction === "back_2"}
                    onFinish={() => setCurrentInstruction("back_3")}
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
                isActive={currentInstruction === "back_3"}
              >
                <ArrowRightButton
                  onPress={() => {
                    nextSlide();
                    setCurrentInstruction("feel");
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
              text={t("tools.ground_yourself.body.page_3.feel_1")}
              textColor={Colors.darkGray}
              cursorColor={Colors.mainGray}
              size={20}
              speed="fast"
              showOverflow={true}
              isActive={currentInstruction === "feel"}
            />
            <TypewriterText
              className="mt-4"
              text={t("tools.ground_yourself.body.page_3.feel_2")}
              textColor={Colors.mainGray}
              size={12}
              speed="fast"
              showOverflow={true}
              isActive={currentInstruction === "feel"}
            />
            <OneWordTextInput
              value={feelInput ?? ""}
              editable={currentInstruction === "feel"}
              autoFocus={currentInstruction === "feel"}
              onChangeText={(value) => {
                if (isValidName(value)) {
                  setFeelInput(value);
                }
              }}
              onPressButton={() => {
                goToFirstSlide();
                onButtonPress();
              }}
              textAlign={"center"}
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

export default Ground_Body_Page_3;
