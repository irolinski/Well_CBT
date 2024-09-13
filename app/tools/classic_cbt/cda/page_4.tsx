import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import Frame from "@/components/Frame";
import { toggleSave } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";

const Page_4 = () => {
  const cdaState = useSelector((state: RootState) => state.cda);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <React.Fragment>
      <ScrollView>
        <BackButton />
        <Frame>
          <View className="py-8">
            <Text className="text-xl font-bold text-center">Overview </Text>

            <View className="my-4 mx-8">
              <View className="border-b">
                <Text className="text-center px-2 pb-2">
                  Here are your results. Try to think about them for a second.
                  Do you feel the new thought makes more sense?
                </Text>
              </View>
              <View>
                <Text className="text-lg font-bold my-4">
                  Your old thought:
                </Text>
                <View className=" bg-gray-200  justify-center b">
                  <Text className="h-24 my-2 mx-4 text-lg text-center ">
                    {cdaState.oldThought}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-lg font-bold my-4">
                  Your new thought:
                </Text>
                <View className=" bg-gray-200  justify-center b">
                  <Text className="h-24 my-2 mx-4 text-lg text-center ">
                    {cdaState.newThought}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row py-4 my-4">
                <Pressable onPress={() => dispatch(toggleSave())}>
                  <View className="w-6 h-6 bg-slate-300">
                    {cdaState.save && (
                      <Feather name="check" size={24} color="black" />
                    )}
                  </View>
                </Pressable>
                <Text className="text-lg text-center mx-4 my-1">
                  Save in journal
                </Text>
              </View>
            </View>
          </View>
        </Frame>
        <CustomButton
          containerStyles="bottom-8 mx-auto"
          title="Next"
          onPress={() => router.navigate("./page_5")}
        />
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_4;
