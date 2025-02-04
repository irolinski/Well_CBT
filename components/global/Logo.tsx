import { ImageBackground, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo/logo";

export const LogoDark = ({ sizePx }: { sizePx: number }) => {
  return (
    <View style={{ width: sizePx, height: sizePx }}>
      <ImageBackground
        source={logoImages.logo_dark}
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
        source={logoImages.logo_standard}
        resizeMode="contain"
        className="flex-1 justify-center"
      ></ImageBackground>
    </View>
  );
};
