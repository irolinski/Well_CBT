import { DimensionValue, View } from "react-native";
const DividerLine = ({
  width,
  weight,
}: {
  width: DimensionValue;
  weight?: number;
}) => {
  return (
    <View
      className="w-full flex-row items-center justify-center"
      style={{ height: 0.5 }}
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
