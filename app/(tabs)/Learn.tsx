import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { cbtIMG } from "./../../constants/models/images";
import { LinearGradient } from "expo-linear-gradient";
import LearnCard from "@/components/LearnCard";

const Learn = () => {
  return (
    <View className="flex-1 py-12 px-2">
      <View className="mb-6 mt-12">
        <Text className="mb-8 font-bold text-4xl text-center ">Learn</Text>
        <ScrollView className="px-6 mb-4">
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
            Category 1
          </Text>
          <LearnCard
            name={"Cognitive-Behavioral Therapy"}
            link={""}
            image={cbtIMG}
          />
          <LearnCard
            name={"Cognitive-Behavioral Therapy"}
            link={""}
            image={cbtIMG}
          />
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
            Category 2
          </Text>
          <LearnCard
            name={"Cognitive-Behavioral Therapy"}
            link={""}
            image={cbtIMG}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Learn;
