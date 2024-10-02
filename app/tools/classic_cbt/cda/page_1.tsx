import React, { useState } from "react";
import Frame from "@/components/Frame";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { setOldThought, setSituation } from "@/state/features/tools/cdaSlice";
import { Keyboard } from "react-native";
import ToolNav from "@/components/ToolNav";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";

const Page_1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  const [spaceForKeyboard, setSpaceForKeyboard] = useState(false);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={1} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <ToolHeader>Write down a thought that's bothering you.</ToolHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss;
              }}
              accessible={false}
            >
              <View className="my-8">
                <View className="mb-2">
                  <Text className="text-left mr-[15vw]">
                    Describe the context of the thought in a few words:
                  </Text>
                  <TextInput
                    className="h-28 border p-4 my-2 rounded-md text-md"
                    style={{
                      borderColor: "#d9d9d9",
                      backgroundColor: "#FBFBFB",
                      textAlignVertical: "top",
                    }}
                    value={cdaState.situation}
                    onChangeText={(evt) => dispatch(setSituation(evt))}
                    editable
                    multiline={true}
                    numberOfLines={4}
                    maxLength={75}
                    returnKeyType="done"
                    onKeyPress={(evt) =>
                      evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
                    }
                    clearButtonMode="while-editing"
                  ></TextInput>
                  <Text className="text-right">
                    {cdaState.situation.length}/75
                  </Text>
                </View>
                <View className={`${spaceForKeyboard ? "mb-[20vh]" : "mb-2"}`}>
                  <Text className="text-left mr-[15vw]">
                    Now, choose and write down one thought that has arised, that
                    may be particulary painful:
                  </Text>
                  <TextInput
                    className="h-28 border p-4 my-2 rounded-md text-md"
                    style={{
                      borderColor: "#d9d9d9",
                      backgroundColor: "#FBFBFB",
                      textAlignVertical: "top",
                    }}
                    value={cdaState.oldThought}
                    onChangeText={(evt) => dispatch(setOldThought(evt))}
                    editable
                    multiline={true}
                    numberOfLines={4}
                    maxLength={75}
                    returnKeyType="done"
                    onKeyPress={(evt) =>
                      evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
                    }
                    clearButtonMode="while-editing"
                    onFocus={() => {
                      setSpaceForKeyboard(true);
                    }}
                    onBlur={() => {
                      setSpaceForKeyboard(false);
                    }}
                  ></TextInput>
                  <Text className="text-right">
                    {cdaState.oldThought.length}/75
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <AdvanceButton
          containerStyles="bottom-8 my-4 mx-6 justify-center"
          title="Next"
          onPress={() => router.navigate("./page_2")}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_1;
