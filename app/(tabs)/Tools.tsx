import React from "react";
import { View } from "react-native";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";
import ToolCard from "../../components/ToolCard";


const Tools = () => {
  console.log("render");

  return (
    <FrameMenu title="Tools">
      <View>
        <Text className="mb-8 mt-2 text-left text-2xl">Classic</Text>
        <ToolCard
          name="Identify the Distortions"
          image={require("@/assets/images/affirmation-images/english-countryside-1.webp")}
          link={"/tools/classic_cbt/cda"}
        />
        <ToolCard
          name="Mood Journal"
          image={require("@/assets/images/affirmation-images/english-countryside-2.webp")}
          link={"/tools/classic_cbt/journal"}
        />
        <ToolCard
          name="Ground Yourself"
          image={require("@/assets/images/affirmation-images/english-countryside-3.webp")}
          link={"tools/classic_cbt/grounding"}
        ></ToolCard>
        <Text className="mb-8 mt-2 text-left text-2xl">Relax</Text>
        <ToolCard
          name="Breathing excercises"
          link={"/tools/relax/breathing"}
          image={require("@/assets/images/affirmation-images/english-countryside-4.webp")}
        />
        <ToolCard
          name="Muscle relaxation"
          link={"/tools/relax/muscleRelaxation"}
          image={require("@/assets/images/affirmation-images/english-countryside-1.webp")}
        />
        <Text className="mb-8 mt-2 text-left text-2xl">Distract yourself</Text>
        <ToolCard
          name="Phone to a friend"
          image={require("@/assets/images/affirmation-images/english-countryside-1.webp")}
          link={"/tools/distract/phone"}
        />
        <ToolCard
          name="Listen to music"
          link={"/tools/distract/music"}
          image={require("@/assets/images/affirmation-images/english-countryside-1.webp")}
        />
      </View>
    </FrameMenu>
  );
};

export default Tools;
