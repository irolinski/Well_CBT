import React from "react";
import { View } from "react-native";
import FrameMenu from "@/components/FrameMenu";
import { Dimensions } from "react-native";
import Text from "@/components/global/Text";
import LearnCard from "@/components/tools/learn/LearnCard";
import LearnCategoryCard from "@/components/tools/learn/LearnCategoryCard";

const Learn = () => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <FrameMenu title="Learn">
      <View>
        <Text className="mb-6 mt-2 text-left text-2xl">Today's pick</Text>
        <View className="items-center justify-center">
          <LearnCard
            title={"Dangers of self-diagnosis"}
            subtitle="American Journal of Psychology"
            time={20}
            link="/learn/example_article/"
            image={require("@/assets/images/tools/ground.webp")}
          />
        </View>
        {/* <View className="mb-6">
          <DividerLine width={0.5 * windowWidth} weight={0.5} />
        </View> */}
        <Text
          className="mb-4 mt-2 text-left text-2xl"
          style={{ color: "#27261F" }}
        >
          Categories
        </Text>
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
