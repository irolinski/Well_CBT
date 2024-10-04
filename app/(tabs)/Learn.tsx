import React from "react";
import { ScrollView, Text } from "react-native";
import Frame from "@/components/Frame";
import LearnCard from "@/components/LearnCard";
import { JournalImage } from "../../constants/models/images";

const Learn = () => {
  return (
    <Frame>
      <Text className="mb-8 text-center text-4xl font-bold">Learn</Text>
      <ScrollView className="mb-4 px-6">
        <Text className="my-6 ml-2 text-left text-3xl font-bold italic">
          Category 1
        </Text>
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
        <Text className="my-6 ml-2 text-left text-3xl font-bold italic">
          Category 2
        </Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={JournalImage}
        />
      </ScrollView>
    </Frame>
  );
};

export default Learn;
