import React from "react";
import { ScrollView, Text } from "react-native";
import Frame from "@/components/Frame";
import LearnCard from "@/components/LearnCard";
import { CbtIMG } from "../../constants/models/images";

const Learn = () => {
  return (
    <Frame>
      <Text className="mb-8 font-bold text-4xl text-center ">Learn</Text>
      <ScrollView className="px-6 mb-4">
        <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
          Category 1
        </Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={CbtIMG}
        />
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={CbtIMG}
        />
        <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
          Category 2
        </Text>
        <LearnCard
          name={"Cognitive-Behavioral Therapy"}
          link={""}
          image={CbtIMG}
        />
      </ScrollView>
    </Frame>
  );
};

export default Learn;
