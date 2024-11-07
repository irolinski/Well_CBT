import React from "react";
import { View } from "react-native";
import { toolCardImages } from "@/assets/images/images";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";

import ToolCard from "../../components/ToolCard";

const Tools = () => {
  return (
    <FrameMenu title="Tools">
      <View>
        <Text className="mb-8 mt-2 text-left text-2xl">Thought exercises</Text>
        <ToolCard
          name="Cognitive Distortions"
          image={require("@/assets/images/tools/distortions.webp")}
          link={"/tools/classic_cbt/cda"}
        />
        <ToolCard
          name="Mood Journal"
          image={toolCardImages[1]}
          link={"/tools/classic_cbt/journal"}
        />
        <ToolCard
          name="Ground Yourself"
          image={toolCardImages[2]}
          link={"tools/classic_cbt/grounding"}
        ></ToolCard>
        <Text className="mb-8 mt-2 text-left text-2xl">Relax</Text>
        <ToolCard
          name="Breathing excercises"
          link={"/tools/relax/breathing"}
          image={toolCardImages[3]}
        />
        <Text className="mb-8 mt-2 text-left text-2xl">Distract yourself</Text>
        <ToolCard
          name="Phone to a friend"
          image={toolCardImages[4]}
          link={"/tools/distract/phone"}
        />
        <ToolCard
          name="Listen to music"
          link={"/tools/distract/music"}
          image={toolCardImages[5]}
        />
      </View>
    </FrameMenu>
  );
};

export default Tools;
