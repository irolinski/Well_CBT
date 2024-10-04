import React from "react";
import { ScrollView, Text, View } from "react-native";
import Frame from "@/components/Frame";
import LearnCard from "@/components/LearnCard";
import { JournalImage } from "../../constants/models/images";
import FrameMenu from "@/components/FrameMenu";

const Learn = () => {
  return (
    <FrameMenu title="Learn">
      <View>
        <Text className="mb-4 text-left text-xl">Category 1</Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={JournalImage}
        />
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={JournalImage}
        />
        <Text className="mb-4 text-left text-xl">Category 2</Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={JournalImage}
        />
      </View>
    </FrameMenu>
  );
};

export default Learn;
