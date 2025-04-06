import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const TABBAR_HEIGHT = SCREEN_HEIGHT / 9;
const TABBAR_PADDING_Y = TABBAR_HEIGHT / 6;

const TabLayout = () => {
  const { t } = useTranslation("common");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.offBlack,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: TABBAR_PADDING_Y + 5,
          paddingTop: TABBAR_PADDING_Y,
          height: TABBAR_HEIGHT,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabbar.home") ?? "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: t("tabbar.tools") ?? "Tools",
          tabBarIcon: ({ color }) => (
            <View style={{ marginBottom: 0.6 }}>
              <MaterialCommunityIcons
                name="head-cog-outline"
                size={23}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t("tabbar.learn") ?? "Learn",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="lightbulb-outline"
              size={24}
              color={focused ? Colors.lightbulbYellow : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t("tabbar.about_me") ?? "About Me",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
