import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { tutorialImages } from "@/assets/images/tools/tutorials/tutorials";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";

const CBTDiagramSubtitledImage = () => {
  return (
    <View>
      <Image
        style={{ width: SCREEN_WIDTH * 0.95, height: 130 }}
        source={tutorialImages.cda.cbt_diagram}
      />
      <View
        className="flex-row justify-between px-8 py-4"
        style={{ width: SCREEN_WIDTH * 0.95 }}
      >
        <Text style={styles.imageSubtitle}>Situation</Text>
        <Text style={styles.imageSubtitle}>Thought</Text>
        <Text style={styles.imageSubtitle}>Feeling</Text>
        <Text style={styles.imageSubtitle}>Action</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSubtitle: { color: Colors.white, fontSize: 14, fontWeight: 800 },
});

export default CBTDiagramSubtitledImage;
