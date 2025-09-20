import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { UserType } from "@/constants/models/global/models";
import {
  welcomeTexts_pt1,
  welcomeTexts_pt2,
} from "@/constants/models/home/welcomeTexts";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { fetchUserData } from "@/db/user";
import DividerLine from "../global/DividerLine";
import { Typewriter } from "typewriter4react-native";


const WelcomeTypewriterText = ({ isActive }: { isActive: boolean }) => {
  const { t } = useTranslation(["common", "home"]);

  const [userName, setUserName] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");

  const getWelcomeText = (userName?: string): string => {
    const textPt1Index = (Math.random() * (welcomeTexts_pt1.length - 1)) | 0;
    const textPt2Index = (Math.random() * (welcomeTexts_pt2.length - 1)) | 0;
    const textPt1String = t(
      `welcome_text.${welcomeTexts_pt1[textPt1Index].text}`,
      { ns: "home" },
    );
    const textPt2String = t(`welcome_text.${welcomeTexts_pt2[textPt2Index]}`, {
      ns: "home",
    });

    const insertUsername: boolean =
      welcomeTexts_pt1[textPt1Index].followedByName;
    let welcomeText: string;

    if (userName && insertUsername) {
      welcomeText = textPt1String + ", " + userName + "! " + textPt2String;
    } else {
      welcomeText = textPt1String + "! " + textPt2String;
    }
    return welcomeText;
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchUserData().then((res) => {
        const fetchedData = res as UserType;
        const userName = fetchedData.name;
        setWelcomeText(getWelcomeText(userName && userName));
      });
    } catch (err) {
      console.error(err);
      Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <View className="my-4">
      <View
        className="mx-4 mb-8 mt-2 justify-center"
        style={{ borderColor: Colors.lightGrayAlt }}
      >
        {welcomeText && (
          <Typewriter
            textStyle={{ minHeight: 40, fontFamily: "KodchasanMedium", color: `${Colors.darkGray}`, letterSpacing: 2, lineHeight: 1.5 }}
            text={welcomeText}
            isActive={isActive && !isLoading && welcomeText.length > 0}
            speed="fast"
            hideCursorOnFinish={true}
          />
        )}
      </View>
      <DividerLine width={SCREEN_WIDTH / 1.5} weight={0.5} />
    </View>
  );
};

export default WelcomeTypewriterText;
