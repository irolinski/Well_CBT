import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, NativeSyntheticEvent, View } from "react-native";
import PagerView from "react-native-pager-view";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import ArrowRightButton from "@/components/global/ArrowRightButton";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/global/TypewriterText";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { dayColors, dayNamesFromMonday } from "@/constants/models/dates";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { Picker } from "@react-native-picker/picker";

const getCurrentDayOfWeekNum = () => {
  let currentDayNum = new Date().getDay();
  if (currentDayNum === 0) {
    currentDayNum = 7;
  }
  return currentDayNum;
};

const currentDayOfWeekNum = getCurrentDayOfWeekNum();

const Ground_Time_Day = ({
  exerciseName,
  objKey,
  onButtonPress,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const [currentInstruction, setCurrentInstruction] = useState<
    | "instruction_1"
    | "instruction_2"
    | "day_of_week_input"
    | "result"
    | "finish"
  >("instruction_1");
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(
    dayNamesFromMonday[2],
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exerciseIsCorrect, setExerciseIsCorrect] = useState(true);

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
  const DayOfWeekTextAnim = () => {
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
    const selectedDayOfWeekNum = dayNamesFromMonday.indexOf(selectedDayOfWeek);
    if (selectedDayOfWeekNum === currentDayOfWeekNum - 1) {
      setExerciseIsCorrect(true);
    } else {
      setExerciseIsCorrect(false);
    }
    nextSlide();
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
            isActive={currentInstruction === "day_of_week_input"}
          >
            <TypewriterText
              text={t("tools.ground_yourself.time.day.instruction_1")}
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
                text={t("tools.ground_yourself.time.day.instruction_2")}
                isActive={currentInstruction === "instruction_2"}
                cursorColor={Colors.mainGray}
                delaySeconds={3}
                onFinish={() => {
                  setCurrentInstruction("day_of_week_input");
                  liftInstruction2PositionAnim(1000).start();
                }}
              />

              <FadeInView
                inputVal={0}
                outputVal={1}
                isActive={currentInstruction === "day_of_week_input"}
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
                    <Text className="text-xl">
                      {t("tools.ground_yourself.time.day.select_a_day")}
                    </Text>
                    <Picker
                      style={{
                        padding: 0,
                        margin: 0,
                      }}
                      selectedValue={selectedDayOfWeek}
                      onValueChange={(itemValue) =>
                        setSelectedDayOfWeek(itemValue)
                      }
                    >
                      {dayNamesFromMonday.map(
                        (dayName: string, indexNum: number) => (
                          <Picker.Item
                            key={indexNum}
                            label={t(`dates.days.${dayName}.full`, {
                              ns: "common",
                            })}
                            value={dayName}
                          />
                        ),
                      )}
                    </Picker>
                    <FadeInView
                      inputVal={0}
                      outputVal={1}
                      isActive={currentInstruction === "day_of_week_input"}
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
                            ? t("tools.ground_yourself.time.day.success")
                            : t("tools.ground_yourself.time.day.failure")
                        }
                        cursorColor={Colors.mainGray}
                      />
                      <TypewriterText
                        isActive={currentSlide === 1}
                        delaySeconds={3}
                        className="mt-4"
                        size={22}
                        speed="very_fast"
                        text={t("tools.ground_yourself.time.day.today_its")}
                        cursorColor={Colors.mainGray}
                        onFinish={() => {
                          setCurrentInstruction("result");
                          setTimeout(() => {
                            DayOfWeekTextAnim().start();
                          }, 250);
                        }}
                      />
                    </View>
                    <View className="w-full items-center">
                      <View className="mx-4 w-full items-center">
                        <FadeInView
                          className="w-full items-center justify-center"
                          inputVal={0}
                          outputVal={1}
                          duration={250}
                          style={{
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
                            className="mt-8 text-center text-4xl font-semibold tracking-widest"
                            style={{
                              fontFamily: "Kodchasan",
                              color:
                                dayColors[
                                  dayNamesFromMonday[
                                    currentDayOfWeekNum - 1
                                  ] as keyof typeof dayColors
                                ],

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
                            {t(
                              "dates.days." +
                                dayNamesFromMonday[currentDayOfWeekNum - 1] +
                                ".full",
                              { ns: "common" },
                            )}
                          </Animated.Text>
                          {/* underline */}
                          <Animated.View
                            style={{
                              height: 3,
                              backgroundColor: Colors.mainGray,
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
