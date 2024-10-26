import { View } from "react-native";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";
import Text from "./global/Text";
import { Dimensions } from "react-native";

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
  const windowHeight = Dimensions.get("window").height;

  return (
    <View className="z-10">
      <View
        className={`absolute z-10 box-border w-full border-b pb-7 ${windowHeight > 750 ? "top-20" : "top-12"}`}
        style={{
          borderColor: "#D9D9D9",
        }}
      >
        <View className="z-10 w-full flex-row items-center justify-center">
          <View className="absolute left-6">
            {!hideBackButton && (
              <BackButton
                handleBackButtonPress={() =>
                  handleBackButtonPress && handleBackButtonPress()
                }
              />
            )}
          </View>
          <View>
            <ProgressBar
              currentPage={currentPage}
              numOfAllPages={numOfAllPages}
            />
          </View>
          <View className="absolute right-6">
            <Text className="text-xs">
              Step {currentPage}{" "}
              <Text style={{ color: "#525252" }}>of {numOfAllPages}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ToolNav;
