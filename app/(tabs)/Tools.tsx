import React from "react";
import { View } from "react-native";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";
import {
  DistortedWindow,
  JournalImage,
  PhoneImage,
} from "@/constants/models/images";
import ToolCard from "../../components/ToolCard";

const Tools = () => {
  return (
    <FrameMenu title="Tools">
      <View>
        <Text className="mb-8 mt-2 text-left text-2xl">Classic</Text>
        <ToolCard
          name="Identify the Distortions"
          image={DistortedWindow}
          link={"/tools/classic_cbt/cda"}
        />
        <ToolCard
          name="Mood Journal"
          image={JournalImage}
          link={"/tools/classic_cbt/journal"}
        />
        <Text className="mb-8 mt-2 text-left text-2xl">Relax</Text>
        <ToolCard name="Breathing excercises" link={"/tools/relax/breathing"} />
        <ToolCard
          name="Muscle relaxation"
          link={"/tools/relax/muscleRelaxation"}
        />
        <Text className="mb-8 mt-2 text-left text-2xl">Distract yourself</Text>
        <ToolCard
          name="Phone to a friend"
          image={PhoneImage}
          link={"/tools/distract/phone"}
        />
        <ToolCard name="Listen to music" link={"/tools/distract/music"} />
      </View>
    </FrameMenu>
  );
};

export default Tools;
