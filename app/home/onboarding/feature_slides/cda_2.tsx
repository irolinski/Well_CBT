import React from "react";
import { Text, View } from "react-native";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";

const THIS_SLIDE_KEY = "4";

const Onboarding_Feat_CDA_2 = ({
  slideNum,
  onFinish,
}: {
  slideNum: number | null;
  onFinish: () => void;
}) => {
  return (
    <View className="items-center" key={THIS_SLIDE_KEY}>
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
          isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
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
