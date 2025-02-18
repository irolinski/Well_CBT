import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import BackButton from "@/components/BackButton";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { availableLanguagesArr } from "@/hooks/i18n";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const SETTING_NAME = "language";

const LanguageSettingsPage = () => {
  const { t, i18n } = useTranslation(["about", "common"]);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const currentLanguage = i18n.language;

  return (
    <ScrollView scrollEnabled={false}>
      <View
        className={`z-10 w-full border-b`}
        style={{
          borderColor: Colors.lightGray,
          backgroundColor: Colors.mainBlue,
          paddingTop: SCREEN_HEIGHT * 0.065,
          paddingBottom: 16,
        }}
      >
        <View className="z-10 w-full flex-row items-center justify-between px-6">
          <View>
            <BackButton color={Colors.offWhite} />
          </View>
          <View className="flex-row justify-end">
            <Text
              className={`text-left text-2xl`}
              style={{
                fontFamily: "KodchasanMedium",
                color: Colors.whiteSmoke,
              }}
            >
              {t(`settings.${SETTING_NAME}.title`)}
            </Text>
          </View>
        </View>
      </View>
      <View className="m-4">
        <View className="mt-10">
          <Text className="text-xl">
            {t(`settings.${SETTING_NAME}.select_language`)}
          </Text>
          <View className="mb-10">
            <Picker
              style={{
                padding: 0,
                margin: 0,
                // transform: [{ translateY }],
              }}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
              {availableLanguagesArr.map(
                (langName: string, indexNum: number) => (
                  <Picker.Item
                    key={indexNum}
                    label={t(`languages.${langName}`, { ns: "common" })}
                    value={langName}
                  />
                ),
              )}
            </Picker>
            <DividerLine width={SCREEN_WIDTH * 0.75} />
          </View>

          <View className="mt-12">
            <AdvanceButton
              title={t("buttons.save_changes", { ns: "common" })}
              onPress={() => {
                i18n.changeLanguage(selectedLanguage);
              }}
              disabled={selectedLanguage === currentLanguage}
              icon={<Feather name="save" size={24} color={Colors.white} />}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LanguageSettingsPage;
