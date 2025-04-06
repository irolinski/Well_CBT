import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { moodValueTitles } from "@/constants/models/tools/journal";
import { journal_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import {
  journalStyleConstants,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/constants/styles/values";
import {
  journalResetState,
  setMoodValue,
} from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";

const TOOL_NAME = journal_tool.name;
const CURRENT_PAGE = 1;

const Log_1 = () => {
  const { t } = useTranslation(["tools", "common"]);

  // tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  //swipe-up animation

  const swipeUpAnimMotion = useRef(
    new Animated.Value(SCREEN_HEIGHT / 6),
  ).current;
  const swipeUpAnimOpacity = useRef(new Animated.Value(0)).current;

  const swipeUpAnim = () => {
    Animated.loop(
      Animated.parallel([
        Animated.parallel([
          Animated.timing(swipeUpAnimOpacity, {
            toValue: 0.9,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(swipeUpAnimMotion, {
            toValue: -SCREEN_HEIGHT / 6 + 20, // Move to a position close to final with some overlap
            duration: 1500, //2000 for ball
            useNativeDriver: true,
            easing: Easing.bounce, // Initial easing effect
          }),
        ]),
        Animated.sequence([
          Animated.delay(350),
          Animated.timing(swipeUpAnimOpacity, {
            toValue: 0,
            duration: 1300, //2200 for ball
            useNativeDriver: true,
          }),
          Animated.delay(500),
        ]),
      ]),
    ).start();
  };

  useEffect(() => {
    swipeUpAnim();
  }, []);

  return (
    <React.Fragment>
      <ToolNav
        currentPage={CURRENT_PAGE}
        numOfAllPages={journal_tool.num_of_pages}
        handleBackButtonPress={() => {
          dispatch(journalResetState());
        }}
      />
      <View className="mx-2 my-4 flex-1" style={{ height: SCREEN_HEIGHT }}>
        <View
          className="absolute mx-6"
          style={{ top: SCREEN_HEIGHT / 7, borderColor: "blue" }}
        >
          <ToolHeader noIndent={true}>
            {t(`tools.${TOOL_NAME}.exercise.page_1.header`)}
          </ToolHeader>
          <Text className="my-4">
            {t(`tools.${TOOL_NAME}.exercise.page_1.instruction_1`)}
          </Text>
        </View>
        <View
          className="relative flex-row pt-10"
          style={{ top: SCREEN_HEIGHT / 2.1 }}
        >
          <View
            style={{
              height: 300,
              width: (SCREEN_WIDTH * 2) / 3,
              right: SCREEN_WIDTH / 15,
            }}
          >
            <Slider
              animateTransitions
              vertical
              trackClickable
              minimumValue={journalStyleConstants.SLIDER_MIN_VAL}
              maximumValue={journalStyleConstants.MOOD_SLIDER_MAX_VAL}
              onValueChange={(evt) => {
                dispatch(setMoodValue(Math.round(Number(evt) * 10) + 1));
              }}
              minimumTrackTintColor={
                journalState.moodValue! < 4
                  ? Colors.red
                  : journalState.moodValue! < 6
                    ? Colors.orange
                    : Colors.green
              }
              maximumTrackTintColor={Colors.whiteSmoke}
              thumbTintColor={Colors.whiteSmoke}
              thumbStyle={{
                padding: 15,
                borderRadius: 50,
                borderStyle: "solid",
                borderColor: Colors.lightGray,
                borderWidth: 2,
              }}
              trackStyle={{
                padding: 7,
                marginLeft: 5,
                borderRadius: 50,
                borderColor: Colors.lightGray,
                borderStyle: "solid",
                borderWidth: 2,
              }}
            />
          </View>
          <View
            className="absolute mr-8"
            style={{
              height: 200,
              width: (SCREEN_WIDTH * 1) / 3,
              borderColor: "red",
              right: SCREEN_WIDTH / 15,
            }}
          >
            <Animated.View
              style={{ opacity: !journalState.moodValue ? 0 : 0.9 }}
            >
              <Text className="text-3xl">{journalState.moodValue}</Text>
              <Text className="text-2xl">
                {t(
                  `tools.${TOOL_NAME}.mood_value_titles.${moodValueTitles[journalState.moodValue! - 1]}`,
                )}
              </Text>
            </Animated.View>

            {!journalState.moodValue && (
              <Animated.View
                className="items-center justify-center"
                style={{
                  width: SCREEN_WIDTH / 4,
                  height: SCREEN_HEIGHT / 3,
                  bottom: SCREEN_HEIGHT / 10,
                }}
              >
                <Animated.View
                  className="items-center justify-center"
                  style={{
                    width: 130,
                    height: 130,
                    opacity: swipeUpAnimOpacity,
                    transform: [{ translateY: swipeUpAnimMotion }],
                  }}
                >
                  <Animated.Text
                    className="mb-8 text-center text-3xl"
                    style={{
                      color: Colors.mainGray,
                    }}
                  >
                    {t(`tools.${TOOL_NAME}.exercise.page_1.instruction_2`)}
                  </Animated.Text>
                  <MaterialIcons
                    name="swipe-up"
                    size={58}
                    color={Colors.mainGray}
                  />
                </Animated.View>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
      <View className="mx-6" style={{ bottom: 0.02 * SCREEN_HEIGHT }}>
        <AdvanceButton
          title={t("buttons.next", { ns: "common" })}
          onPress={() => router.navigate("./log_2")}
          btnStyle={{ bottom: SCREEN_HEIGHT / 20 }}
          disabled={!journalState.moodValue}
        />
      </View>
    </React.Fragment>
  );
};

export default Log_1;
