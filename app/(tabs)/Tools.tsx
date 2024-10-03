import React from "react";
import { ScrollView, Text } from "react-native";
import Frame from "@/components/Frame";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ToolCard from "../../components/ToolCard";

const Tools = () => {
  return (
    <Frame>
      <Text className="mb-8 text-center text-4xl font-bold">
        Self-Help Tools
      </Text>
      <ScrollView className="px-6">
        <Text className="my-6 ml-2 text-left text-3xl font-bold italic">
          Classic CBT
        </Text>
        <ToolCard
          name="Identify the Distortions"
          icon={
            <MaterialCommunityIcons
              name="head-check-outline"
              size={36}
              color="black"
            />
          }
          link={"/tools/classic_cbt/cda"}
        />
        <ToolCard
          name="Mood Journal"
          icon={
            <MaterialCommunityIcons
              name="notebook-edit-outline"
              size={36}
              color="black"
            />
          }
          link={"/tools/classic_cbt/journal"}
        />
        <Text className="my-6 ml-2 text-left text-3xl font-bold italic">
          Relax
        </Text>
        <ToolCard
          name="Breathing excercises"
          icon={<Feather name="wind" size={36} color="black" />}
          link={"tools/relax/breathing"}
        />
        <ToolCard
          name="Muscle relaxation"
          icon={<Ionicons name="body-outline" size={36} color="black" />}
          link={"/tools/relax/muscleRelaxation"}
        />
        <Text className="my-6 ml-2 text-left text-3xl font-bold italic">
          Distract yourself
        </Text>
        <ToolCard
          name="Phone to a friend"
          icon={<Entypo name="old-phone" size={36} color="black" />}
          link={"/tools/distract/phone"}
        />
        <ToolCard
          name="Listen to music"
          icon={<Feather name="music" size={36} color="black" />}
          link={"/tools/distract/music"}
        />
      </ScrollView>
    </Frame>
  );
};

export default Tools;
