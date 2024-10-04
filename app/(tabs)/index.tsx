import { View } from "react-native";
import React from "react";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";

const Home = () => {
  return (
    <FrameMenu title="Home">
      <View>
        <Text>Hello, world!</Text>
      </View>
    </FrameMenu>
  );
};

export default Home;
