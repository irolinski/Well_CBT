import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";

const TIME_TO_FADE_OUT_MS = 2000;

const Onboarding_PaymentSlide = ({
  slideKey,
  onboardingSlideNum,
  onFinish,
}: {
  slideKey: string;
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const { t } = useTranslation("home");

  const [fadeOutSlide, setFadeOutSlide] = useState(false);

  useEffect(() => {
    if (onboardingSlideNum === Number(slideKey) - 1) {
      setTimeout(() => setFadeOutSlide(true), TIME_TO_FADE_OUT_MS);
    }
  }, [onboardingSlideNum]);

  return (
    <FadeInView
      className="relative z-10 h-full w-full items-center"
      key={slideKey}
      inputVal={1}
      outputVal={0}
      isActive={fadeOutSlide}
      onFinish={() => {
        onFinish();
      }}
    >
      <View className="mx-8 h-3/4 w-full items-center justify-center">
        <Text
          className="mx-8 text-center text-3xl"
          style={{ color: Colors.offWhite }}
        >
          {t("onboarding.loading_success_text")}
        </Text>
      </View>
    </FadeInView>
  );
};

export default Onboarding_PaymentSlide;
