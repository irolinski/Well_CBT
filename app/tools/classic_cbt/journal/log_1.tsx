import { router } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import { moodValueTitles } from "@/constants/models/journal";
import {
  journalResetState,
  setMoodValue,
} from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Slider } from "@miblanchard/react-native-slider";

const Log_1 = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <React.Fragment>
      <ToolNav
        currentPage={1}
        numOfAllPages={6}
        handleBackButtonPress={() => {
          dispatch(journalResetState());
        }}
      />
      <View className="m-2 flex-1" style={{ height: windowHeight }}>
        <View
          className="absolute mx-6"
          style={{ top: windowHeight / 7, borderColor: "blue" }}
        >
          <ToolHeader noIndent={true}>
            How would you rate your mood today?
          </ToolHeader>
          <Text className="m-4">
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
                journalState.moodValue < 4
                  ? "#D46A6A"
                  : journalState.moodValue < 6
                    ? "#F38E4E"
                    : "#AED581"
              }
              maximumTrackTintColor="#f5f5f5"
              thumbTintColor="#F5F5F5"
              thumbStyle={{
                padding: 15,
                borderRadius: 50,
                borderStyle: "solid",
                borderColor: "#D9D9D9",
                borderWidth: 2,
              }}
              trackStyle={{
                padding: 7,
                marginLeft: 5,
                borderRadius: 50,
                borderColor: "#D9D9D9",
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
            <Text className="text-3xl">{journalState.moodValue}</Text>
            <Text className="text-2xl">
              {moodValueTitles[journalState.moodValue - 1]}
            </Text>
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
