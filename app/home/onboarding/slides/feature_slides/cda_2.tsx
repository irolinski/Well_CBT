import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import TypewriterText from "@/components/global/TypewriterText";
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
  const { t } = useTranslation(["home", "common"]);

  return (
    <View className="items-center" key={slideKey}>
      <Text className="mt-4 text-3xl" style={{ color: Colors.offWhite }}>
        {t("onboarding.feature_slides.cda_2")}
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
          text={t("onboarding.feature_slides.cda_example_thought")}
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
