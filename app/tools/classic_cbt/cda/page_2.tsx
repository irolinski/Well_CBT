import BackButton from "@/components/BackButton";
import Frame from "@/components/Frame";
import { AppDispatch, RootState } from "@/state/store";
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const page_2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <Frame>
      <BackButton />
      <Text className="top-8 text-xl font-bold text-center">
        Now let's take a closer look...
      </Text>
      <View className="flex-1 mt-12">
        <Text className="text-lg font-bold">Your thought:</Text>
        <Text className="h-32 border p-4 m-4 bg-gray-100 text-lg">
          {cdaState.oldThought}
        </Text>
      </View>
      <View>
        <Text>
          Here is a list of some potential cognitive distortions - choose some
          that could apply to the thought
        </Text>
        <View></View>
      </View>
    </Frame>
  );
};

export default page_2;
