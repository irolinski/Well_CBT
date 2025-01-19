import React from "react";
import { Dimensions, View } from "react-native";
import AboutStats from "@/components/about/AboutStats";
import AboutUser from "@/components/about/AboutUser";
import Text from "@/components/global/Text";
import FrameMenu from "@/components/home/FrameMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const About = () => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <FrameMenu title="About Me">
      <View>
        <View className="m-4">
          <View className="absolute w-full flex-row justify-end">
            <MaterialCommunityIcons
              name="cog-outline"
              size={windowWidth * 0.1}
              color="#B8B8B8"
            />
          </View>
          <View className="mt-4 items-center">
            <AboutUser />
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
      </View>
    </FrameMenu>
  );
};

export default About;
