import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import LearnCard from "@/components/learn/LearnCard";
import FrameMenu from "@/components/FrameMenu";
import LearnCategoryCard from "@/components/learn/LearnCategoryCard";
import DividerLine from "@/components/DividerLine";

const Learn = () => {
  return (
    <FrameMenu title="Learn">
      <View>
        <Text className="mb-8 mt-2 text-left text-2xl">Today's pick</Text>
        <View className="items-center justify-center">
          <LearnCard
            title={"Dangers of self-diagnosis"}
            subtitle="American Journal of Psychology"
            time={20}
            link={""}
            image={require("@/assets/images/tools/ground.webp")}
          />
        </View>
        <Text className="mb-8 mt-2 text-left text-2xl">Explore</Text>
        <View className="flex-row flex-wrap justify-center overflow-hidden">
          <LearnCategoryCard name="Science" backgroundColor="#8DBED8" link="" />
          <LearnCategoryCard
            name="Lifestyle"
            backgroundColor="#81C784"
            link=""
          />
          <LearnCategoryCard
            name="Tutorials"
            backgroundColor="#F9A947"
            link=""
          />
          <LearnCategoryCard
            name="Psychology"
            backgroundColor="#73848D"
            link=""
          />
        </View>
      </View>
    </FrameMenu>
  );
};

export default Learn;
