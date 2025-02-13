import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const TabLayout = () => {
  const { t } = useTranslation("common");

  const windowHeight = Dimensions.get("window").height;

  const tabBarHeight = windowHeight / 9;
  const tabBarPaddingY = tabBarHeight / 6;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.offBlack,
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
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="lightbulb-outline"
              size={24}
              color={focused ? "#FEBE10" : "gray"}
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
