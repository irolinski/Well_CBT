import {
  View,
  Text,
  FlatList,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeIcon from "@expo/vector-icons/AntDesign";
import ToolCard from "../../components/ToolCard";

import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const Tools = () => {
  return (
    <View className="flex-1 py-12 px-2">
      <View className="mb-6 mt-12">
        <Text className="mb-8 font-bold text-4xl text-center">
          Self-Help Tools
        </Text>
        <ScrollView className="px-6 mb-4">
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
            Classic CBT
          </Text>
          <ToolCard
            name="Cognitive Distortion Analysis"
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
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
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
          <Text className="my-6 ml-2 font-bold italic text-3xl text-left">
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
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default Tools;
