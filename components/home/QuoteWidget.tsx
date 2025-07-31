import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, View } from "react-native";
import quoteImages from "@/assets/images/home/quote_widget/index";
import quotesListLocales from "@/assets/text/quotes.json";
import { QuoteWidgetData } from "@/constants/models/home";
import { Colors } from "@/constants/styles/colorTheme";
import { achievementHandlersObj } from "@/db/achievements/controllers";
import {
  handleGetQuoteWidgetData,
  handleUpdateQuoteWidgetData,
} from "@/db/home";
import { handleGetUserData, isUserType, UserType } from "@/db/user";
import { AvailableLanguage, selectedLanguage } from "@/hooks/i18n";
import { analyticsLogShareQuoteEvent } from "@/services/firebase/firebase";
import { isSameDate } from "@/utils/dates";
import handleShare from "@/utils/handleShare";
import { Feather } from "@expo/vector-icons";
import Text from "../global/Text";

const SCREEN_WIDTH = Dimensions.get("window").width;

const QuoteWidget = () => {
  const { t } = useTranslation("home");
  const quotesList = quotesListLocales[selectedLanguage as AvailableLanguage];

  const [quoteWidgetData, setQuoteWidgetData] = useState<QuoteWidgetData>({
    quoteIndex: 1,
    imageIndex: 1,
  });

  const useQuoteWidget = async (): Promise<void> => {
    try {
      const res: UserType | undefined = await handleGetUserData();
      let user: UserType;

      if (isUserType(res)) {
        user = res;
        let lastVisit = new Date();
        if (user.lastVisit) {
          lastVisit = new Date(user.lastVisit);
        }

        const dayAfterLastVisit: Date = new Date(lastVisit);
        dayAfterLastVisit.setDate(lastVisit.getDate() + 1);

        const currentTime = new Date();

        if (!isSameDate(lastVisit, currentTime)) {
          const randomNum_1 = (Math.random() * (quotesList.length - 1)) | 0;
          const randomNum_2 = (Math.random() * (quotesList.length - 1)) | 0;
          setQuoteWidgetData({
            quoteIndex: randomNum_1,
            imageIndex: randomNum_2,
          });
          await handleUpdateQuoteWidgetData(randomNum_1, randomNum_2);
        } else {
          const res: undefined | QuoteWidgetData =
            (await handleGetQuoteWidgetData()) as QuoteWidgetData;
          if (res && res.quoteIndex && res.imageIndex) {
            setQuoteWidgetData({
              quoteIndex: res.quoteIndex,
              imageIndex: res.imageIndex,
            });
          }
        }
      } else {
        throw Error;
      }
    } catch (err) {
      console.error(
        "Error: Could not create and/or modify user table while checking for date streak. " +
          err,
      );
    }
  };

  useEffect(() => {
    useQuoteWidget();
  }, []);

  const handleOnPress = () => {
    achievementHandlersObj[12]();
    analyticsLogShareQuoteEvent();
    handleShare(
      `"${quotesList[quoteWidgetData.quoteIndex].quoteText}" \n \n - ${quotesList[quoteWidgetData.quoteIndex].quoteAuthor}`,
    );
  };

  return (
    <View
      className="my-4 w-full flex-1 rounded-xl border"
      style={{ height: 240, borderColor: Colors.lightGray }}
    >
      <Image
        source={quoteImages[quoteWidgetData.imageIndex]}
        className="z-0 rounded-xl"
        contentFit="cover"
        style={{ width: "100%", height: "100%" }}
        transition={200}
      />
      <LinearGradient
        className="rounded-lg"
        colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 0.75)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.1, y: 1 }}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      ></LinearGradient>
      <View
        className="absolute z-20 mb-4 mt-8 justify-around"
        style={{ height: "65%" }}
      >
        <View className="mx-4 flex-row justify-start">
          <Text className="text-xl" style={{ color: "white" }}>
            {t("index.quote_of_the_day")}
          </Text>
        </View>
        <View
          style={{
            marginTop: 16,
            marginBottom: 0,
            marginLeft: 20,
            marginRight: SCREEN_WIDTH / 6,
          }}
        >
          <Text
            className="text-sm"
            style={{ color: "white", fontStyle: "italic" }}
          >
            {quotesList[quoteWidgetData.quoteIndex].quoteText}
          </Text>
        </View>
        <View className="ml-4 mr-8 mt-4">
          <Text
            className="text-sm"
            style={{ color: "white", fontStyle: "italic" }}
          >
            {`- ${quotesList[quoteWidgetData.quoteIndex].quoteAuthor}`}
          </Text>
        </View>
      </View>
      <View className="absolute bottom-8 right-0 mx-10 flex-row justify-end">
        <Pressable
          onPress={() => {
            handleOnPress();
          }}
        >
          <Feather name="share" size={24} color="(rgba(255, 255, 255, 0.75)" />
        </Pressable>
      </View>
    </View>
  );
};
export default QuoteWidget;
