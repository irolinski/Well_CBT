import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import BackButton from '@/components/BackButton';
import Text from '@/components/global/Text';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';

const SETTING_NAME = "language";
const LanguageSettingsPage = () => {
  const { t, i18n } = useTranslation();
  const languageList = i18n.languages;
  return (
    <ScrollView>
      {/* Nav */}
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
              {SETTING_NAME}
            </Text>
          </View>
        </View>
      </View>
      {/* /Nav */}

      <View className="m-4">
        <View className="mt-4">
          <Text className="mb-2 text-xl">Select Language:</Text>
          <View className="h-32 w-full border">
            {languageList.map((langName: string, indexNum: number) => (
              <Text key={indexNum}>{langName}</Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LanguageSettingsPage;
