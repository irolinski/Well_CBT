import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DividerLine from "@/components/global/DividerLine";
import {
  cognitiveDistortions,
  DistortionListProps,
} from "@/constants/models/tools/cda_distortionList";
import { cda_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_WIDTH } from "@/constants/styles/values";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DistortionPill from "../../global/DistortionPill";
import Text from "../../global/Text";

const TOOL_NAME = cda_tool.name;

const CDADistortionList = ({
  showDistortionTooltip,
  handleSetShowDistortionTooltip,
  tooltipX,
  tooltipY,
  handleShowTooltip,
  instructionColor,
  disableSelect = false,
}: DistortionListProps) => {
  const { t } = useTranslation("tools");
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  const getArrowPositionX = () => {
    let left = tooltipX - styles.tooltip.width / 2 - styles.arrow.width;

    if (tooltipX > SCREEN_WIDTH * 0.9) {
      left -= 50;
    }
    if (tooltipX > SCREEN_WIDTH * 0.5) {
      left += 50;
    }
    if (tooltipX < SCREEN_WIDTH * 0.5) {
      left = tooltipX * 0.2;
    }
    if (tooltipX < SCREEN_WIDTH * 0.1) {
      left = tooltipX;
    }

    return left;
  };

  return (
    <>
      <View style={styles.distortionWrapper}>
        <Text
          className="w-full pb-6"
          style={{
            color: instructionColor || Colors.mainGray,
            fontSize: 14,
          }}
        >
          {t(`tools.${TOOL_NAME}.exercise.page_2.instruction_2`)}
        </Text>

        {cognitiveDistortions.map((distortion, indexNum) => (
          <DistortionPill
            key={indexNum}
            title={t(`tools.${TOOL_NAME}.distortion_list.${distortion}.name`)}
            checked={!disableSelect && distortion === cdaState.distortion}
            highlighted={showDistortionTooltip === indexNum}
            onPress={() =>
              !disableSelect && dispatch(setDistortion(distortion))
            }
            onLongPress={() => handleShowTooltip(tooltipX, tooltipY, indexNum)}
          />
        ))}
      </View>

      {/* Tooltip */}
      <Modal
        visible={showDistortionTooltip !== null}
        transparent
        style={styles.modal}
      >
        <View
          style={styles.modalTouchable}
          onTouchEnd={() => handleSetShowDistortionTooltip(null)}
        >
          <View
            style={[
              styles.tooltip,
              {
                top: tooltipY - styles.tooltip.height - 40,
                left:
                  tooltipX + styles.tooltip.width > SCREEN_WIDTH
                    ? SCREEN_WIDTH -
                      styles.tooltip.width -
                      styles.tooltip.width * 0.1
                    : tooltipX,
              },
            ]}
          >
            <View style={styles.tooltipHeader}>
              <Text style={styles.tooltipTitle}>
                {t(
                  `tools.${TOOL_NAME}.distortion_list.${cognitiveDistortions[showDistortionTooltip!]}.name`,
                )}
              </Text>
              <View style={styles.tooltipCloseIcon}>
                <MaterialCommunityIcons
                  name="window-close"
                  size={16}
                  color={Colors.white}
                />
              </View>
            </View>
            <DividerLine width={styles.tooltip.width * 0.8} weight={0.2} />
            <View style={styles.tooltipBody}>
              <Text style={styles.tooltipDescription}>
                {t(
                  `tools.${TOOL_NAME}.distortion_list.${cognitiveDistortions[showDistortionTooltip!]}.description`,
                )}
              </Text>
            </View>
            <View
              style={[
                styles.arrow,
                {
                  top: styles.tooltip.height - styles.arrow.height / 2,
                  left: getArrowPositionX(),
                },
              ]}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  distortionWrapper: {
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modal: {
    zIndex: 0,
    flex: 1,
  },
  modalTouchable: {
    flex: 1,
  },
  tooltip: {
    position: "absolute",
    width: 275,
    height: 175,
    backgroundColor: Colors.darkGray,
    borderRadius: 5,
    padding: 20,
    justifyContent: "flex-start",
  },
  tooltipHeader: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  tooltipTitle: {
    color: Colors.white,
    fontWeight: "800",
    fontSize: 16,
    paddingHorizontal: 15,
  },
  tooltipBody: {
    height: "75%",
    transform: [{ translateY: -4 }],
    justifyContent: "center",
  },
  tooltipDescription: {
    marginTop: 12,
    textAlign: "center",
    color: Colors.white,
    fontSize: 13,
  },
  tooltipCloseIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  arrow: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: Colors.darkGray,
    transform: [{ rotate: "45deg" }],
    zIndex: 10,
  },
});

export default CDADistortionList;
