import { ColorValue, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/styles/colorTheme";
import ToolHeader from "../tools/ToolHeader";
import BackButton from "./BackButton";

type menuNavTypes = {
  name: string;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  handleBackButtonPress?: () => void;
};

const MenuNav = ({
  name,
  color,
  backgroundColor,
  handleBackButtonPress,
}: menuNavTypes) => {
  const insets = useSafeAreaInsets();
  const TOP_FRAME_HEIGHT = 50 + insets.top;

  return (
    <SafeAreaView
      className="z-10 w-full justify-center"
      style={{
        height: TOP_FRAME_HEIGHT,
        borderColor: Colors.lightGray,
        backgroundColor: backgroundColor ?? Colors.mainBlue,
      }}
    >
      <View className="z-10 w-full flex-row items-center justify-between">
        <View className="mx-6">
          <BackButton
            color={color ?? Colors.offWhite}
            handleBackButtonPress={() => {
              handleBackButtonPress && handleBackButtonPress();
            }}
          />
        </View>
        <View className="mx-6 flex-row justify-end">
          <ToolHeader noIndent style={{ color: Colors.offWhite }}>
            {name}
          </ToolHeader>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MenuNav;
