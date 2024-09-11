import React, { useState } from "react";
import Frame from "@/components/Frame";
import { Pressable, Text, TextInput, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { setOldThought } from "@/state/features/tools/cdaSlice";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

const page_1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <Frame>
      <BackButton />
      <Text className="top-8 text-xl font-bold text-center">
        Write down a thought that's bothering you
      </Text>
      <View className="my-24 mx-8">
        <Text className="text-gray-900">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
          inventore quas quidem odit dolore voluptatem blanditiis vero ratione
          unde.
        </Text>
        <TextInput
          className=" h-32 border p-4 m-4 bg-gray-100 text-lg"
          value={cdaState.oldThought}
          onChangeText={(evt) => dispatch(setOldThought(evt))}
          editable
          multiline
          numberOfLines={4}
          maxLength={75}
        ></TextInput>
        <Text className="text-right">{cdaState.oldThought.length}/75</Text>
      </View>
      <CustomButton
        containerStyles="bottom-8 mx-auto"
        title="Next"
        onPress={() => router.navigate("./page_2")}
      />
    </Frame>
  );
};

export default page_1;
