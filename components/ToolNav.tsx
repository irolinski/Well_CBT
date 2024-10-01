import { View } from "react-native";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";
import Text from "./global/Text";
const ToolNav = ({
  currentPage,
  numOfAllPages,
}: {
  currentPage: number;
  numOfAllPages: number;
}) => {
  return (
    <View className="relative top-16 w-full flex-row justify-center z-10">
      <View className="absolute left-6">
        <BackButton />
      </View>
      <View className="">
        <ProgressBar currentPage={currentPage} numOfAllPages={numOfAllPages} />
      </View>
      <View className="absolute right-6">
        <Text className="text-xs">
          Step {currentPage}{" "}
          <Text style={{ color: "#525252" }}>of {numOfAllPages}</Text>
        </Text>
      </View>
    </View>
  );
};
export default ToolNav;
