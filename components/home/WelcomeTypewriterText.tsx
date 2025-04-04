import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Dimensions, View } from "react-native";
import {
  welcomeTexts_pt1,
  welcomeTexts_pt2,
} from "@/constants/models/home/welcomeTexts";
import { Colors } from "@/constants/styles/colorTheme";
import { UserType } from "@/db/models";
import { fetchUserData } from "@/db/user";
import DividerLine from "../DividerLine";
import TypewriterText from "../TypewriterText";

const getWelcomeText = (userName?: string): string => {
  const { t } = useTranslation("home");

  const textPt1Index = (Math.random() * (welcomeTexts_pt1.length - 1)) | 0;
  const textPt2Index = (Math.random() * (welcomeTexts_pt2.length - 1)) | 0;
  const textPt1String = t(
    `welcome_text.${welcomeTexts_pt1[textPt1Index].text}`,
  );
  const textPt2String = t(`welcome_text.${welcomeTexts_pt2[textPt2Index]}`);

  const insertUsername: boolean = welcomeTexts_pt1[textPt1Index].followedByName;
  let welcomeText: string;

  if (userName && insertUsername) {
    welcomeText = textPt1String + ", " + userName + "! " + textPt2String;
  } else {
    welcomeText = textPt1String + "! " + textPt2String;
  }

  return welcomeText;
};

const WelcomeTypewriterText = ({ isActive }: { isActive: boolean }) => {
  const { t } = useTranslation("common");

  const SCREEN_WIDTH = Dimensions.get("window").width;

  const [userData, setUserData] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      fetchUserData().then((res) => {
        let fetchedData = res as UserType;
        setUserData(fetchedData);
      });
    } catch (err) {
      console.error(err);
      Alert.alert(t("alerts.error_db_fetching"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const userName = userData && userData.name.length > 0 ? userData.name : "";

  return (
    <View className="my-4">
      <View
        className="mx-4 mb-8 mt-2 justify-center"
        style={{ borderColor: "#DDDDDD" }}
      >
        <TypewriterText
          text={getWelcomeText(userName && userName)}
          isActive={isActive}
          speed="fast"
          fontFamily="KodchasanMedium"
          textColor={Colors.darkGray}
          letterSpacing={2}
          lineHeight={1.5}
          hideCursorOnFinish={true}
        />
      </View>
      <DividerLine width={SCREEN_WIDTH / 1.5} weight={0.5} />
    </View>
  );
};

export default WelcomeTypewriterText;
