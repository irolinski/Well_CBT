import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Dimensions, Pressable, View } from 'react-native';
import quoteImages from '@/assets/images/home/quote_widget/images';
import quotesListLocales from '@/assets/text/quotes.json';
import { Colors } from '@/constants/styles/colorTheme';
import { achievementHandlersObj } from '@/db/achievements/controllers';
import { AvailableLanguage } from '@/hooks/i18n';
import handleShare from '@/utils/handleShare';
import { Feather } from '@expo/vector-icons';
import Text from '../global/Text';

const SCREEN_WIDTH = Dimensions.get("window").width;

const QuoteWidget = () => {
  const { t, i18n } = useTranslation("home");

  const selectedLanguage: AvailableLanguage =
    i18n.language as AvailableLanguage;

  const quotesList = quotesListLocales[selectedLanguage];

  const quoteNumber = (Math.random() * (quotesList.length - 1)) | 0;
  const imageNumber = (Math.random() * (quoteImages.length - 1)) | 0;

  const handleOnPress = () => {
    achievementHandlersObj[12]();

    handleShare(
      `"${quotesList[quoteNumber].quoteText}" \n \n - ${quotesList[quoteNumber].quoteAuthor}`,
    );
  };

  return (
    <View
      className="w-full flex-1 rounded-xl border"
      style={{ height: 240, borderColor: Colors.lightGray }}
    >
      <Image
        source={quoteImages[imageNumber]}
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
            {quotesList[quoteNumber].quoteText}
          </Text>
        </View>
        <View className="ml-4 mr-8 mt-4">
          <Text
            className="text-sm"
            style={{ color: "white", fontStyle: "italic" }}
          >
            {`- ${quotesList[quoteNumber].quoteAuthor}`}
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
