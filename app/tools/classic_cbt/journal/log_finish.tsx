import { Href, router } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import { LogoDark } from "@/components/global/Logo";
import Text from "@/components/global/Text";
import SecondaryButton from "@/components/SecondaryButton";
import ToolNav from "@/components/tools/ToolNav";
import { RootState } from "@/state/store";

const Log_finish = () => {
  const windowHeight = Dimensions.get("window").height;

  //tool state
  const journalState = useSelector((state: RootState) => state.journal);

  return (
    <React.Fragment>
      <ScrollView className="relative">
        <ToolNav currentPage={6} numOfAllPages={6} hideBackButton={true} />
        <View
          className="mx-6 flex-1 justify-center"
          style={{ height: windowHeight }}
        >
          <View className="items-center justify-center pb-32">
            <LogoDark sizePx={80} />
            <Text
              className="my-4 px-4 text-center text-2xl"
              style={{ fontFamily: "KodchasanMedium", color: "#1E1E1E" }}
            >
              {journalState.save
                ? "Saved in journal"
                : "Journal entry discarded"}
            </Text>
            <Text className="my-1 mr-[10w] text-center">
              {journalState.save
                ? "Logging your mood daily is a great way to get to know your feelings well."
                : "You can save your future journal entries by checking the box at the end of the form."}
            </Text>
          </View>
          <View className="absolute bottom-16 left-0 right-0">
            <View className="mb-4 flex-row justify-between">
              <SecondaryButton
                title="Go to journal"
                className="w-[45%]"
                onPress={() => {}}
              />
            </View>
            <AdvanceButton
              className="mb-4 justify-center"
              title="Return to Tools"
              onPress={() => {
                router.replace("tools" as Href);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_finish;
