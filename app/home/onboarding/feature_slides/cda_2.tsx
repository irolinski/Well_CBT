import React from "react";
import { Text, View } from "react-native";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";

const Onboarding_Feat_CDA_2 = ({
  slideKey,
  slideNum,
  onFinish,
}: {
  slideKey: string;
  slideNum: number | null;
  onFinish: () => void;
}) => {
  return (
    <View className="items-center" key={slideKey}>
      <Text className="mt-4 text-3xl" style={{ color: Colors.offWhite }}>
        ...into more rational ones
      </Text>
      <View
        className="mt-12 h-32 rounded-lg px-4 py-3"
        style={{
          width: SCREEN_WIDTH * 0.9,
          height: 141,
          backgroundColor: Colors.offWhite,
        }}
      >
        <TypewriterText
          text={"I'm judging myself too harshly...\nEverybody makes mistakes!"}
          isActive={slideNum === Number(slideKey) - 1}
          size={20}
          textColor={Colors.darkGray}
          cursorColor={Colors.mainGray}
          onFinish={() => onFinish()}
        />
      </View>
    </View>
  );
};

export default Onboarding_Feat_CDA_2;
