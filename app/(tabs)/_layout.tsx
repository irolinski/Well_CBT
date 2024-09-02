import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import HomeIcon from "@expo/vector-icons/AntDesign";
import LightbulbIcon from "@expo/vector-icons/FontAwesome";
import HeadIcon from "@expo/vector-icons/MaterialCommunityIcons";
import DotsIcon from "@expo/vector-icons/Entypo";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ color }) => (
            <HeadIcon name="head-cog-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => (
            <LightbulbIcon name="lightbulb-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="More"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <DotsIcon name="dots-three-horizontal" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
