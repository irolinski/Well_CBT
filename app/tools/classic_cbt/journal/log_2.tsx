import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import { emotionList } from "@/constants/models/journal";
import {
  emotionObjType,
  setEmotions,
} from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";

const Log_2 = () => {
  // tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (emotion: emotionObjType) => {
    let newArr = [...journalState.emotions];

    const index = newArr
      .map(function (e) {
        return e.name;
      })
      .indexOf(emotion.name);

    if (index >= 0) {
      newArr.splice(index, 1);
    } else {
      if (newArr.length < 5) newArr = [...newArr, emotion];
    }
    dispatch(setEmotions(newArr));
  };

  const isChecked = (name: string) => {
    return Boolean(
      [...journalState.emotions]
        .map(function (e) {
          return e.name;
        })
        .indexOf(name) >= 0,
    );
  };

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={2} numOfAllPages={6} />
        <Frame>
          <View className="py-10">
            <ToolHeader>What emotions are you feeling right now?</ToolHeader>
            <View className="my-6">
              <Text className="text-xs">
                Choose at lest one (but it’s also ok to pick many).
              </Text>
              <View className="mx-2 mt-5">
                <Text
                  className="text-right text-xs"
                  style={{
                    color:
                      journalState.emotions.length < 5 ? "#757575" : "#D46A6A",
                  }}
                >
                  {journalState.emotions.length} of 5 selected
                </Text>
                <View className="mt-2 flex-row flex-wrap">
                  {emotionList.map((e, index) => (
                    <DistortionPill
                      title={e.name}
                      checked={isChecked(e.name)}
                      customColor={e.color}
                      onPress={() =>
                        handlePress({ name: e.name, color: e.color })
                      }
                      key={index}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title="Next"
            onPress={() => router.navigate("./log_3")}
            disabled={journalState.emotions.length < 1 && true}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_2;
