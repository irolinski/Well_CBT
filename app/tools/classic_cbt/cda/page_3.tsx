import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import { setNewThought } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

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
            <ToolHeader>Now, let's try to make it rational!</ToolHeader>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="my-8">
                <View>
                  <Text>Distorted thought: </Text>
                  <View
                    className="mt-4 justify-center rounded-lg border bg-gray-200"
                    style={{ borderColor: "#4391BC" }}
                  >
                    <Text className="mx-4 my-2 h-28 text-center text-lg">
                      {cdaState.oldThought}
                    </Text>
                  </View>
                </View>
                <View
                  className="my-8 border-b border-t px-2 py-7"
                  style={{ borderColor: "#D9D9D9" }}
                >
                  <Text>Cognitive Distortion:</Text>
                  <View className="mx-auto mt-4 w-3/4 px-4">
                    <DistortionPill
                      title={cdaState.distortion}
                      checked={true}
                      highlighted={false}
                    />
                  </View>
                </View>
                <View className={`${spaceForKeyboard ? "mb-[20vh]" : "mb-2"} `}>
                  <Text>
                    Now, let's try to think of a more rational way to look at
                    this situation:
                  </Text>
                  <TextInput
                    className="text-md my-2 h-28 rounded-md border p-4"
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
