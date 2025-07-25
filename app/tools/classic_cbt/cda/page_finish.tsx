import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { logoImages } from "@/assets/images/global/logo";
import AdvanceButton from "@/components/global/AdvanceButton";
import SecondaryButton from "@/components/global/SecondaryButton";
import Text from "@/components/global/Text";
import ToolNav from "@/components/tools/ToolNav";
import { cda_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { analyticsLogFinishToolEvent } from "@/services/firebase/firebase";

const CURRENT_PAGE = 5;
const TOOL_NAME = cda_tool.name;

const Page_finish = () => {
  const { t } = useTranslation(["tools", "common"]);

  return (
    <React.Fragment>
      <ScrollView className="relative">
        <ToolNav
          currentPage={CURRENT_PAGE}
          numOfAllPages={cda_tool.num_of_pages}
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
              {t(`tools.${TOOL_NAME}.exercise.page_finish.message_1`)}
            </Text>
            <Text className="my-1 mr-[10w] text-center">
              {t(`tools.${TOOL_NAME}.exercise.page_finish.message_2`)}
            </Text>
          </View>
          <View className="absolute bottom-16 left-0 right-0">
            <View className="mb-4 flex-row justify-between">
              <SecondaryButton
                title={t("buttons.again", { ns: "common" })}
                className="w-[45%]"
                onPress={() => {
                  analyticsLogFinishToolEvent(TOOL_NAME);
                  router.navigate("./" as Href);
                }}
              />
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

export default Page_finish;
