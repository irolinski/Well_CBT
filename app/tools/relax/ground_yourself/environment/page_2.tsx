import React from "react";
import { Text, View } from "react-native";
import ArrowRightButton from "@/components/ArrowRightButton";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { SCREEN_HEIGHT } from "@/constants/styles/values";

const Ground_Environment_Page_2 = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
      <View className="items-center justify-center">
        <Text>Ground_Environment_Page_2</Text>
        <View className="flex-row justify-center">
          <ArrowRightButton
            style={{ marginTop: SCREEN_HEIGHT * 0.15 }}
            onPress={onButtonPress}
          />
        </View>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Environment_Page_2;
