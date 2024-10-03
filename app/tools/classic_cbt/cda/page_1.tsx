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
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import CDATextInput from "@/components/tools/CDATextInput";
import { setOldThought, setSituation } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

const Page_1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

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
                  <CDATextInput
                    value={cdaState.situation}
                    handleChangeText={(evt: string) =>
                      dispatch(setSituation(evt))
                    }
                    keyboardMargin={false}
                  />
                </View>
                <View>
                  <Text className="mr-[15%] text-left">
                    Now, choose and write down one thought that has arised, that
                    may be particulary painful:
                  </Text>
                  <CDATextInput
                    value={cdaState.oldThought}
                    handleChangeText={(evt: string) =>
                      dispatch(setOldThought(evt))
                    }
                    keyboardMargin={true}
                  />
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
