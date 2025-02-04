import React from "react";
import { View } from "react-native";
import { toolCardImages } from "@/assets/images/tools/cards/cards";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import ToolCard from "../../components/tools/ToolCard";

const Tools = () => {
  return (
    <FrameMenu title="Tools">
      <View>
        <Text className="mb-8 mt-2 text-left text-2xl">Thought exercises</Text>
        <ToolCard
          name="Cognitive Distortions"
          image={toolCardImages.thoughtsChallange}
          link={"/tools/classic_cbt/cda"}
        />
        <ToolCard
          name="Mood Journal"
          image={toolCardImages.journal}
          link={"/tools/classic_cbt/journal"}
        />
        <ToolCard
          name="Ground Yourself"
          image={toolCardImages.grounding}
          link={"/tools/classic_cbt/grounding"}
        ></ToolCard>
        <Text className="mb-8 mt-2 text-left text-2xl">Relax</Text>
        <ToolCard
          name="Breathing excercises"
          image={toolCardImages.breathing}
          link={"/tools/relax/breathing"}
        />
        <Text className="mb-8 mt-2 text-left text-2xl">Distract yourself</Text>
        <ToolCard
          name="Phone to a friend"
          image={toolCardImages.phone}
          link={"/tools/distract/phone"}
        />
        <ToolCard
          name="Listen to music"
          link={"/tools/distract/music"}
          image={toolCardImages.music}
        />
      </View>
    </FrameMenu>
  );
};

export default Tools;
