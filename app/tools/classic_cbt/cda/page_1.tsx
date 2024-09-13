import React from "react";
import Frame from "@/components/Frame";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { setOldThought } from "@/state/features/tools/cdaSlice";
import BackButton from "@/components/BackButton";
import { Keyboard } from "react-native";

const Page_1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <>
      <BackButton />
      <Frame>
        <View>
          <Text className="top-8 text-xl font-bold text-center">
            Write down a thought that's bothering you
          </Text>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View className="my-24 mx-8">
              <Text className="text-gray-900">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi
                inventore quas quidem odit dolore voluptatem blanditiis vero
                ratione unde.
              </Text>
              <TextInput
                className=" h-32 border p-4 m-4 bg-gray-100 text-lg"
                value={cdaState.oldThought}
                onChangeText={(evt) => dispatch(setOldThought(evt))}
                editable
                multiline
                numberOfLines={4}
                maxLength={75}
                returnKeyType="done"
                onKeyPress={(evt) =>
                  evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
                }
                clearButtonMode="while-editing"
              ></TextInput>
              <Text className="text-right">
                {cdaState.oldThought.length}/75
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Frame>
      <CustomButton
            containerStyles="bottom-8 mx-auto"
            title="Next"
            onPress={() => router.navigate("./page_2")}
          />
    </>
  );
};

export default Page_1;
