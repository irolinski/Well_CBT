import { View } from "react-native";
import Text from "../global/Text";

const CDATextBox = ({ textContent }: { textContent: string }) => {
  return (
    <View
      className="mt-4 h-28 justify-center rounded-lg border bg-gray-200"
      style={{ borderColor: "#4391BC" }}
    >
      <Text className="p-4 text-center text-sm">{textContent}</Text>
    </View>
  );
};
export default CDATextBox;
