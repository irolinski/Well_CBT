import AdvanceButton from "@/components/AdvanceButton";
import DistortionTag from "@/components/DistortionTag";
import Frame from "@/components/Frame";
import { setNewThought } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToolNav from "@/components/ToolNav";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import { Dimensions } from "react-native";

const Page_3 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  const [spaceForKeyboard, setSpaceForKeyboard] = useState(false);
  const keyboardMargin = Dimensions.get("window").width / 3;
  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={3} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              Now, try to correct the thought to make it rational
            </ToolHeader>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="my-4">
                <View>
                  <Text>Distorted thought: </Text>
                  <View
                    className="bg-gray-200 justify-center rounded-lg border mt-4"
                    style={{ borderColor: "#4391BC" }}
                  >
                    <Text className="h-28 my-2 mx-4 text-lg text-center ">
                      {cdaState.oldThought}
                    </Text>
                  </View>
                </View>
                <View className="mt-4 p-2">
                  <Text>Cognitive Distortion:</Text>
                  <View className="w-3/4 mt-4 px-4 mx-auto">
                    <DistortionTag
                      title={cdaState.distortion}
                      checked={false}
                    />
                  </View>
                </View>
                <View className={`${spaceForKeyboard ? "mb-[20vh]" : "mb-2"} `}>
                  <Text>
                    Now, let's try to think of a more rational way to look at
                    this situation:
                  </Text>
                  <TextInput
                    className="h-28 border p-4 my-2 rounded-md text-md"
                    style={{
                      borderColor: "#d9d9d9",
                      backgroundColor: "#FBFBFB",
                    }}
                    value={cdaState.newThought}
                    onChangeText={(evt) => dispatch(setNewThought(evt))}
                    editable
                    multiline
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
                    {cdaState.newThought.length}/75
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <AdvanceButton
          containerStyles="bottom-8 my-4 mx-6 justify-center"
          title="Next"
          onPress={() => router.navigate("./page_4")}
        />
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_3;
