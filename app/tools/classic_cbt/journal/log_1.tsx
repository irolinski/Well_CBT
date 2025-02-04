import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { moodValueTitles } from "@/constants/models/tools/journal";
import { Colors } from "@/constants/styles/colorTheme";
import {
  journalResetState,
  setMoodValue,
} from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { MaterialIcons } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";

const Log_1 = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  //swipe-up animation

  const swipeUpAnimMotion = useRef(
    new Animated.Value(windowHeight / 6),
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
            toValue: -windowHeight / 6 + 20, // Move to a position close to final with some overlap
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
        currentPage={1}
        numOfAllPages={6}
        handleBackButtonPress={() => {
          dispatch(journalResetState());
        }}
      />
      <View className="mx-2 my-4 flex-1" style={{ height: windowHeight }}>
        <View
          className="absolute mx-6"
          style={{ top: windowHeight / 7, borderColor: "blue" }}
        >
          <ToolHeader noIndent={true}>
            How would you rate your mood today?
          </ToolHeader>
          <Text className="my-4">
            Use the slider to indicate how you are feeling.
          </Text>
        </View>
        <View
          className="relative flex-row pt-10"
          style={{ top: windowHeight / 2.1 }}
        >
          <View
            style={{
              height: 300,
              width: (windowWidth * 2) / 3,
              right: windowWidth / 15,
            }}
          >
            <Slider
              animateTransitions
              vertical
              trackClickable
              minimumValue={0} // 0.1 causes a visual glitch
              maximumValue={0.6}
              onValueChange={(evt) => {
                dispatch(setMoodValue(Math.round(Number(evt) * 10) + 1));
              }}
              minimumTrackTintColor={
                journalState.moodValue! < 4
                  ? "#D46A6A"
                  : journalState.moodValue! < 6
                    ? "#F38E4E"
                    : "#AED581"
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
              width: (windowWidth * 1) / 3,
              borderColor: "red",
              right: windowWidth / 15,
            }}
          >
            <Animated.View
              style={{ opacity: !journalState.moodValue ? 0 : 0.9 }}
            >
              <Text className="text-3xl">{journalState.moodValue}</Text>
              <Text className="text-2xl">
                {moodValueTitles[journalState.moodValue! - 1]}
              </Text>
            </Animated.View>

            {!journalState.moodValue && (
              <Animated.View
                className="items-center justify-center"
                style={{
                  width: windowWidth / 4,
                  height: windowHeight / 3,
                  bottom: windowHeight / 10,
                }}
              >
                <Animated.View
                  className="items-center justify-center"
                  style={{
                    // width: 70,
                    // height: 70,
                    // borderRadius: 100,
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
                      // textShadowColor: "rgba(63, 63, 63, 0.4)",
                      // textShadowOffset: { width: -1, height: 1 },
                      // textShadowRadius: 4,
                    }}
                  >
                    Swipe up!
                  </Animated.Text>
                  <MaterialIcons
                    name="swipe-up"
                    size={58}
                    color={Colors.mainGray}
                  />
                  {/* <Fontisto name="angle-dobule-left" size={36} color=Colors.mainGray /> */}
                </Animated.View>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
      <View className="mx-6" style={{ bottom: 0.02 * windowHeight }}>
        <AdvanceButton
          title="Next"
          onPress={() => router.navigate("./log_2")}
          btnStyle={{ bottom: windowHeight / 20 }}
          disabled={!journalState.moodValue}
        />
      </View>
    </React.Fragment>
  );
};

export default Log_1;
