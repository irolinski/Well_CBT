import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { emotionObjType } from "@/constants/models/home/activity_log";
import { emotionStrengthTitles } from "@/constants/models/tools/journal";
import { Colors } from "@/constants/styles/colorTheme";
import { journalStyleConstants } from "@/constants/styles/values";
import { setEmotions } from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Slider } from "@miblanchard/react-native-slider";

const Log_3 = () => {
  //tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  // set strength to blank on BackButton press
  const setDefaultStrenght = () => {
    let newArr = journalState.emotions.map((el) => ({ ...el, strength: 0 }));
    dispatch(setEmotions(newArr));
  };

  const handleSlide = (emotion: emotionObjType, emotionStrenght: number) => {
    let newArr = journalState.emotions.map((el) =>
      el.name === emotion.name ? { ...el, strength: emotionStrenght } : el,
    );
    dispatch(setEmotions(newArr));
  };

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav
          currentPage={3}
          numOfAllPages={6}
          handleBackButtonPress={() => {
            setDefaultStrenght();
          }}
        />
        <Frame>
          <View className="h-full">
            <View className="py-10">
              <ToolHeader noIndent={true}>
                How strong are the emotions you are feeling?
              </ToolHeader>
              <View className="my-6">
                <Text className="text-xs">
                  Use the sliding meters to assess the intensity of the emotions
                  you have chosen.
                </Text>
                <View className="mx-6 mt-4">
                  {journalState.emotions.map((emotionObj, index) => (
                    <View className="mt-6" key={index}>
                      <Text
                        className="mx-4 mb-1.5"
                        style={{
                          color: Colors.darkGray,
                          fontSize: 15,
                          fontWeight: 500,
                        }}
                      >
                        {emotionObj.name}
                      </Text>
                      <Slider
                        animateTransitions
                        trackClickable
                        minimumValue={journalStyleConstants.SLIDER_MIN_VAL} // 0.1 causes a visual glitch
                        maximumValue={
                          journalStyleConstants.EMOTION_SLIDER_MAX_VAL
                        }
                        onValueChange={(evt) => {
                          handleSlide(
                            emotionObj,
                            Math.floor(Number(evt) * 10) + 1,
                          );
                        }}
                        renderThumbComponent={() => (
                          <View
                            style={{
                              width: 18,
                              height: 18,
                              padding: 15,
                              zIndex: 0,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "white",
                              borderRadius: 50,
                            }}
                          >
                            <Text
                              className="absolute z-20 text-center"
                              style={{ color: Colors.darkGray }}
                            >
                              {emotionObj.strength ? emotionObj.strength : null}
                            </Text>
                          </View>
                        )}
                        minimumTrackTintColor={emotionObj.color}
                        maximumTrackTintColor={Colors.whiteSmoke}
                        thumbTintColor={Colors.whiteSmoke}
                        trackStyle={{
                          paddingTop: 10,
                          borderRadius: 50,
                          borderColor: Colors.lightGray,
                          borderStyle: "solid",
                          borderWidth: 1,
                        }}
                      />
                      <View className="mx-2 flex-row justify-end">
                        <Text
                          className="h-5 justify-end"
                          style={{ color: Colors.darkGray }}
                        >
                          {emotionStrengthTitles[emotionObj.strength! - 1]}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title="Next"
            onPress={() => router.navigate("./log_4")}
            disabled={!journalState.emotions.every((e) => e.strength)}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_3;
