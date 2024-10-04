import { View } from "react-native";
import React from "react";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";

const Home = () => {
  return (
    <FrameMenu title="Hi, how are you?">
      <View>
        <Text>Hello, world!</Text>
      </View>
    </FrameMenu>
  );
};

export default Home;
