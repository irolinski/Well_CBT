import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { Typewriter } from "typewriter4react-native";

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
        <Typewriter
          reserveSpace
          textStyle={{fontSize: 20, color: `${Colors.darkGray}`, lineHeight: 30, letterSpacing: 1.5}}
          cursorStyle={{color: `${Colors.mainGray}`}}
          text={t("onboarding.feature_slides.cda_example_thought")}
          isActive={slideNum === Number(slideKey) - 1}
          onFinish={() => onFinish()}
        />
      </View>
    </View>
  );
};

export default Onboarding_Feat_CDA_2;
