import React from "react";
import { Dimensions, View } from "react-native";
import AboutStats from "@/components/about/AboutStats";
import AboutUser from "@/components/about/AboutUser";
import NavigateSettingsModal from "@/components/about/NavigateSettingsModal";
import RecentAchievements from "@/components/about/RecentAchievements";
import UserSettingsModal from "@/components/about/UserSettingsModal";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const About = () => {
  return (
    <FrameMenu title="About Me">
      <View>
        <View className="m-4">
          <View className="mt-4 items-center">
            <AboutUser />
          </View>
          <View className="mt-4">
            <Text
              className="mb-4 mt-2 text-left text-2xl"
              style={{ color: "#27261F" }}
            >
              Recent Achievements
            </Text>
            <View>
              <RecentAchievements />
            </View>
          </View>
          <View className="mt-4">
            <Text
              className="mb-4 mt-2 text-left text-2xl"
              style={{ color: "#27261F" }}
            >
              Stats
            </Text>
            <View>
              <AboutStats />
            </View>
          </View>
        </View>
        <NavigateSettingsModal />
      </View>
    </FrameMenu>
  );
};

export default About;
