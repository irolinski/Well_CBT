import React from "react";
import { ScrollView, Text, View } from "react-native";
import LearnCard from "@/components/LearnCard";
import FrameMenu from "@/components/FrameMenu";

const Learn = () => {
  return (
    <FrameMenu title="Learn">
      <View>
        <Text className="mb-4 text-left text-xl">Featured today</Text>
        <View className="items-center justify-center">
          <LearnCard
            title={"Dangers of self-diagnosis"}
            subtitle="American Journal of Psychology"
            time={20}
            link={""}
            image={require("@/assets/images/tools/ground.webp")}
          />
        </View>
        <Text className="mb-4 text-left text-xl">Categories</Text>
      </View>
    </FrameMenu>
  );
};

export default Learn;
