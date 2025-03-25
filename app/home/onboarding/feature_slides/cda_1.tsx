import React from "react";
import { Text, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

const Onboarding_Feat_CDA_1 = ({ slideNum }: { slideNum: number | null }) => {
  return (
    <View className="items-center" key="3">
      <Text className="text-3xl" style={{ color: Colors.offWhite }}>
        Turn your negative thoughts...
      </Text>
    </View>
  );
};

export default Onboarding_Feat_CDA_1;
