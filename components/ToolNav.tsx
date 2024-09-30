import { View, Text } from "react-native";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";
const ToolNav = ({
  currentPage,
  numOfAllPages,
}: {
  currentPage: number;
  numOfAllPages: number;
}) => {
  return (
    <View className="relative top-12 w-full flex-row justify-center">
      <View className="absolute left-6">
        <BackButton />
      </View>
      <View className="">
        <ProgressBar currentPage={currentPage} numOfAllPages={numOfAllPages} />
      </View>
      <View className="absolute right-6 text-xxs">
        <Text>
          Step {currentPage}{" "}
          <Text style={{ color: "#525252" }}>of {numOfAllPages}</Text>
        </Text>
      </View>
    </View>
  );
};
export default ToolNav;
