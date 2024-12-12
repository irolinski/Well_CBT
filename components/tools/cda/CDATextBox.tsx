import { View } from "react-native";
import Text from "../../global/Text";

const CDATextBox = ({ textContent }: { textContent: string }) => {
  return (
    <View
      className="mt-4 h-28 rounded-lg border bg-gray-200"
      style={{ borderColor: "#4391BC" }}
    >
      <Text className="p-4 text-left text-sm">{textContent}</Text>
    </View>
  );
};
export default CDATextBox;
