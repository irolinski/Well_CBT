import React from "react";
import { Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import AboutStats from "@/components/about/AboutStats";
import AboutUser from "@/components/about/AboutUser";
import NavigateSettingsModal from "@/components/about/NavigateSettingsModal";
import RecentAchievements from "@/components/about/RecentAchievements";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import { setShowEditProfileModal } from "@/state/features/menus/editProfileModalSlice";
import { AppDispatch } from "@/state/store";
import EditProfileModal from "../about/EditProfileModal";

const About = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <FrameMenu title="About Me">
      <View>
        <View className="m-4">
          <View className="mt-4 items-center">
            <AboutUser />
            <Pressable
              onPress={() => {
                dispatch(setShowEditProfileModal(true));
                console.log("pressed");
              }}
            >
              <Text>Press to open modal</Text>
            </Pressable>
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
        <EditProfileModal />
      </View>
    </FrameMenu>
  );
};

export default About;
