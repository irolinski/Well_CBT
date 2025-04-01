import { useEffect, useState } from "react";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";

const THIS_SLIDE_KEY = "6";
const DISPLAY_TEXT_TIME_MS = 2000;

const Onboarding_Feat_Last = ({
  slideNum,
  onFinish,
}: {
  slideNum: number | null;
  onFinish: () => void;
}) => {
  const [fadeInText, setFadeInText] = useState(false);

  useEffect(() => {
    if (slideNum === Number(THIS_SLIDE_KEY) - 1) {
      setFadeInText(true);
    }
  }, [slideNum]);

  return (
    <FadeInView
      className="h-1/2 items-center justify-center"
      key={THIS_SLIDE_KEY}
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
        ...and much more!
      </Text>
    </FadeInView>
  );
};

export default Onboarding_Feat_Last;
