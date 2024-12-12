import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import CDATextInput from "@/components/tools/cda/CDATextInput";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { setNote } from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";

const Log_4 = () => {
  const windowHeight = Dimensions.get("window").height;

  //tool state
  const dispatch = useDispatch<AppDispatch>();
  const journalState = useSelector((state: RootState) => state.journal);
  console.log(journalState);
  return (
    <React.Fragment>
      <ToolNav currentPage={4} numOfAllPages={6} />
      <Frame>
        <View className="h-full">
          <View className="py-12">
            <ToolHeader>What have you been up to recently?</ToolHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss;
              }}
              accessible={false}
            >
              <View className="my-8">
                <View className="mb-2">
                  <Text className="mr-[15%] text-left">
                    Note down anything you deem worthy.
                  </Text>
                  <CDATextInput
                    value={journalState.note}
                    handleChangeText={(evt: string) => dispatch(setNote(evt))}
                    keyboardMargin={false}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Frame>
      <View className="bottom-16 mx-6">
        <AdvanceButton
          title="Next"
          onPress={() => router.navigate("./log_5")}
          btnStyle={{ bottom: windowHeight / 20 }}
        />
      </View>
    </React.Fragment>
  );
};

export default Log_4;
