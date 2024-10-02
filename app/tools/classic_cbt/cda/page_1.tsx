import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import { setOldThought, setSituation } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

const Page_1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  const [spaceForKeyboard, setSpaceForKeyboard] = useState(false);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={1} numOfAllPages={5} />
        <Frame>
          <View className="pt-10">
            <ToolHeader>Write down a thought that's bothering you.</ToolHeader>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss;
              }}
              accessible={false}
            >
              <View className="my-8">
                <View className="mb-2">
                  <Text className="mr-[15%] text-left">
                    Describe the context of the thought in a few words:
                  </Text>
                  <TextInput
                    className="text-md my-2 h-28 rounded-md border p-4"
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
                    maxLength={150}
                    returnKeyType="done"
                    onKeyPress={(evt) =>
                      evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
                    }
                    clearButtonMode="while-editing"
                  ></TextInput>
                  <Text className="text-right">
                    {cdaState.situation.length}/150
                  </Text>
                </View>
                <View className={`${spaceForKeyboard ? "mb-[20vh]" : "mb-2"}`}>
                  <Text className="mr-[15%] text-left">
                    Now, choose and write down one thought that has arised, that
                    may be particulary painful:
                  </Text>
                  <TextInput
                    className="text-md my-2 h-28 rounded-md border p-4"
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
                    maxLength={150}
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
                    {cdaState.oldThought.length}/150
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <AdvanceButton
          containerStyles="bottom-0 my-4 mx-6 justify-center"
          title="Next"
          onPress={() => router.navigate("./page_2")}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_1;
