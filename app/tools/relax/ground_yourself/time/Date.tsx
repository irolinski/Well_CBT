import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import DatePicker from "@/components/global/DatePicker";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/global/TypewriterText";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { selectedLanguage } from "@/hooks/i18n";
import { numToString_addZero } from "@/utils/dates";

const getCurrentDateObj = () => {
  const currentDate = new Date();
  const currentDateObj = {
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  };
  return currentDateObj;
};

const Ground_Time_Day = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const [currentInstruction, setCurrentInstruction] = useState<
    "instruction_1" | "instruction_2" | "date_input" | "result" | "finish"
  >("instruction_1");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [exerciseIsCorrect, setExerciseIsCorrect] = useState(true);
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const currentDate = getCurrentDateObj();

  const refPagerView = useRef<PagerView>(null);
  const nextSlide = () => {
    refPagerView.current!.setPage(currentSlide + 1);
  };

  const instruction2PositionAnim = useRef(new Animated.Value(0)).current;
  const liftInstruction2PositionAnim = (duration: number) => {
    return Animated.timing(instruction2PositionAnim, {
      toValue: -75,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    });
  };

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const underlineWidthAnim = useRef(new Animated.Value(0)).current;
  const DateTextAnim = () => {
    return Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(underlineWidthAnim, {
        toValue: 150,
        duration: 500,
        useNativeDriver: false,
      }),
    ]);
  };

  const checkExercise = () => {
    const selectedDateNumObj = {
      day: Number(selectedDate.day),
      month: Number(selectedDate.month),
      year: Number(selectedDate.year),
    };
    if (
      selectedDateNumObj.day === currentDate.day &&
      selectedDateNumObj.month === currentDate.month &&
      selectedDateNumObj.year === currentDate.year
    ) {
      setExerciseIsCorrect(true);
    } else {
      setExerciseIsCorrect(false);
    }
    nextSlide();
  };

  const DisplayedDate = ({ dateFormat }: { dateFormat: "YMD" | "DMY" }) => {
    return (
      <Text className="text-2xl" style={{ color: Colors.white }}>
        {dateFormat === "DMY" &&
          `${numToString_addZero(currentDate.day)} - ${numToString_addZero(currentDate.month)} - ${currentDate.year}`}
        {dateFormat === "YMD" &&
          `${numToString_addZero(currentDate.year)} - ${numToString_addZero(currentDate.month)} - ${numToString_addZero(currentDate.day)}`}
      </Text>
    );
  };

  return (
    <GroundYourselfSlideFrame
      exerciseName={exerciseName}
      slideNum={objKey}
      exerciseLenght={exerciseLength}
    >
      <View
        style={{
          paddingTop: SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT * 0.05 : null,
        }}
      >
        <FadeInView
          inputVal={0}
          outputVal={1}
          duration={1000}
          onFinish={() => {
            setCurrentInstruction("instruction_1");
          }}
        >
          <FadeInView
            inputVal={1}
            outputVal={0}
            duration={750}
            isActive={currentInstruction === "date_input"}
          >
            <TypewriterText
              text={t("tools.ground_yourself.time.date.instruction_1")}
              speed="medium"
              isActive={currentInstruction === "instruction_1"}
              cursorColor={Colors.mainGray}
              onFinish={() => {
                setCurrentInstruction("instruction_2");
              }}
            />
          </FadeInView>
          <FadeInView
            className="mt-4"
            inputVal={0}
            outputVal={1}
            isActive={currentInstruction === "instruction_2"}
          >
            <Animated.View
              style={{ transform: [{ translateY: instruction2PositionAnim }] }}
            >
              <TypewriterText
                text={t("tools.ground_yourself.time.date.instruction_2")}
                isActive={currentInstruction === "instruction_2"}
                cursorColor={Colors.mainGray}
                delaySeconds={3}
                onFinish={() => {
                  setCurrentInstruction("date_input");
                  liftInstruction2PositionAnim(1000).start();
                }}
              />

              <FadeInView
                inputVal={0}
                outputVal={1}
                isActive={currentInstruction === "date_input"}
              >
                <PagerView
                  className="mt-10 w-full"
                  style={{ height: 400 }}
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
                  <View key="1" className="h-full">
                    <Text className="text">
                      {t("tools.ground_yourself.time.date.todays_date_is") +
                        ":"}
                    </Text>
                    <DatePicker
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat={selectedLanguage === "en" ? "YMD" : "DMY"}
                    />
                    <FadeInView
                      inputVal={0}
                      outputVal={1}
                      isActive={currentInstruction === "date_input"}
                      className="flex-row justify-center"
                    >
                      <ArrowRightButton
                        style={{ marginTop: SCREEN_HEIGHT * 0.1 }}
                        onPress={() => {
                          currentSlide === 0 && checkExercise();
                        }}
                      />
                    </FadeInView>
                  </View>
                  <View key="2" className="w-full items-start justify-start">
                    <View className="w-full">
                      <TypewriterText
                        isActive={currentSlide === 1}
                        text={
                          exerciseIsCorrect
                            ? t("tools.ground_yourself.time.date.success")
                            : t("tools.ground_yourself.time.date.failure")
                        }
                        cursorColor={Colors.mainGray}
                      />
                      <TypewriterText
                        isActive={currentSlide === 1}
                        delaySeconds={3}
                        className="mt-4"
                        size={22}
                        speed="very_fast"
                        text={
                          t("tools.ground_yourself.time.date.todays_date_is") +
                          "..."
                        }
                        cursorColor={Colors.mainGray}
                        onFinish={() => {
                          setCurrentInstruction("result");
                          setTimeout(() => {
                            DateTextAnim().start();
                          }, 250);
                        }}
                      />
                    </View>
                    <View className="w-full items-center">
                      <View className="mx-4 w-full items-center">
                        <FadeInView
                          className="mt-12 w-3/4 items-center justify-center rounded-full py-8"
                          inputVal={0}
                          outputVal={1}
                          duration={250}
                          style={{
                            backgroundColor: Colors.mainBlue,
                            transform: [
                              {
                                translateY: bounceAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [10, 0], // Moves up 10px
                                }),
                              },
                            ],
                          }}
                          onFinish={() => {
                            setCurrentInstruction("finish");
                          }}
                          isActive={currentInstruction === "result"}
                        >
                          <Animated.Text
                            className="text-center text-4xl font-semibold tracking-widest"
                            style={{
                              fontFamily: "Kodchasan",

                              transform: [
                                {
                                  translateY: bounceAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [10, 0], // Moves up 10px
                                  }),
                                },
                              ],
                            }}
                          >
                            {/* current date here */}
                            <DisplayedDate
                              dateFormat={
                                selectedLanguage === "en" ? "YMD" : "DMY"
                              }
                            />
                          </Animated.Text>
                          {/* underline */}
                          <Animated.View
                            style={{
                              height: 3,
                              backgroundColor: Colors.whiteSmoke,
                              marginTop: 10,
                              width: underlineWidthAnim,
                            }}
                          />
                        </FadeInView>
                      </View>
                    </View>
                    <FadeInView
                      inputVal={0}
                      outputVal={1}
                      duration={2500}
                      isActive={currentInstruction === "finish"}
                      className="w-full flex-row justify-center"
                    >
                      <ArrowRightButton
                        style={{ marginTop: SCREEN_HEIGHT * 0.1 }}
                        onPress={() => onButtonPress()}
                      />
                    </FadeInView>
                  </View>
                </PagerView>
              </FadeInView>
            </Animated.View>
          </FadeInView>
        </FadeInView>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Time_Day;
