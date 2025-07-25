import { Image } from "expo-image";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { tutorialImages } from "@/assets/images/tools/cda/tutorial";
import DistortionPill from "@/components/DistortionPill";
import InfoSlideScreen, {
  InfoSlideScreenData,
} from "@/components/global/InfoSlideScreenReanimated/InfoSlideScreen";
import Text from "@/components/global/Text";
import CBTDiagramSubtitledImage from "@/components/tools/CBTDiagramSubtitledImage";
import CDADistortionList from "@/components/tools/cda/CDADistortionList";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { handleSetSeenTutorial } from "@/db/tools";

const CDA_Tutorial = ({ closeModalFunc }: { closeModalFunc: () => void }) => {
  const { t } = useTranslation(["tools", "common"]);
  const transComponentsObj = {
    bold: <Text style={{ fontWeight: "bold", color: Colors.white }} />,
    italic: <Text style={{ fontStyle: "italic", color: Colors.white }} />,
  };

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

  const CDATutorialSlideData: InfoSlideScreenData[] = [
    {
      id: 1,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 180,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.welcome}
          />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_1.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_1.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 2,
      orientation: "text_top",
      visualItems: (
        <View
          style={{ width: "100%", marginVertical: 36 }}
          className="items-center"
        >
          <Text
            style={[
              styles.slideTextBodyLead,
              {
                fontSize: 18,
                marginBottom: 42,
                fontWeight: 800,
                textDecorationLine: "underline",
              },
            ]}
          >
            <Trans
              i18nKey="tools.cda.tutorial.page_2.image_1_title"
              ns="tools"
            />
          </Text>
          <CBTDiagramSubtitledImage />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_2.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_2.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 3,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.change_the_way_you_feel}
          />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_3.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_3.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 4,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.automatic_thoughts}
          />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_4.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_4.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 5,
      orientation: "text_top",
      visualItems: (
        <React.Fragment>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              paddingTop: 36,
              paddingBottom: 48,
            }}
          >
            {[
              "example_1",
              "example_2",
              "example_3",
              "example_4",
              "example_5",
              "example_6",
            ].map((key, i) => (
              <View
                key={key}
                className={`w-full flex-row justify-${i % 2 === 0 ? "end" : "start"}`}
                style={{ paddingBottom: i === 5 ? 50 : 15 }}
              >
                <DistortionPill
                  title={t(`tools.cda.tutorial.page_5.${key}`)}
                  checked={false}
                  customColor={Colors.white}
                />
              </View>
            ))}
          </View>
        </React.Fragment>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_5.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_5.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 6,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.cognitive_distortions}
          />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_6.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_6.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 7,
      visualItems: (
        <View
          onTouchStart={(evt) => {
            handleSetTooltipX(evt.nativeEvent.pageX);
            handleSetTooltipY(evt.nativeEvent.pageY);
          }}
          style={{
            height: "100%",
            justifyContent: "flex-start",
            paddingTop: SCREEN_HEIGHT * 0.05,
          }}
        >
          <Text style={styles.slideTextHeader}>
            <Trans i18nKey="tools.cda.tutorial.page_7.title" ns="tools" />
          </Text>
          <CDADistortionList
            showDistortionTooltip={showDistortionTooltip}
            handleSetShowDistortionTooltip={handleSetShowDistortionTooltip}
            tooltipX={tooltipX}
            tooltipY={tooltipY}
            handleShowTooltip={handleShowTooltip}
            instructionColor={Colors.white}
            disableSelect
          />
          <Text style={styles.slideTextBodyInstruction}>
            <Trans
              i18nKey="tools.cda.tutorial.page_7.instruction_1"
              ns="tools"
            />
          </Text>
        </View>
      ),
    },
    {
      id: 8,
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 220,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.example_start}
          />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_8.title" ns="tools" />,
      text: (
        <Trans
          i18nKey="tools.cda.tutorial.page_8.instruction_1"
          ns="tools"
          components={transComponentsObj}
        />
      ),
    },
    {
      id: 9,
      visualItems: (
        <View style={{ paddingBottom: 24 }}>
          <View>
            <Text style={[styles.slideTextBodyLead, { paddingBottom: 8 }]}>
              <Trans
                i18nKey="tools.cda.tutorial.page_9.instruction_1"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
            <CDATextBox
              textContent={t("tools.cda.tutorial.page_9.textbox_1")}
            />
            <Text
              style={[
                styles.slideTextBodyInstruction,
                { paddingBottom: 8, textAlign: "center", fontWeight: 800 },
              ]}
            >
              {t("instructions.hint", { ns: "common" })}:
            </Text>

            <Text
              style={[
                styles.slideTextBodyInstruction,
                { paddingBottom: 8, textAlign: "center", marginTop: 0 },
              ]}
            >
              <Trans
                i18nKey="tools.cda.tutorial.page_9.hint_1"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
          </View>
          <View>
            <Text style={[styles.slideTextBodyLead, { paddingBottom: 8 }]}>
              <Trans
                i18nKey="tools.cda.tutorial.page_9.instruction_2"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
            <CDATextBox
              textContent={t("tools.cda.tutorial.page_9.textbox_2")}
            />
          </View>
        </View>
      ),
    },
    {
      id: 10,
      visualItems: (
        <View>
          <View>
            <Text style={styles.slideTextBodyLead}>
              <Trans
                i18nKey="tools.cda.tutorial.page_10.instruction_1"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
            <Text style={[styles.slideTextBodyInstruction, { marginTop: 24 }]}>
              <Trans
                i18nKey="tools.cda.tutorial.page_10.textbox_1_title"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
            <CDATextBox
              textContent={t("tools.cda.tutorial.page_10.textbox_1")}
            />
          </View>
          <View>
            <Text
              style={[
                styles.slideTextBodyLead,
                { marginBottom: SCREEN_HEIGHT * 0.035 },
              ]}
            >
              <Trans
                i18nKey="tools.cda.tutorial.page_10.instruction_2"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
            <View className="items-center">
              <View style={{ width: 144 }}>
                <DistortionPill
                  title={t("tools.cda.tutorial.page_10.distortion")}
                  checked
                />
              </View>
            </View>
            <Text
              style={[
                styles.slideTextBodyLead,
                { marginTop: SCREEN_HEIGHT * 0.035 },
              ]}
            >
              <Trans
                style={[
                  styles.slideTextBodyLead,
                  {
                    fontSize: 16,
                    fontStyle: "italic",
                  },
                ]}
                i18nKey="tools.cda.tutorial.page_10.instruction_3"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
          </View>
        </View>
      ),
    },
    {
      id: 11,
      visualItems: (
        <View>
          <View>
            <Text style={[styles.slideTextBodyLead, { fontSize: 16 }]}>
              <Trans
                i18nKey="tools.cda.tutorial.page_11.instruction_1"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>

            <Text style={[styles.slideTextBodyLead]}>
              <Trans
                i18nKey="tools.cda.tutorial.page_11.instruction_2"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
          </View>
          <View>
            <CDATextBox
              customStyle={{ height: 230 }}
              textContent={t("tools.cda.tutorial.page_11.textbox_1")}
            />
            <Text style={[styles.slideTextBodyLead, { fontSize: 16 }]}>
              {t("tools.cda.tutorial.page_11.instruction_3")}
            </Text>
          </View>
        </View>
      ),
    },
    {
      id: 12,
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 300,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.example_finish}
          />
        </View>
      ),
      title: <Trans i18nKey="tools.cda.tutorial.page_12.title" ns="tools" />,
      text: (
        <View>
          <Text
            style={[styles.slideTextBodyLead, { fontSize: 16, marginTop: 0 }]}
          >
            <Trans
              i18nKey="tools.cda.tutorial.page_12.instruction_1"
              ns="tools"
              components={transComponentsObj}
            />
          </Text>
          <View style={{ paddingTop: 24 }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: 14,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              {t("instructions.remember", { ns: "common" })}:
            </Text>
            <Text
              style={{ color: Colors.white, fontSize: 14, textAlign: "center" }}
            >
              <Trans
                i18nKey="tools.cda.tutorial.page_12.hint_1"
                ns="tools"
                components={transComponentsObj}
              />
            </Text>
          </View>
        </View>
      ),
    },
  ];

  return (
    <React.Fragment>
      <InfoSlideScreen
        onSlideshowFinish={() => {
          closeModalFunc();
        }}
        slideData={CDATutorialSlideData}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  slideTextHeader: {
    fontFamily: "Kodchasan",
    color: Colors.white,
    fontSize: 20,
    fontWeight: 800,
  },
  slideTextBodyInstruction: {
    color: Colors.white,
    marginTop: 24,
    fontSize: 14,
  },
  slideTextBodyLead: {
    color: Colors.white,
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
  },
});

export default CDA_Tutorial;
