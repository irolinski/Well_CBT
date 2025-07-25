import { ColorValue, Pressable, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { Feather } from "@expo/vector-icons";
import Text from "./Text";

const ChecklistElement = ({
  text,
  checked,
  onPress,
  textColor = Colors.blackPearl,
  checkColor = Colors.offWhite,
  checkboxBorderColor = Colors.mainGray,
  checkboxUncheckedBackgroundColor = "transparent",
  checkboxCheckedBackgroundColor = Colors.salmonOrange,
}: {
  text: string;
  checked: boolean;
  onPress: () => void;
  textColor?: ColorValue;
  checkColor?: ColorValue;
  checkboxBorderColor?: ColorValue;
  checkboxUncheckedBackgroundColor?: ColorValue;
  checkboxCheckedBackgroundColor?: ColorValue;
}) => {
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
    >
      <View className="flex flex-row px-1 pl-4">
        <View
          className="h-8 w-8 rounded-md border"
          style={{
            borderColor: checkboxBorderColor,
            backgroundColor: checked
              ? checkboxCheckedBackgroundColor
              : checkboxUncheckedBackgroundColor,
          }}
        >
          <View className="mx-auto items-center justify-center">
            {checked && <Feather name="check" size={28} color={checkColor} />}
          </View>
        </View>
        <View className="items-center justify-center">
          <Text
            className="mx-8 my-1 text-start text-base"
            style={{ color: textColor }}
          >
            {text}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChecklistElement;
