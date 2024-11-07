import React from "react";
import { ScrollView, Text, View } from "react-native";
import LearnCard from "@/components/LearnCard";
import FrameMenu from "@/components/FrameMenu";

const Learn = () => {
  return (
    <FrameMenu title="Learn">
      <View>
        <Text className="mb-4 text-left text-xl">Category 1</Text>
        {/* <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={require("@/assets/images/card_backgrounds/journal.jpg")}
        />
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={require("@/assets/images/card_backgrounds/journal.jpg")}
        />
        <Text className="mb-4 text-left text-xl">Category 2</Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={require("@/assets/images/card_backgrounds/journal.jpg")}
        /> */}
      </View>
    </FrameMenu>
  );
};

export default Learn;
