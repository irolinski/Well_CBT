import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import emotionList from "@/constants/models/journal_emotionList";
import DistortionPill from "@/components/DistortionPill";
import { AppDispatch, RootState } from "@/state/store";
import { setEmotions } from "@/state/features/tools/journalSlice";

const Log_2 = () => {
  // tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  const emotionsArr = journalState.emotions;
  const handlePress = (name: string) => {
    const index = emotionsArr.indexOf(name);
    let newArr = [...emotionsArr];

    if (index >= 0) {
      newArr.splice(index, 1);
    } else {
      if (newArr.length < 5) newArr = [...newArr, name];
    }
    dispatch(setEmotions(newArr));
  };

  console.log(emotionsArr);
  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={2} numOfAllPages={5} />
        <Frame>
          <View className="items-center py-10">
            <ToolHeader>What emotions are you feeling right now?</ToolHeader>
            <View className="my-6">
              <Text className="text-xs">
                Choose at lest one (but it’s also ok to pick many).
              </Text>
              <View className="mx-2 mt-5">
                <Text
                  className="text-right text-xs"
                  style={{ color: "#757575" }}
                >
                  {emotionsArr.length} of 5 selected
                </Text>
                <View className="mt-2 flex-row flex-wrap">
                  {emotionList.map((e, index) => (
                    <DistortionPill
                      title={e.name}
                      checked={Boolean(emotionsArr.indexOf(e.name) >= 0)}
                      //   checked={false}
                      customColor={e.color}
                      onPress={() => handlePress(e.name)}
                      key={index}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Frame>
        <AdvanceButton
          className="bottom-8 mx-6 my-4 justify-center"
          title="Next"
          onPress={() => router.navigate("./log_3")}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_2;
