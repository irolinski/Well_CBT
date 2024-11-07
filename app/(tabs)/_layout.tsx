import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import HomeIcon from "@expo/vector-icons/AntDesign";
import LightbulbIcon from "@expo/vector-icons/FontAwesome";
import HeadIcon from "@expo/vector-icons/MaterialCommunityIcons";
import DotsIcon from "@expo/vector-icons/Entypo";
import { Dimensions } from "react-native";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const windowHeight = Dimensions.get("window").height;

  const tabBarHeight = windowHeight / 9;
  const tabBarPaddingY = tabBarHeight / 6;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: tabBarPaddingY + 5,
          paddingTop: tabBarPaddingY,
          height: tabBarHeight,
        },
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
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ color }) => (
            <HeadIcon name="head-cog-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ focused }) => (
            <LightbulbIcon
              name="lightbulb-o"
              size={24}
              color={focused ? "#FEBE10" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <DotsIcon name="dots-three-horizontal" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};


export default TabLayout;
