import { router } from "expo-router";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import AdvanceButton from "@/components/global/AdvanceButton";
import Frame from "@/components/global/Frame";
import Text from "@/components/global/Text";
import CDADistortionList from "@/components/tools/cda/CDADistortionList";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import ToolNav from "@/components/tools/ToolNav";
import { cda_tool } from "@/constants/models/tools";
import { RootState } from "@/state/store";

const CURRENT_PAGE = 2;
const TOOL_NAME = cda_tool.name;

const Page_2 = () => {
  const { t } = useTranslation(["tools", "common"]);

  // tool state
  const cdaState = useSelector((state: RootState) => state.cda);

  // tooltip state
  const [showDistortionTooltip, setshowDistortionTooltip] = useState<
    number | null
  >(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const handleSetShowDistortionTooltip = (index: number | null) => {
    setshowDistortionTooltip(index);
  };

  const handleSetTooltipX = (x: number) => {
    if (showDistortionTooltip === null) setTooltipX(x);
  };
  const handleSetTooltipY = (y: number) => {
    if (showDistortionTooltip === null) setTooltipY(y);
  };
  const handleShowTooltip = (x: number, y: number, index: number) => {
    handleSetTooltipX(x);
    handleSetTooltipY(y);
    setshowDistortionTooltip(index);
  };

  return (
    <React.Fragment>
      <ScrollView
        onTouchStart={(evt) => {
          handleSetTooltipX(evt.nativeEvent.pageX);
          handleSetTooltipY(evt.nativeEvent.pageY);
        }}
      >
        <ToolNav
          currentPage={CURRENT_PAGE}
          numOfAllPages={cda_tool.num_of_pages}
        />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              {t(`tools.${TOOL_NAME}.exercise.page_2.header`)}
            </ToolHeader>
            <View className="my-8">
              <Text>{t(`tools.${TOOL_NAME}.exercise.page_2.subheader_1`)}</Text>
              <CDATextBox textContent={cdaState.oldThought} />
              <View className="mx-auto mt-8">
                <Text className="mr-[10%] text-left">
                  <Trans
                    i18nKey="tools.cda.exercise.page_2.instruction_1"
                    ns="tools"
                    components={{
                      bold: <Text style={{ fontWeight: "bold" }} />,
                    }}
                  />
                </Text>
                <CDADistortionList
                  showDistortionTooltip={showDistortionTooltip}
                  handleSetShowDistortionTooltip={
                    handleSetShowDistortionTooltip
                  }
                  tooltipX={tooltipX}
                  tooltipY={tooltipY}
                  handleShowTooltip={handleShowTooltip}
                />
              </View>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title={t("buttons.next", { ns: "common" })}
            onPress={() => router.navigate(`./page_${CURRENT_PAGE + 1}`)}
            disabled={!cdaState.distortion}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_2;
