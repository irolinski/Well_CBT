import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import AboutStats from "@/components/about/AboutStats";
import AboutUser from "@/components/about/AboutUser";
import NavigateSettingsModal from "@/components/about/NavigateSettingsModal";
import RecentAchievements from "@/components/about/RecentAchievements";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import { Colors } from "@/constants/styles/colorTheme";
import EditProfileModal from "../about/EditProfileModal";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <FrameMenu title={t(`index.title`)}>
      <View>
        <View className="m-4">
          <View className="mt-4 items-center">
            <AboutUser />
          </View>
          <View className="mt-4">
            <Text
              className="mb-4 mt-2 text-left text-2xl"
              style={{ color: Colors.offBlack }}
            >
              {t(`index.recent_achievements`)}
            </Text>
            <View>
              <RecentAchievements />
            </View>
          </View>
          <View className="mt-4">
            <Text
              className="mb-4 mt-2 text-left text-2xl"
              style={{ color: Colors.offBlack }}
            >
              {t(`index.stats`)}
            </Text>
            <View>
              <AboutStats />
            </View>
          </View>
        </View>
        <NavigateSettingsModal />
        <EditProfileModal />
      </View>
    </FrameMenu>
  );
};

export default About;
