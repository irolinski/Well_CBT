import { Href, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import AboutStats from "@/components/about/AboutStats";
import AboutUser from "@/components/about/AboutUser";
import NavigateSettingsModal from "@/components/about/NavigateSettingsModal";
import RecentAchievements from "@/components/about/RecentAchievements";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
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
              <View className="my-4 flex-row justify-end">
                <AdvanceButton
                  title="See all"
                  onPress={() => {
                    router.push("/about/achievements" as Href);
                  }}
                  btnStyle={{
                    width: 150,
                    height: 45,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#D9D9D9",
                    borderRadius: 12,
                  }}
                  textStyle={{ color: "#27261F" }}
                />
              </View>
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
