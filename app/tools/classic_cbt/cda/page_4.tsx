import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { Colors } from "@/constants/styles/colorTheme";
import { handleSaveCDAEntry } from "@/db/tools";
import { cdaResetState, toggleSave } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import Feather from "@expo/vector-icons/Feather";

const Page_4 = () => {
  const cdaState = useSelector((state: RootState) => state.cda);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    handleSaveCDAEntry(cdaState);
    dispatch(cdaResetState());
  };

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={4} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              Here are your results. Try to meditate on them for a second.
            </ToolHeader>
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
              <View className="mt-4">
                <Text>Rational thought:</Text>
                <CDATextBox textContent={cdaState.newThought} />
              </View>
              <Pressable onPress={() => dispatch(toggleSave())}>
                <View className="mx-2 mt-10 flex flex-row pt-4">
                  <View
                    className="h-6 w-6 rounded-md border"
                    style={{
                      borderColor: Colors.darkBlue,
                      backgroundColor: cdaState.save
                        ? Colors.mainBlue
                        : "transparent",
                    }}
                  >
                    {cdaState.save && (
                      <View className="mx-auto">
                        <Feather name="check" size={22} color="#F7F7F7" />
                      </View>
                    )}
                  </View>
                  <Text
                    className="mx-4 my-1 text-center"
                    style={{ color: Colors.darkBlue }}
                  >
                    Save to journal?
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title="Finish"
            onPress={() => {
              handleSave();
              router.navigate("./page_finish");
            }}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_4;
