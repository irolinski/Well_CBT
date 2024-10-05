import React from "react";
import { Dimensions, View } from "react-native";

import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import { Slider } from "@miblanchard/react-native-slider";
import AdvanceButton from "@/components/AdvanceButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { setMoodValue } from "@/state/features/tools/journalSlice";

const Log_1 = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // tool state
  const moodValueState = useSelector(
    (state: RootState) => state.journal.moodValue,
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <React.Fragment>
      <ToolNav currentPage={1} numOfAllPages={5} />
      <View className="m-2 flex-1" style={{ height: windowHeight }}>
        <View
          className="absolute mx-6"
          style={{ top: windowHeight / 7, borderColor: "blue" }}
        >
          <ToolHeader noIndent={true}>
            How would you rate your mood today?
          </ToolHeader>
          <Text className="mx-4 my-4">
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
              trackMarks={[0.1667, 0.3333, 0.5, 0.6667, 0.8333]}
              renderTrackMarkComponent={() => (
                <View
                  style={{ width: 0.3, height: 10, backgroundColor: "black" }}
                ></View>
              )}
              // minimumTrackTintColor="#AED581"
              // maximumTrackTintColor="#D9D9D9"
              minimumTrackTintColor={
                moodValueState < 4
                  ? "#D46A6A"
                  : moodValueState < 6
                    ? "#F38E4E"
                    : "#AED581"
              }
              maximumTrackTintColor="#f5f5f5"
              thumbTintColor="#F5F5F5"
              thumbStyle={{
                padding: 19,
                borderRadius: 50,
                borderColor: "#B8B8B8",

                borderStyle: "solid",
                borderWidth: 0.5,
              }}
              trackStyle={{
                padding: 15,
                marginLeft: 5,
                borderRadius: 50,
                borderColor: "#B8B8B8",
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
            <Text className="text-3xl">{moodValueState}</Text>
            <Text className="text-2xl">Hi mark!</Text>
          </View>
        </View>
      </View>
      <AdvanceButton
        className="mx-6 my-4 justify-center"
        title="Next"
        onPress={() => router.navigate("./log_2")}
        style={{ bottom: windowHeight / 20 }}
      />
    </React.Fragment>
  );
};

export default Log_1;
