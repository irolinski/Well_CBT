import { ColorValue, Pressable, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

type RadioButtonTypes = {
  isActive: boolean;
  checkedColor?: ColorValue;
  borderColor?: ColorValue;
  onPress?: () => void;
};
const RadioButton = ({
  isActive,
  checkedColor,
  borderColor,
  onPress,
}: RadioButtonTypes) => {
  return !onPress ? (
    <View
      className="mx-2 h-5 w-5 items-center justify-center rounded-full border"
      style={{ borderColor: borderColor ?? Colors.blackPearl }}
    >
      {isActive && (
        <View
          className="h-3 w-3 rounded-xl"
          style={{ backgroundColor: checkedColor ?? Colors.darkBlue }}
        ></View>
      )}
    </View>
  ) : (
    <Pressable
      className="mx-2 h-5 w-5 items-center justify-center rounded-full border"
      style={{ borderColor: borderColor ?? Colors.blackPearl }}
      onPress={() => {
        onPress && onPress();
      }}
    >
      {isActive && (
        <View
          className="h-3 w-3 rounded-xl"
          style={{ backgroundColor: checkedColor ?? Colors.darkBlue }}
        ></View>
      )}
    </Pressable>
  );
};
export default RadioButton;
