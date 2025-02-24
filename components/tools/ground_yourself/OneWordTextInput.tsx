import React from "react";
import { Keyboard, TextStyle, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DividerLine from "@/components/DividerLine";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { Feather } from "@expo/vector-icons";

const MAX_TEXT_INPUT_LENGTH = 15;

const OneWordTextInput = ({
  value,
  editable,
  autoFocus,
  textAlign = "center",
  onChangeText,
  onPressButton,
}: {
  value: string;
  editable?: boolean;
  autoFocus?: boolean;
  textAlign?: TextStyle["textAlign"];
  onChangeText: (value: string) => any;
  onPressButton?: () => any;
}) => {
  return (
    <View className="mt-8 h-24 w-full items-center px-4">
      <View className="relative h-16 w-full flex-row items-center justify-start">
        <TouchableOpacity
          className="absolute right-0 top-3 z-20 pb-8"
          onPress={() => (onPressButton ? onPressButton() : null)}
        >
          <Feather name="check" size={38} color="black" />
        </TouchableOpacity>
        <TextInput
          className="z-10 h-full w-3/4 text-left text-2xl"
          value={value}
          style={{
            color: Colors.offBlack,
            borderColor: Colors.lightGray,
            textAlign: textAlign,
            textAlignVertical: "center",
          }}
          selectTextOnFocus={true}
          onChangeText={(value) => {
            onChangeText(value);
          }}
          editable={editable}
          multiline={false}
          maxLength={MAX_TEXT_INPUT_LENGTH}
          autoFocus={autoFocus}
          returnKeyType="done"
          onKeyPress={(evt) => {
            if (evt.nativeEvent.key == "Enter") {
              Keyboard.dismiss();
            }
          }}
          clearButtonMode="never"
          onBlur={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
      <View className="w-full">
        <DividerLine
          viewStyle={{
            left: 0,
            position: "absolute",
            justifyContent: "flex-start",
          }}
          width={SCREEN_WIDTH * 0.55}
          color={Colors.mainGray}
        />
      </View>
    </View>
  );
};

export default OneWordTextInput;
