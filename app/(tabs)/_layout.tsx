import { Tabs } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Tools",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="head-cog-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="lightbulb-o"
              size={24}
              color={focused ? "#FEBE10" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About Me",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
            // <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
