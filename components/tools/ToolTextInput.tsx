import { useState } from 'react';
import { Keyboard, TextInput, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';
import { isValidExerciseInput } from '@/utils/inputValidations';
import Text from '../global/Text';

const MAX_INPUT_LENGTH = 350;
const MAX_INPUT_LENGTH_LARGE = 500;
const NUM_OF_LINES = 30;

const ToolTextInput = ({
  value,
  handleChangeText,
  keyboardMargin,
  length="normal"
}: {
  value: string;
  handleChangeText: (evt: string) => void;
  keyboardMargin: boolean;
  length?: "normal" | "large";
}) => {
  const [spaceForKeyboard, setSpaceForKeyboard] = useState<boolean>(false);
  return (
    <View style={{ marginBottom: spaceForKeyboard ? SCREEN_HEIGHT / 5 : 8 }}>
      <TextInput
        className={`my-2 rounded-md border p-4`}
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
        maxLength={length === "normal" ? MAX_INPUT_LENGTH : MAX_INPUT_LENGTH_LARGE}
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
        {value.length}/{length === "normal" ? MAX_INPUT_LENGTH : MAX_INPUT_LENGTH_LARGE}
      </Text>
    </View>
  );
};

export default ToolTextInput;
