import { Image } from "expo-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { tutorialImages } from "@/assets/images/tools/tutorials/tutorials";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";

const CBTDiagramSubtitledImage = () => {
  const { t } = useTranslation("tools");

  return (
    <View>
      <Image
        style={{ width: SCREEN_WIDTH * 0.95, height: 130 }}
        source={tutorialImages.cda.cbt_diagram}
      />
      <View
        className="flex-row justify-between px-4 py-4"
        style={{ width: SCREEN_WIDTH * 0.95 }}
      >
        <View className="w-1/4 flex-row justify-center">
          <Text style={styles.imageSubtitle}>
            {t("tools.cda.tutorial.page_2.image_1_subtitles.situation")}
          </Text>
        </View>
        <View className="w-1/4 flex-row justify-center">
          <Text style={styles.imageSubtitle}>
            {t("tools.cda.tutorial.page_2.image_1_subtitles.thought")}
          </Text>
        </View>
        <View className="w-1/4 flex-row justify-center">
          <Text style={styles.imageSubtitle}>
            {t("tools.cda.tutorial.page_2.image_1_subtitles.feeling")}
          </Text>
        </View>
        <View className="w-1/4 flex-row justify-center">
          <Text style={styles.imageSubtitle}>
            {t("tools.cda.tutorial.page_2.image_1_subtitles.action")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSubtitle: { color: Colors.white, fontSize: 14, fontWeight: 800 },
});

export default CBTDiagramSubtitledImage;
