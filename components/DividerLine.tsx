import { ColorValue, DimensionValue, View, ViewStyle } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

interface DividerLineProps {
  width: DimensionValue;
  weight?: number;
  className?: string;
  viewStyle?: ViewStyle;
  color?: ColorValue;
}
const DividerLine = ({
  width,
  weight,
  className,
  viewStyle,
  color,
}: DividerLineProps) => {
  return (
    <View
      className="w-full flex-row items-center justify-center"
      style={[viewStyle, { height: 0.5 }]}
    >
      <View
        style={{
          borderWidth: weight ?? 1,
          borderColor: color ?? Colors.lightGrayAlt,
          width: width,
          height: 1,
        }}
      ></View>
    </View>
  );
};
export default DividerLine;
