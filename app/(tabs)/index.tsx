import React from "react";
import { Dimensions, View } from "react-native";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";
import JournalCard from "@/components/JournalCard";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
  return (
    <FrameMenu title="Home" className="items-center justify-center">
      <View>
        {/* Welcome */}
        <View className="my-4">
          <View className="mx-4 justify-center py-8">
            <Text className="text-2xl">Hi Olga, how are you doing?</Text>
          </View>
        </View>
        {/* Recent */}
        <View>
          <Text className="mb-8 mt-2 text-left text-2xl">Recent</Text>
          <View className="px-1">
            <JournalCard toolName="cda" link={""} date="20 Sep 2024" />
            <JournalCard toolName="breathing" link={""} date="20 Sep 2024" />
            <JournalCard
              toolName="journal"
              link={""}
              moodValue={5}
              date="20 Sep 2024"
            />
          </View>
        </View>
        <View
          className="items-center justify-center"
          style={{ width: 0.8 * windowWidth, height: 0.3 * windowHeight }}
        >
          <Text>Quote Widget!</Text>
        </View>
      </View>
    </FrameMenu>
  );
};

export default Home;
