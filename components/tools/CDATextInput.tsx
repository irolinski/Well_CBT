import { View, TextInput, Keyboard, Dimensions } from "react-native";
import Text from "../global/Text";
import { useState } from "react";
export default function CDATextInput({
  value,
  handleChangeText,
  keyboardMargin,
}: {
  value: string;
  handleChangeText: (evt: string) => void;
  keyboardMargin: boolean;
}) {
  const windowHeight = Dimensions.get("window").height;
  const [spaceForKeyboard, setSpaceForKeyboard] = useState<boolean>(false);

  return (
    <View style={{ marginBottom: spaceForKeyboard ? windowHeight / 5 : 8 }}>
      <TextInput
        className="text-md my-2 h-28 rounded-md border p-4"
        style={{
          borderColor: "#d9d9d9",
          backgroundColor: "#FBFBFB",
          textAlignVertical: "top",
        }}
        value={value}
        onChangeText={(evt) => handleChangeText(evt)}
        editable
        multiline={true}
        numberOfLines={4}
        maxLength={150}
        returnKeyType="done"
        onKeyPress={(evt) =>
          evt.nativeEvent.key == "Enter" && Keyboard.dismiss()
        }
        clearButtonMode="while-editing"
        onFocus={() => {
          if (keyboardMargin) {
            setSpaceForKeyboard(true);
          }
        }}
        onBlur={() => {
          if (keyboardMargin) {
            setSpaceForKeyboard(false);
          }
        }}
      ></TextInput>
      <Text className="text-right">{value.length}/150</Text>
    </View>
  );
}
