import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolNav from "@/components/ToolNav";
import { WellLogo } from "@/constants/models/images";
import SecondaryButton from "@/components/SecondaryButton";

const Page_finish = () => {
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
            <View className="h-20 w-20">
              <ImageBackground
                source={WellLogo}
                resizeMode="contain"
                className="ounded-lg flex-1 justify-center"
              ></ImageBackground>
            </View>
            <Text
              className="my-4 text-center text-2xl"
              style={{ fontFamily: "KodchasanMedium", color: "#1E1E1E" }}
            >
              Congratulations! Your distorted thought just became a little more
              rational.
            </Text>
            <Text className="mr-[10w] text-center">
              Analyse your painful thoughts often to lessen their power over
              you.
            </Text>
          </View>
          <View className="absolute bottom-10 left-0 right-0">
            <View className="mb-4 flex-row justify-between">
              <SecondaryButton
                title="Do one more?"
                containerStyles="w-[45%]"
                onPress={() => {}}
              />
              <SecondaryButton
                title="See journal"
                containerStyles="w-[45%]"
                onPress={() => {}}
              />
            </View>
            <AdvanceButton
              containerStyles="mb-4 justify-center"
              title="Finish"
              onPress={() => {
                router.navigate("./page_finish");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_finish;
