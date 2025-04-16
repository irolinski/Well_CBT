import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { logoImages } from "@/assets/images/global/logo/logo";
import AdvanceButton from "@/components/AdvanceButton";
// import { LogoDark } from "@/components/global/Logo";
import Text from "@/components/global/Text";
import SecondaryButton from "@/components/SecondaryButton";
import ToolNav from "@/components/tools/ToolNav";
import { journal_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { analyticsLogFinishToolEvent } from "@/services/firebase/firebase";
import { RootState } from "@/state/store";
import { transform } from "@babel/core";

const CURRENT_PAGE = 6;
const TOOL_NAME = journal_tool.name;

const Log_finish = () => {
  const { t } = useTranslation(["tools", "common"]);

  //tool state
  const journalState = useSelector((state: RootState) => state.journal);

  return (
    <React.Fragment>
      <ScrollView className="relative">
        <ToolNav
          currentPage={CURRENT_PAGE}
          numOfAllPages={journal_tool.num_of_pages}
          hideBackButton={true}
        />
        <View
          className="mx-6 flex-1 justify-center"
          style={{ height: SCREEN_HEIGHT }}
        >
          <View className="items-center justify-center pb-32">
            <Image
              source={logoImages.logo_dark}
              contentFit="contain"
              style={{
                width: 150,
                height: 100,
                transform: [{ translateX: 20 }],
              }}
            />

            <Text
              className="my-4 px-4 text-center text-2xl"
              style={{ fontFamily: "KodchasanMedium", color: Colors.offBlack }}
            >
              {journalState.save ? (
                <Text>
                  {t(`tools.${TOOL_NAME}.exercise.page_finish.message_1_saved`)}
                </Text>
              ) : (
                <Text>
                  {t(
                    `tools.${TOOL_NAME}.exercise.page_finish.message_1_discarded`,
                  )}
                </Text>
              )}
            </Text>
            <Text className="my-1 mr-[10w] text-center">
              {journalState.save ? (
                <Text>
                  {t(`tools.${TOOL_NAME}.exercise.page_finish.message_2_saved`)}
                </Text>
              ) : (
                <Text>
                  {t(
                    `tools.${TOOL_NAME}.exercise.page_finish.message_2_discarded`,
                  )}
                </Text>
              )}
            </Text>
          </View>
          <View className="absolute bottom-16 left-0 right-0">
            <View className="mb-4 flex-row justify-between">
              <SecondaryButton
                title={t("buttons.go_to_journal", { ns: "common" })}
                className="w-[45%]"
                onPress={() => {
                  analyticsLogFinishToolEvent(TOOL_NAME);
                  router.replace("/home/activity_log");
                }}
              />
            </View>
            <AdvanceButton
              className="mb-4 justify-center"
              title={t("buttons.return_to_tools", { ns: "common" })}
              onPress={() => {
                analyticsLogFinishToolEvent(TOOL_NAME);
                router.replace("tools" as Href);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Log_finish;
