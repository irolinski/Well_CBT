import { Href, router } from "expo-router";
import React from "react";
import { Dimensions, ImageBackground, ScrollView, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import ToolNav from "@/components/ToolNav";
// import { WellLogo } from "@/constants/models/images";
import SecondaryButton from "@/components/SecondaryButton";
import { LogoDark } from "@/components/Logo";

const Log_finish = () => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <React.Fragment>
      <ScrollView className="relative">
        <ToolNav currentPage={5} numOfAllPages={5} />
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
              Saved in journal
            </Text>
            <Text className="my-1 mr-[10w] text-center">
              Logging your mood daily is a great way to get to know your
              feelings well.
            </Text>
          </View>
          <View className="absolute bottom-10 left-0 right-0">
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
                router.replace("Tools" as Href);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_finish;
