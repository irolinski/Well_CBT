import { View, ImageBackground } from "react-native";
// import { WellLogo, WellLogoDark } from "@/constants/models/images";

export const LogoDark = ({ sizePx }: { sizePx: number }) => {
  return (
    <View style={{ width: sizePx, height: sizePx }}>
      <ImageBackground
        source={require("@/assets/images/well-logo-dark.png")}
        resizeMode="contain"
        className="ounded-lg flex-1 justify-center"
      ></ImageBackground>
    </View>
  );
};
export const Logo = ({ sizePx }: { sizePx: number }) => {
  return (
    <View style={{ width: sizePx, height: sizePx }}>
      <ImageBackground
        source={require("@/assets/images/well-logo.png")}
        resizeMode="contain"
        className="ounded-lg flex-1 justify-center"
      ></ImageBackground>
    </View>
  );
};
