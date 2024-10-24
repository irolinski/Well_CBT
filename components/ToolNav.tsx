import { View } from "react-native";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";
import Text from "./global/Text";
const ToolNav = ({
  currentPage,
  numOfAllPages,
  handleBackButtonPress,
  hideBackButton,
}: {
  currentPage: number;
  numOfAllPages: number;
  handleBackButtonPress?: () => void;
  hideBackButton?: Boolean;
}) => {
  return (
    <View className="relative top-16 z-10 w-full flex-row justify-center">
      <View className="absolute left-6">
        {!hideBackButton && (
          <BackButton
            handleBackButtonPress={() =>
              handleBackButtonPress && handleBackButtonPress()
            }
          />
        )}
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
