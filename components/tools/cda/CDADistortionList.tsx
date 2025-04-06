import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  cognitiveDistortions,
  DistortionListProps,
} from "@/constants/models/tools/cda_distortionList";
import { cda_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import DistortionPill from "../../DistortionPill";
import Text from "../../global/Text";

const TOOL_NAME = cda_tool.name;

const CDADistortionList = ({
  showDistortionTooltip,
  handleSetShowDistortionTooltip,
  tooltipY,
  handleShowTooltip,
}: DistortionListProps) => {
  const { t } = useTranslation("tools");
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <View className="mt-6 flex-row flex-wrap">
      <Text
        className="w-full pb-6"
        style={{
          color: Colors.mainGray,
          fontSize: 14,
        }}
      >
        {t(`tools.${TOOL_NAME}.exercise.page_2.instruction_2`)}
      </Text>
      {cognitiveDistortions.map((distortion, index) => (
        <Tooltip
          isVisible={showDistortionTooltip === index && true}
          content={
            <Text
              className="text-center"
              style={{
                fontFamily: "InterItalic",
                color: Colors.superDarkGray,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {t(
                `tools.${TOOL_NAME}.distortion_list.${distortion}.description`,
              )}
            </Text>
          }
          useInteractionManager={true}
          accessible={false}
          placement="top"
          onClose={() => handleSetShowDistortionTooltip(null)}
          tooltipStyle={{
            position: "absolute",
            top: tooltipY - 155,
          }}
          contentStyle={{
            backgroundColor: Colors.offWhite,
            height: 120,
            width: 275,
            justifyContent: "center",
          }}
          key={index}
        >
          <DistortionPill
            title={t(`tools.${TOOL_NAME}.distortion_list.${distortion}.name`)}
            checked={Boolean(distortion === cdaState.distortion)}
            highlighted={showDistortionTooltip === index}
            onPress={() => {
              dispatch(setDistortion(distortion));
            }}
            onLongPress={() => handleShowTooltip(tooltipY, index)}
          />
        </Tooltip>
      ))}
    </View>
  );
};
export default CDADistortionList;
