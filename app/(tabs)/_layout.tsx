import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const TABBAR_HEIGHT_IOS = SCREEN_HEIGHT / 9;
const TABBAR_HEIGHT_ANDROID = SCREEN_HEIGHT / 12;

const TabLayout = () => {
  const { t } = useTranslation("common");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.offBlack,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height:
            Platform.OS === "ios" ? TABBAR_HEIGHT_IOS : TABBAR_HEIGHT_ANDROID,
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
