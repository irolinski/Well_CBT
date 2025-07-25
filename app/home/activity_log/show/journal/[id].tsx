import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo";
import DistortionPill from "@/components/global/DistortionPill";
import ErrorScreen from "@/components/global/ErrorScreen";
import Text from "@/components/global/Text";
import ActivityShowNav from "@/components/home/ActivityShowNav";
import ShowPageHeaderDate from "@/components/home/ShowPageHeaderDate";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import {
  emotionObjType,
  JournalEntryMainType,
} from "@/constants/models/home/activity_log";
import { emotionList, moodValueTitles } from "@/constants/models/tools/journal";
import { journal_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { fetchJournalEntry } from "@/db/activity_log";
import { deleteMoodJournalEntry } from "@/db/tools";
import {
  convertIsoToEuropeanDate,
  formatDateStringForWrapping,
} from "@/utils/dates";
import { handleDeleteEntry } from "@/utils/deleteEntry";
import { Slider } from "@miblanchard/react-native-slider";

const TOOL_NAME = journal_tool.name;

const ActivityShowPage = () => {
  const { t, i18n } = useTranslation(["tools", "common"]);
  const currentLanguage = i18n.language;

  const id: number = Number(useLocalSearchParams<{ id: string }>().id);

  const [fetchedEntryMain, setFetchedEntryMain] = useState<
    JournalEntryMainType | undefined
  >(undefined);
  const [fetchedEntryEmotions, setFetchedEntryEmotions] = useState<
    emotionObjType[] | undefined
  >([]);

  useEffect(() => {
    if (id) {
      fetchJournalEntry(id).then((res) => {
        setFetchedEntryMain(res.main[0]);
        setFetchedEntryEmotions(res.emotions);
      });
    }
  }, []);

  let date = "";
  let time = "";

  if (fetchedEntryMain) {
    if (fetchedEntryMain.datetime) {
      date = fetchedEntryMain.datetime.split(" ")[0];
      time = fetchedEntryMain.datetime.split(" ")[1];
      time = time.slice(0, -3);
      if (currentLanguage === "pl") {
        date = convertIsoToEuropeanDate(date);
      }
      date = formatDateStringForWrapping(date);
    }

    return (
      <ScrollView>
        <ActivityShowNav
          handlePressDelete={() =>
            handleDeleteEntry(deleteMoodJournalEntry, id)
          }
        />
        <View className={`mx-6 my-10 flex-1 justify-center`}>
          <View className="mb-12 pb-10">
            <View className="mb-8 justify-between">
              <ToolHeader>
                {t(`tools.${TOOL_NAME}.exercise.summary.title`)}
              </ToolHeader>
              <ShowPageHeaderDate date={date} time={time} />
            </View>
            <View className="my-8">
              {fetchedEntryMain.moodValue && (
                <View>
                  <Text>
                    {t(`tools.${TOOL_NAME}.exercise.summary.mood_rating`)}
                  </Text>
                  <View className="flex-row">
                    <View className="w-3/4 px-2 pt-2">
                      <Slider
                        minimumValue={0} // 0.1 causes a visual glitch
                        maximumValue={0.6}
                        value={(fetchedEntryMain.moodValue - 1) / 10}
                        disabled
                        renderThumbComponent={() => <View></View>}
                        minimumTrackTintColor={
                          fetchedEntryMain.moodValue < 4
                            ? Colors.red
                            : fetchedEntryMain.moodValue < 6
                              ? Colors.salmonOrange
                              : Colors.green
                        }
                        maximumTrackTintColor={Colors.whiteSmoke}
                        trackStyle={{
                          paddingTop: 15,
                          borderRadius: 50,
                          borderColor: Colors.lightGray,
                          borderStyle: "solid",
                          borderWidth: 1,
                        }}
                      />
                    </View>
                    <View className="w-1/4 items-center justify-center">
                      <Text className="text-center text-xl">
                        {/* {moodValueTitles[fetchedEntryMain.moodValue! - 1]} */}
                        {t(
                          `tools.${TOOL_NAME}.mood_value_titles.${moodValueTitles[fetchedEntryMain.moodValue! - 1]}`,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                className="my-8 justify-center border-b border-t px-2 py-7"
                style={{ borderColor: Colors.lightGray }}
              >
                <Text className="absolute top-4">
                  {t(`tools.${TOOL_NAME}.exercise.summary.emotions`)}
                </Text>
                <View className="mx-auto mt-6 w-[95%] flex-row flex-wrap px-4">
                  {fetchedEntryEmotions &&
                    fetchedEntryEmotions.map(
                      (emotionObj: emotionObjType, index: number) => (
                        <View
                          className="w-full flex-row items-center justify-between"
                          key={index}
                        >
                          <DistortionPill
                            title={t(
                              `tools.${TOOL_NAME}.emotion_list.${emotionObj.name}`,
                            )}
                            customColor={
                              emotionList.find(
                                (obj) => obj.name === emotionObj.name,
                              )?.color || "transparent"
                            }
                            checked={true}
                            key={index}
                          />
                          <View className="flex-row">
                            {Array.from({ length: 5 }).map(
                              (q: unknown, i: number) => {
                                return (
                                  <View
                                    className="mx-1 h-4 w-4 rounded-full"
                                    style={
                                      i <= emotionObj.strength! - 1
                                        ? {
                                            backgroundColor: `${
                                              emotionList.find(
                                                (obj) =>
                                                  obj.name === emotionObj.name,
                                              )?.color || "transparent"
                                            }`,
                                          }
                                        : { backgroundColor: Colors.offWhite }
                                    }
                                    key={i}
                                  ></View>
                                );
                              },
                            )}
                          </View>
                        </View>
                      ),
                    )}
                </View>
              </View>
              <View className="mt-4">
                <Text>{t(`tools.${TOOL_NAME}.exercise.summary.note`)}</Text>
                {fetchedEntryMain.note ? (
                  <CDATextBox textContent={fetchedEntryMain.note} />
                ) : (
                  <View
                    className="mt-4 h-28 justify-center rounded-lg"
                    style={{ borderColor: Colors.mainGray }}
                  >
                    <Text className="text-center">
                      {t(
                        `tools.${TOOL_NAME}.exercise.summary.no_note_placeholder`,
                      )}
                    </Text>
                  </View>
                )}
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
