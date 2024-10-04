import { View, ImageBackground } from "react-native";
import { WellLogo, WellLogoDark } from "@/constants/models/images";

export const LogoDark = ({ sizePx }: { sizePx: number }) => {
  return (
    <View style={{ width: sizePx, height: sizePx }}>
      <ImageBackground
        source={WellLogoDark}
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
        source={WellLogo}
        resizeMode="contain"
        className="ounded-lg flex-1 justify-center"
      ></ImageBackground>
    </View>
  );
};
