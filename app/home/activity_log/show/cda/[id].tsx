import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { logoImages } from '@/assets/images/global/logo/logo';
import DistortionPill from '@/components/DistortionPill';
import ErrorScreen from '@/components/ErrorScreen';
import Text from '@/components/global/Text';
import ActivityShowNav from '@/components/home/ActivityShowNav';
import CDATextBox from '@/components/tools/cda/CDATextBox';
import ToolHeader from '@/components/tools/ToolHeader';
import { cdaEntryType } from '@/constants/models/tools/cda';
import { cda_tool } from '@/constants/models/tools/tools';
import { Colors } from '@/constants/styles/colorTheme';
import { fetchCDAEntry } from '@/db/activity_log';
import { deleteCDAEntry } from '@/db/tools';
import { convertIsoToEuropeanDate, formatDateStringForWrapping } from '@/utils/dates';
import { handleDeleteEntry } from '@/utils/deleteEntry';

const TOOL_NAME = cda_tool.name;

const ActivityShowPage = () => {
  const { t, i18n } = useTranslation(["tools", "common"]);
  const currentLanguage = i18n.language;

  const windowHeight = Dimensions.get("window").height;

  const id: number = Number(useLocalSearchParams<{ id: string }>().id);
  const [fetchedEntry, setFetchedEntry] = useState<cdaEntryType | undefined>(
    undefined,
  );

  useEffect(() => {
    if (id) {
      fetchCDAEntry(id).then((res) => {
        let fetchedArr = res as cdaEntryType[];
        setFetchedEntry(fetchedArr[0]);
      });
    }
  }, []);

  if (fetchedEntry) {
    let date;
    if (fetchedEntry.datetime) {
      date = fetchedEntry.datetime.split(" ")[0];
      if (currentLanguage === "pl") {
        date = convertIsoToEuropeanDate(date);
      }
      date = formatDateStringForWrapping(date);
    }

    return (
      <ScrollView>
        <ActivityShowNav
          handlePressDelete={() => handleDeleteEntry(deleteCDAEntry, id)}
        />
        <View className={`mx-6 my-10 flex-1 justify-center`}>
          <View className="mb-12 pb-10" style={{ height: windowHeight * 0.8 }}>
            <View className="wrap mb-8 w-full flex-row justify-between overflow-hidden">
              <ToolHeader> {t(`tools.${TOOL_NAME}.title`)}</ToolHeader>

              <Text
                className="wrap mt-0.5 overflow-hidden text-lg"
                style={{
                  fontFamily: "KodchasanMedium",
                  color: Colors.mainGray,
                  flexShrink: 1,
                }}
              >
                {date}
              </Text>
            </View>
            <View className="mx-4 my-8">
              <View className="mb-4">
                <Text>
                  {" "}
                  {t(`tools.${TOOL_NAME}.exercise.summary.situation`)}
                </Text>
                <View
                  className="mb-4 border-b px-2 py-7"
                  style={{ borderColor: Colors.lightGray }}
                >
                  <Text className="mx-4 text-start">
                    {fetchedEntry.situation}
                  </Text>
                </View>
              </View>
              <View className="mb-4">
                <Text>
                  {t(`tools.${TOOL_NAME}.exercise.summary.distorted_thought`)}
                </Text>
                <CDATextBox textContent={fetchedEntry.oldThought} />
              </View>
              <View
                className="mb-4 border-b border-t px-2 py-7"
                style={{ borderColor: Colors.lightGray }}
              >
                <Text>
                  {t(
                    `tools.${TOOL_NAME}.exercise.summary.cognitive_distortion`,
                  )}
                </Text>
                <View className="mx-auto mt-4 w-3/4 px-4">
                  <DistortionPill
                    title={t(
                      `tools.${TOOL_NAME}.distortion_list.${fetchedEntry.distortion}.name`,
                    )}
                    checked={true}
                    highlighted={false}
                  />
                </View>
              </View>
              <View className="mt-4">
                <Text>
                  {" "}
                  {t(`tools.${TOOL_NAME}.exercise.summary.rational_thought`)}
                </Text>
                <CDATextBox textContent={fetchedEntry.newThought} />
              </View>
              <View className="w-full flex-row justify-center">
                <Image
                  className="h-4 w-1/2 translate-y-16"
                  source={logoImages.logo_braid_divider}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <ErrorScreen />;
  }
};
export default ActivityShowPage;
