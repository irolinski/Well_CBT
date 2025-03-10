import React, { useState } from 'react';
import { ColorValue, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const MAX_NAME_LENGTH = 18;
const adjectiveColors = [
  Colors.offBlack,
  "#FF997C",
  "#008A63",
  "#E57353",
  "#F5BB00",
  "#90D005",
  "#B479FF",
  "#4391BC",
];

const EnvironmentAdjectiveListElement = ({
  value,
  color,
  isAvailable = false,
  isCurrentlyEdited = false,
  onChangeText,
  onConfirm,
  onPressAdd,
  onPressColor,
  indexNum,
}: {
  value: string;
  color: ColorValue;
  isAvailable: boolean;
  isCurrentlyEdited: boolean;
  onChangeText: (value: string) => void;
  onConfirm: () => void;
  onPressAdd: () => void;
  onPressColor: (colorValue: ColorValue) => void;
  indexNum: number;
}) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  return (
    <View className="flex-row">
      <View className="w-4/5 justify-center">
        <TextInput
          className="mb-12 mr-8 justify-center pb-1 text-lg font-semibold"
          editable={isCurrentlyEdited}
          style={{
            borderColor: Colors.mainGray,
            color: color,
            borderBottomWidth: 1,
          }}
          value={value}
          onChangeText={(val) => onChangeText(val)}
          placeholder={
            !value && !isCurrentlyEdited
              ? "Add a new adjective"
              : !value && isCurrentlyEdited
                ? "Tap here to type"
                : ""
          }
          multiline={false}
          maxLength={MAX_NAME_LENGTH}
          autoFocus={isCurrentlyEdited}
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
          autoCorrect={false} //important! enabling autocorrect bugs out the whole component for some reason
          autoCapitalize="sentences"
        />
      </View>
      <View className="h-10 w-1/5 items-center justify-center">
        {value && isCurrentlyEdited ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: Colors.mainBlue,
            }}
            onPress={() => {
              onConfirm();
            }}
          >
            <Feather name="check" size={22} color={Colors.white} />
          </TouchableOpacity>
        ) : null}
        {value && !isCurrentlyEdited ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{
              backgroundColor: "#FF997C",
            }}
            onPress={() => {
              onPressColor(adjectiveColors[currentColorIndex + 1]);
              if (currentColorIndex < adjectiveColors.length - 1) {
                setCurrentColorIndex((prev) => prev + 1);
              } else {
                setCurrentColorIndex(0);
              }
            }}
          >
            <MaterialIcons name="palette" size={22} color={Colors.white} />
          </TouchableOpacity>
        ) : null}
        {!value && !isCurrentlyEdited ? (
          <TouchableOpacity
            className="h-10 w-10 items-center justify-center rounded-full"
            disabled={!isAvailable}
            style={{
              backgroundColor: Colors.mainBlue,
            }}
            onPress={() => {
              onPressAdd();
            }}
          >
            <Text
              className="h-full w-full rounded-full text-center text-3xl"
              style={{ color: Colors.white }}
            >
              +
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default EnvironmentAdjectiveListElement;
