import { useState } from "react";
import { Dimensions, Keyboard, TextInput, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { isValidExerciseInput } from "@/utils/inputValidations";
import Text from "../global/Text";

const MAX_INPUT_LENGTH = 200;
const NUM_OF_LINES = 5;

const ToolTextInput = ({
  value,
  handleChangeText,
  keyboardMargin,
}: {
  value: string;
  handleChangeText: (evt: string) => void;
  keyboardMargin: boolean;
}) => {
  const windowHeight = Dimensions.get("window").height;
  const [spaceForKeyboard, setSpaceForKeyboard] = useState<boolean>(false);

  return (
    <View style={{ marginBottom: spaceForKeyboard ? windowHeight / 5 : 8 }}>
      <TextInput
        className="my-2 h-28 rounded-md border p-4"
        style={{
          borderColor: Colors.lightGray,
          backgroundColor: Colors.offWhite,
          textAlignVertical: "top",
        }}
        value={value}
        onChangeText={(value) => {
          if (isValidExerciseInput(value)) {
            handleChangeText(value);
          }
        }}
        editable
        multiline={true}
        numberOfLines={NUM_OF_LINES}
        maxLength={MAX_INPUT_LENGTH}
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
      <Text className="text-right">
        {value.length}/{MAX_INPUT_LENGTH}
      </Text>
    </View>
  );
};

export default ToolTextInput;
