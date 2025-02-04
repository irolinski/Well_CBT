import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DistortionPill from "@/components/DistortionPill";
import ErrorScreen from "@/components/ErrorScreen";
import Text from "@/components/global/Text";
import ActivityShowNav from "@/components/home/ActivityShowNav";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import {
  emotionObjType,
  JournalEntryMainType,
} from "@/constants/models/home/activity_log";
import { emotionList, moodValueTitles } from "@/constants/models/tools/journal";
import { Colors } from "@/constants/styles/colorTheme";
import { fetchJournalEntry } from "@/db/activity_log";
import { deleteJournalEntry } from "@/db/tools";
import { handleDeleteEntry } from "@/utils/deleteEntry";
import { Slider } from "@miblanchard/react-native-slider";

const ActivityShowPage = () => {
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

  if (fetchedEntryMain && fetchedEntryEmotions) {
    let date;
    if (fetchedEntryMain.datetime) {
      date = fetchedEntryMain.datetime.split(" ")[0];
    }

    return (
      <ScrollView>
        <ActivityShowNav
          handlePressDelete={() => handleDeleteEntry(deleteJournalEntry, id)}
        />
        <View className={`mx-6 my-10 flex-1 justify-center`}>
          <View className="mb-12 pb-10">
            <View className="mb-8 flex-row justify-between">
              <ToolHeader>Journal Entry </ToolHeader>
              <View className="justify-center">
                <Text
                  className="mt-0.5 text-lg"
                  style={{
                    fontFamily: "KodchasanMedium",
                    color: Colors.mainGray,
                  }}
                >
                  {date}
                </Text>
              </View>
            </View>
            <View className="my-8">
              {fetchedEntryMain.moodValue && (
                <View>
                  <Text>Mood rating: </Text>
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
                            ? "#D46A6A"
                            : fetchedEntryMain.moodValue < 6
                              ? "#F38E4E"
                              : "#AED581"
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
                        {moodValueTitles[fetchedEntryMain.moodValue! - 1]}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              <View
                className="my-8 justify-center border-b border-t px-2 py-7"
                style={{ borderColor: Colors.lightGray }}
              >
                <Text className="absolute top-4">Emotions:</Text>
                <View className="mx-auto mt-6 w-[95%] flex-row flex-wrap px-4">
                  {fetchedEntryEmotions.map(
                    (e: emotionObjType, index: number) => (
                      <View
                        className="w-full flex-row items-center justify-between"
                        key={index}
                      >
                        <DistortionPill
                          title={e.name}
                          customColor={
                            emotionList.find((obj) => obj.name === e.name)
                              ?.color || "transparent"
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
                                    i <= e.strength!
                                      ? {
                                          backgroundColor: `${
                                            emotionList.find(
                                              (obj) => obj.name === e.name,
                                            )?.color || "transparent"
                                          }`,
                                        }
                                      : { backgroundColor: "#FAF9F6" }
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
                <Text>Note:</Text>
                {fetchedEntryMain.note ? (
                  <CDATextBox textContent={fetchedEntryMain.note} />
                ) : (
                  <View
                    className="mt-4 h-28 justify-center rounded-lg"
                    style={{ borderColor: Colors.mainGray }}
                  >
                    <Text className="text-center">
                      No note added to this log.
                    </Text>
                  </View>
                )}
              </View>
              <View className="w-full flex-row justify-center">
                <Image
                  className="h-4 w-1/2 translate-y-16"
                  source={require("@/assets/images/logo_braid.webp")}
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
