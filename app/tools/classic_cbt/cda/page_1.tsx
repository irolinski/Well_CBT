import React from "react";
import Frame from "@/components/Frame";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { setOldThought, setSituation } from "@/state/features/tools/cdaSlice";
import BackButton from "@/components/BackButton";
import { Keyboard } from "react-native";

const Page_1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <React.Fragment>
      <ScrollView>
        <BackButton />
        <Frame>
          <View className="py-8">
            <Text className="text-xl font-bold text-center">
              Write down a thought that's bothering you
            </Text>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View className="my-4 mx-8">
                <View className="mb-2">
                  <Text className="text-center">
                    First, in few words describe the situation or the context of
                    the thought
                  </Text>
                  <Text className="text-lg font-bold mt-2">Situation:</Text>
                  <TextInput
                    className=" h-24 border p-4 m-2 bg-gray-100 text-lg"
                    value={cdaState.situation}
                    onChangeText={(evt) => dispatch(setSituation(evt))}
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
                    {cdaState.situation.length}/75
                  </Text>
                </View>
                <View className="mb-2">
                  <Text className="text-center">
                    Now, choose and write down one thought that has arised, that
                    may be particulary painful
                  </Text>
                  <Text className="text-lg font-bold mt-2">Your thought:</Text>
                  <TextInput
                    className="h-24 border p-4 m-2 bg-gray-100 text-lg"
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
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Frame>
        <CustomButton
          containerStyles="bottom-8 mx-auto"
          title="Next"
          onPress={() => router.navigate("./page_2")}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_1;
