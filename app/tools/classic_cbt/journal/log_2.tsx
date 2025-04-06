import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { emotionObjType } from "@/constants/models/home/activity_log";
import { emotionList } from "@/constants/models/tools/journal";
import { journal_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { setEmotions } from "@/state/features/tools/journalSlice";
import { AppDispatch, RootState } from "@/state/store";

const TOOL_NAME = journal_tool.name;
const CURRENT_PAGE = 2;

const MIN_SELECTED_EMOTIONS = 1;
const MAX_SELECTED_EMOTIONS = 5;

const Log_2 = () => {
  const { t } = useTranslation(["tools", "common"]);

  // tool state
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (emotion: emotionObjType) => {
    let newArr = [...journalState.emotions];

    const index = newArr
      .map(function (e) {
        return e.name;
      })
      .indexOf(emotion.name);

    if (index >= 0) {
      newArr.splice(index, 1);
    } else {
      if (newArr.length < MAX_SELECTED_EMOTIONS) newArr = [...newArr, emotion];
    }
    dispatch(setEmotions(newArr));
  };

  const isChecked = (name: string) => {
    return Boolean(
      [...journalState.emotions]
        .map(function (e) {
          return e.name;
        })
        .indexOf(name) >= 0,
    );
  };

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
              {t(`tools.${TOOL_NAME}.exercise.page_2.header`)}
            </ToolHeader>
            <View className="my-6">
              <Text className="text-xs">
                {t(`tools.${TOOL_NAME}.exercise.page_2.instruction_1`)}
              </Text>
              <View className="mx-2 mt-5">
                <Text
                  className="text-right text-xs"
                  style={{
                    color:
                      journalState.emotions.length < MAX_SELECTED_EMOTIONS
                        ? Colors.darkGray
                        : Colors.red,
                  }}
                >
                  {t(
                    `tools.${TOOL_NAME}.exercise.page_2.selected_current_of_total`,
                    {
                      current: journalState.emotions.length,
                      total: MAX_SELECTED_EMOTIONS,
                    },
                  )}
                </Text>
                <View className="mt-2 flex-row flex-wrap">
                  {emotionList.map((emotionObj, index) => (
                    <DistortionPill
                      title={t(
                        `tools.${TOOL_NAME}.emotion_list.${emotionObj.name}`,
                      )}
                      checked={isChecked(emotionObj.name)}
                      customColor={emotionObj.color}
                      onPress={() =>
                        handlePress({
                          name: emotionObj.name,
                          color: emotionObj.color,
                        })
                      }
                      key={index}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title={t("buttons.next", { ns: "common" })}
            onPress={() => router.navigate("./log_3")}
            disabled={
              journalState.emotions.length < MIN_SELECTED_EMOTIONS && true
            }
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_2;
