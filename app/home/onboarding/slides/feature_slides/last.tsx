import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";

const DISPLAY_TEXT_TIME_MS = 2000;

const Onboarding_Feat_Last = ({
  slideKey,
  slideNum,
  onFinish,
}: {
  slideKey: string;
  slideNum: number | null;
  onFinish: () => void;
}) => {
  const { t } = useTranslation(["home", "common"]);

  const [fadeInText, setFadeInText] = useState(false);

  useEffect(() => {
    if (slideNum === Number(slideKey) - 1) {
      setFadeInText(true);
    }
  }, [slideNum]);

  return (
    <FadeInView
      className="h-1/2 items-center justify-center"
      key={slideKey}
      inputVal={0}
      outputVal={1}
      isActive={fadeInText}
      onFinish={() => {
        setTimeout(() => {
          onFinish();
        }, DISPLAY_TEXT_TIME_MS);
      }}
    >
      <Text className="mt-4 text-3xl" style={{ color: Colors.offWhite }}>
        {t("onboarding.feature_slides.and_much_more")}
      </Text>
    </FadeInView>
  );
};

export default Onboarding_Feat_Last;
