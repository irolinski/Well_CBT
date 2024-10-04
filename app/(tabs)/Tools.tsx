import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import Text from "@/components/global/Text";
import ToolCard from "../../components/ToolCard";
import { Logo } from "@/components/Logo";
import ToolHeader from "@/components/ToolHeader";
import {
  DistortedWindow,
  JournalImage,
  PhoneImage,
} from "@/constants/models/images";

const Tools = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const topFrameHeight = windowHeight / 6;
  const scrollViewHeight = windowHeight - topFrameHeight;

  return (
    <React.Fragment>
      <View
        className="top-0 justify-center"
        style={{
          width: windowWidth,
          height: topFrameHeight,
          backgroundColor: "#8dbed8",
        }}
      >
        <View className="relative mx-8 flex-row items-center justify-between">
          <ToolHeader className="text-3xl" bright={true}>
            Tools
          </ToolHeader>
          <Logo sizePx={52} />
        </View>
      </View>
      <ScrollView
        className="absolute flex-1 rounded-2xl bg-white pt-12"
        style={{
          top: topFrameHeight - 15,
          width: windowWidth,
          height: scrollViewHeight,
        }}
      >
        <View className="mx-4" style={{ paddingBottom: topFrameHeight * 1.2 }}>
          <Text className="mb-4 text-left text-xl">Classic CBT</Text>

          <ToolCard
            name="Identify the Distortions"
            image={DistortedWindow}
            link={"/tools/classic_cbt/cda"}
          />
          <ToolCard
            name="Mood Journal"
            image={JournalImage}
            link={"/tools/classic_cbt/journal"}
          />
          <Text className="mb-4 text-left text-xl">Relax</Text>
          <ToolCard
            name="Breathing excercises"
            link={"tools/relax/breathing"}
          />
          <ToolCard
            name="Muscle relaxation"
            link={"/tools/relax/muscleRelaxation"}
          />
          <Text className="mb-4 text-left text-xl">Distract yourself</Text>
          <ToolCard
            name="Phone to a friend"
            image={PhoneImage}
            link={"/tools/distract/phone"}
          />
          <ToolCard name="Listen to music" link={"/tools/distract/music"} />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Tools;
