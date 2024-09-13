import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import DistortionTag from "@/components/DistortionTag";
import Frame from "@/components/Frame";
import { setNewThought } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Page_3 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);
  return (
    <React.Fragment>
      <ScrollView>
        <BackButton />
        <Frame>
          <View className="py-8">
            <Text className="text-xl font-bold text-center">
              Now, try to correct the thought to make it rational
            </Text>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="my-4 mx-8">
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
                <View className="border-t mt-4 p-2">
                  <Text className="text-lg font-bold my-4">
                    Cognitive Distortion:
                  </Text>
                  <View className="w-3/4 px-4 mx-auto">
                    <DistortionTag title={cdaState.distortion} checked={true} />
                  </View>
                </View>
                <View className="border-t mt-4 p-2">
                  <Text>
                    Now, try to think of a more rational way to look at the
                    situation
                  </Text>
                  <Text className="text-lg font-bold my-4">
                    Your new thought:
                  </Text>
                  <TextInput
                    className=" h-24 border p-4 m-2 bg-gray-100 text-lg"
                    value={cdaState.newThought}
                    onChangeText={(evt) => dispatch(setNewThought(evt))}
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
                    {cdaState.newThought.length}/75
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <CustomButton
          containerStyles="bottom-8 mx-auto"
          title="Next"
          onPress={() => router.navigate("./page_4")}
        />
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_3;
