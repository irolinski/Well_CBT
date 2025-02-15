import { Href, router } from "expo-router";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import { toolBackgrounds } from "@/assets/images/tools/backgrounds/backgrounds";
import AdvanceButton from "@/components/AdvanceButton";
import BackButton from "@/components/BackButton";
import { cda_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";

const TOOL_NAME = cda_tool.name;

const Cda = () => {
  const { t } = useTranslation(["tools", "common"]);
  const windowHeight = Dimensions.get("window").height;

  return (
    <React.Fragment>
      <ImageBackground source={toolBackgrounds.thought_challange}>
        <View
          className="absolute left-6 z-10"
          style={{ top: windowHeight * 0.075 }}
        >
          <BackButton color={Colors.whiteSmoke} />
        </View>
        <View className="h-full justify-center px-6">
          <View className="items-center justify-center">
            <View className="absolute left-8 top-8"></View>
            <View>
              <View className="my-4 mr-[15%] justify-center">
                <Text
                  className="my-4 text-left text-2xl font-bold"
                  style={{
                    fontFamily: "KodchasanMedium",
                    color: Colors.whiteSmoke,
                  }}
                >
                  {t(`tools.${TOOL_NAME}.title`)}
                </Text>
                <Text
                  className="my-2 text-sm"
                  style={{ color: Colors.offWhite }}
                >
                  <Trans
                    i18nKey="tools.cda.description"
                    ns="tools"
                    components={{
                      bold: <Text style={{ fontWeight: "bold" }} />,
                    }}
                  />
                </Text>
              </View>
            </View>
            <View className="my-16 w-full">
              <AdvanceButton
                className="w-full"
                title={t("buttons.lets_begin", { ns: "common" })}
                onPress={() =>
                  router.replace("tools/classic_cbt/cda/page_1" as Href)
                }
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </React.Fragment>
  );
};

export default Cda;
