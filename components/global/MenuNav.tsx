import { View, Dimensions } from "react-native";
import BackButton from "../BackButton";
import ToolHeader from "../tools/ToolHeader";

type menuNavTypes = {
  name: string;
  handleBackButtonPress?: () => void;
};

const MenuNav = ({ name, handleBackButtonPress }: menuNavTypes) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      className={`z-10 box-border w-full border-b ${windowHeight > 750 ? "pb-4 pt-16" : "top-12"}`}
      style={{
        borderColor: "#D9D9D9",
        backgroundColor: "#8DBED8",
      }}
    >
      <View className="z-10 w-full flex-row items-center justify-between">
        <View className="left-6">
          <BackButton
            color="#FBFBFB"
            handleBackButtonPress={() => {
              handleBackButtonPress && handleBackButtonPress();
            }}
          />
        </View>
        <View className="mx-6 flex-row justify-end">
          <ToolHeader noIndent style={{ color: "#FBFBFB" }}>
            {name}
          </ToolHeader>
        </View>
      </View>
    </View>
  );
};
export default MenuNav;
