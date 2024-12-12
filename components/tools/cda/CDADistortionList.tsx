import { View } from "react-native";
import Text from "../../global/Text";
import {
  cognitiveDistortions,
  DistortionListProps,
} from "@/constants/models/cda_distortionList";
import Tooltip from "react-native-walkthrough-tooltip";
import DistortionPill from "../../DistortionPill";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { setDistortion } from "@/state/features/tools/cdaSlice";

const CDADistortionList = ({
  showDistortionTooltip,
  handleSetShowDistortionTooltip,
  tooltipY,
  handleShowTooltip,
}: DistortionListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <View className="mt-6 flex-row flex-wrap">
      <Text
        className="pb-6"
        style={{
          color: "#B8B8B8",
          fontSize: 14,
        }}
      >
        Press and hold to see the description.
      </Text>
      {cognitiveDistortions.map((d, index) => (
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
              {d.description}
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
            backgroundColor: "#FBFBFB",
            height: 120,
            width: 275,
            justifyContent: "center",
          }}
          key={index}
        >
          <DistortionPill
            title={d.name}
            checked={Boolean(d.name === cdaState.distortion)}
            highlighted={showDistortionTooltip === index}
            onPress={() => {
              dispatch(setDistortion(d.name));
            }}
            onLongPress={() => handleShowTooltip(tooltipY, index)}
          />
        </Tooltip>
      ))}
    </View>
  );
};
export default CDADistortionList;
