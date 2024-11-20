import { DimensionValue, View } from "react-native";

interface DividerLineProps {
  width: DimensionValue;
  weight?: number;
  className?: string;
  viewStyle?: any;
}
const DividerLine = ({
  width,
  weight,
  className,
  viewStyle,
}: DividerLineProps) => {
  return (
    <View
      className="w-full flex-row items-center justify-center"
      style={[viewStyle, { height: 0.5 }]}
    >
      <View
        style={{
          borderWidth: weight ?? 1,
          borderColor: "#DDDDDD",
          width: width,
          height: 1,
        }}
      ></View>
    </View>
  );
};
export default DividerLine;
