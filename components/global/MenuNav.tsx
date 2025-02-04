import { ColorValue, Dimensions, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import BackButton from "../BackButton";
import ToolHeader from "../tools/ToolHeader";

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
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      className={`z-10 w-full ${windowHeight > 750 ? "pb-4 pt-16" : "pb-4 pt-8"}`} // border-b?
      style={{
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
    </View>
  );
};
export default MenuNav;
