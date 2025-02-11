import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  cognitiveDistortions,
  DistortionListProps,
} from "@/constants/models/tools/cda_distortionList";
import { Colors } from "@/constants/styles/colorTheme";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import DistortionPill from "../../DistortionPill";
import Text from "../../global/Text";

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
        className="pb-6"
        style={{
          color: Colors.mainGray,
          fontSize: 14,
        }}
      >
        {t(`tools.cognitive_distortion_analysis.exercise.page_2.instruction_2`)}
      </Text>
      {cognitiveDistortions.map((distortionObj, index) => (
        <Tooltip
          isVisible={showDistortionTooltip === index && true}
          content={
            <Text
              className="text-center"
              style={{
                fontFamily: "InterItalic",
                color: "#73848D",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              {distortionObj.description}
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
            title={distortionObj.name}
            checked={Boolean(distortionObj.name === cdaState.distortion)}
            highlighted={showDistortionTooltip === index}
            onPress={() => {
              dispatch(setDistortion(distortionObj.name));
            }}
            onLongPress={() => handleShowTooltip(tooltipY, index)}
          />
        </Tooltip>
      ))}
    </View>
  );
};
export default CDADistortionList;
