import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import ToolTextInput from "@/components/tools/ToolTextInput";
import { Colors } from "@/constants/styles/colorTheme";
import { setNewThought } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

const Page_3 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);
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
                  <CDATextBox textContent={cdaState.oldThought} />
                </View>
                <View
                  className="my-8 border-b border-t px-2 py-7"
                  style={{ borderColor: Colors.lightGray }}
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
                <View>
                  <Text>
                    Now, let's try to think of a more rational way to look at
                    this situation:
                  </Text>
                  <ToolTextInput
                    value={cdaState.newThought}
                    handleChangeText={(evt: string) =>
                      dispatch(setNewThought(evt))
                    }
                    keyboardMargin={true}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title="Next"
            onPress={() => router.navigate("./page_4")}
            disabled={!cdaState.newThought}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_3;
