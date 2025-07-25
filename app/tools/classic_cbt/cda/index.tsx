import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ImageBackground, Modal, Text, View } from "react-native";
import { toolBackgrounds } from "@/assets/images/tools/backgrounds";
import AdvanceButton from "@/components/global/AdvanceButton";
import BackButton from "@/components/global/BackButton";
import { cda_tool } from "@/constants/models/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { handleCheckTutorialWasSeen, handleSetSeenTutorial } from "@/db/tools";
import CDA_Tutorial from "./tutorial";

const TOOL_NAME = cda_tool.name;

const Cda = () => {
  const { t } = useTranslation(["tools", "common"]);
  const [tutorialWasSeen, setTutorialWasSeen] = useState<boolean>(false);
  const [tutorialModalIsOpen, setTutorialModalIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleTutorialWasSeenState = async () => {
      const res = await handleCheckTutorialWasSeen("cda");
      setTutorialWasSeen(res);
    };

    handleTutorialWasSeenState();
  }, []);

  return (
    <View>
      <ImageBackground source={toolBackgrounds.thought_challange}>
        <View
          className="absolute left-6 z-10"
          style={{ top: SCREEN_HEIGHT * 0.075 }}
        >
          <BackButton color={Colors.whiteSmoke} />
        </View>
        <View className="h-full justify-center px-6">
          <View className="justify-around">
            <View
              className="my-4 justify-center"
              style={{ marginRight: SCREEN_WIDTH * 0.1 }}
            >
              <Text
                className="my-4 text-left text-2xl"
                style={{
                  fontFamily: "KodchasanMedium",
                  color: Colors.whiteSmoke,
                }}
              >
                {t(`tools.${TOOL_NAME}.title`)}
              </Text>
              <Text className="my-2 text-sm" style={{ color: Colors.offWhite }}>
                <Trans
                  i18nKey="tools.cda.description"
                  ns="tools"
                  components={{
                    bold: <Text style={{ fontWeight: "bold" }} />,
                  }}
                />
              </Text>
            </View>
            <View className="mt-16 w-full items-center">
              <View className="w-full">
                <AdvanceButton
                  className="w-full"
                  title={t("buttons.lets_begin", { ns: "common" })}
                  onPress={() =>
                    !tutorialWasSeen
                      ? setTutorialModalIsOpen(true)
                      : router.replace("tools/classic_cbt/cda/page_1" as Href)
                  }
                />
              </View>
              {tutorialWasSeen && (
                <View className="mt-6 w-3/5">
                  <AdvanceButton
                    title={t("buttons.show_tutorial", { ns: "common" })}
                    btnStyle={{
                      backgroundColor: "transparent",
                      borderWidth: 2,
                      borderColor: Colors.offWhite,
                      borderRadius: 5,
                    }}
                    onPress={() => setTutorialModalIsOpen(true)}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
      <Modal
        className="flex-1"
        animationType="slide"
        visible={tutorialModalIsOpen}
      >
        <CDA_Tutorial
          closeModalFunc={() => {
            setTutorialModalIsOpen(false);
            if (!tutorialWasSeen) {
              handleSetSeenTutorial("cda");
              router.replace("tools/classic_cbt/cda/page_1" as Href);
            }
          }}
        />
      </Modal>
    </View>
  );
};

export default Cda;
