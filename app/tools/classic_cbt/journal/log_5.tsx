import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/global/AdvanceButton";
import DistortionPill from "@/components/global/DistortionPill";
import Frame from "@/components/global/Frame";
import Text from "@/components/global/Text";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { journal_tool } from "@/constants/models/tools";
import { moodValueTitles } from "@/constants/models/tools/journal";
import { Colors } from "@/constants/styles/colorTheme";
import { journalStyleConstants } from "@/constants/styles/values";
import { getUserSettingsData, UserSettingsDataObj } from "@/db/settings";
import { handleSaveMoodJournalEntry } from "@/db/tools";
import {
  journalResetState,
  setSave,
} from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";
import Feather from "@expo/vector-icons/Feather";
import { Slider } from "@miblanchard/react-native-slider";

const TOOL_NAME = journal_tool.name;
const CURRENT_PAGE = 5;

const Log_5 = () => {
  const { t } = useTranslation(["tools", "common"]);

  //tool state
  const dispatch = useDispatch<AppDispatch>();
  const journalState = useSelector((state: RootState) => state.journal);
  const [settingsData, setSettingsData] = useState<UserSettingsDataObj>();

  const handleSave = async () => {
    handleSaveMoodJournalEntry(journalState);
    dispatch(journalResetState());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: UserSettingsDataObj =
          (await getUserSettingsData()) as UserSettingsDataObj;
        if (res) {
          setSettingsData(res);
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
        Alert.alert(t("alerts.error"), t("alerts.error_db_fetching"));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setSave(settingsData?.exerciseAutoSaveIsActive));
  }, [settingsData]);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav
          currentPage={CURRENT_PAGE}
          numOfAllPages={journal_tool.num_of_pages}
        />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              {t(`tools.${TOOL_NAME}.exercise.summary.header`)}
            </ToolHeader>
            <View className="my-8">
              <View>
                <Text>
                  {t(`tools.${TOOL_NAME}.exercise.summary.mood_rating`)}
                </Text>
                <View className="flex-row">
                  <View className="w-3/4 px-2 pt-2">
                    <Slider
                      animateTransitions
                      trackClickable
                      minimumValue={journalStyleConstants.SLIDER_MIN_VAL} // 0.1 causes a visual glitch
                      maximumValue={journalStyleConstants.MOOD_SLIDER_MAX_VAL}
                      disabled
                      value={(journalState.moodValue! - 1) / 10}
                      renderThumbComponent={() => (
                        <View
                          style={{
                            display: "none",
                          }}
                        ></View>
                      )}
                      minimumTrackTintColor={
                        journalState.moodValue! < 4
                          ? Colors.red
                          : journalState.moodValue! < 6
                            ? Colors.orange
                            : Colors.green
                      }
                      maximumTrackTintColor={Colors.whiteSmoke}
                      thumbTintColor={Colors.whiteSmoke}
                      trackStyle={{
                        paddingTop: 10,
                        borderRadius: 50,
                        borderColor: Colors.lightGray,
                        borderStyle: "solid",
                        borderWidth: 1,
                      }}
                    />
                  </View>
                  <View className="w-1/4 items-center justify-center">
                    <Text className="text-center text-xl">
                      {t(
                        `tools.${TOOL_NAME}.mood_value_titles.${moodValueTitles[journalState.moodValue! - 1]}`,
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                className="my-8 border-b border-t px-2 py-7"
                style={{ borderColor: Colors.lightGray }}
              >
                <Text>{t(`tools.${TOOL_NAME}.exercise.summary.emotions`)}</Text>
                <View className="mx-auto mt-6 w-[95%] flex-row flex-wrap px-4">
                  {journalState.emotions.map((emotionObj, index) => (
                    <View
                      className="w-full flex-row items-center justify-between"
                      key={index}
                    >
                      <DistortionPill
                        title={t(
                          `tools.${TOOL_NAME}.emotion_list.${emotionObj.name}`,
                        )}
                        customColor={emotionObj.color}
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
                                    ? { backgroundColor: `${emotionObj.color}` }
                                    : { backgroundColor: Colors.offWhite }
                                }
                                key={i}
                              />
                            );
                          },
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View className="mt-4">
                <Text> {t(`tools.${TOOL_NAME}.exercise.summary.header`)}</Text>
                {journalState.note ? (
                  <CDATextBox textContent={journalState.note} />
                ) : (
                  <View className="items-center justify-center p-8">
                    <Text>
                      {t(
                        `tools.${TOOL_NAME}.exercise.summary.no_note_placeholder`,
                      )}
                    </Text>
                  </View>
                )}
              </View>
              <Pressable
                onPress={() => {
                  dispatch(setSave(!journalState.save));
                }}
              >
                <View className="mx-2 mt-10 flex flex-row pt-4">
                  <View
                    className="h-6 w-6 rounded-md border"
                    style={{
                      borderColor: Colors.darkBlue,
                      backgroundColor: journalState.save
                        ? Colors.mainBlue
                        : "transparent",
                    }}
                  >
                    {journalState.save ? (
                      <View className="mx-auto">
                        <Feather
                          name="check"
                          size={22}
                          color={Colors.whiteSmoke}
                        />
                      </View>
                    ) : null}
                  </View>
                  <Text
                    className="mx-4 my-1 text-center"
                    style={{ color: Colors.darkBlue }}
                  >
                    {t("buttons.save_to_journal", { ns: "common" })}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title={t("buttons.next", { ns: "common" })}
            onPress={() => {
              handleSave();
              router.navigate("./log_finish");
            }}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
export default Log_5;
