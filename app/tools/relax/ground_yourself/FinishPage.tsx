import React from "react";
import { Text, View } from "react-native";
import GroundYourselfSlideFrame from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";

const Ground_Finish_Page = ({
  exerciseName,
  objKey,
  onButtonPress,
}: GroundYourselfSlideProps) => {
  return (
    <GroundYourselfSlideFrame exerciseName={exerciseName}>
      <View>
        <Text>Ground_Finish_Page</Text>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Finish_Page;
