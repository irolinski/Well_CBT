import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import cognitiveDistortions from "@/constants/models/cda_distortionList";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";

const Page_2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  const [showDistortionTooltip, setshowDistortionTooltip] = useState<
    number | null
  >(null);

  const [tooltipY, setTooltipY] = useState(0);

  const handleSetTooltipY = (y: number) => {
    if (showDistortionTooltip === null) setTooltipY(y);
  };

  const handleShowTooltip = (y: number, index: number) => {
    setTooltipY(y);
    setshowDistortionTooltip(index);
  };

  return (
    <React.Fragment>
      <ScrollView
        onTouchStart={(evt) => {
          handleSetTooltipY(evt.nativeEvent.pageY);
        }}
      >
        <ToolNav currentPage={2} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <ToolHeader>Now, let's take a closer look...</ToolHeader>
            <View className="my-8">
              <View
                className="justify-center rounded-lg border bg-gray-200"
                style={{ borderColor: "#4391BC" }}
              >
                <Text className="mx-4 my-2 h-28 text-center text-lg">
                  {cdaState.oldThought}
                </Text>
              </View>
              <View className="mx-auto mt-8">
                <Text className="mr-[10vw] text-left">
                  Here is a list of some of the most common{" "}
                  <Text className="font-bold">cognitive distortions</Text>.
                  Choose <Text className="font-bold">one</Text> that most
                  accurately describes your thought:
                </Text>
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
                          style={{
                            fontFamily: "InterItalic",
                            color: "#73848D",
                            margin: 10,
                          }}
                        >
                          {d.description}
                        </Text>
                      }
                      useInteractionManager={true}
                      accessible={false}
                      placement="top"
                      onClose={() => setshowDistortionTooltip(null)}
                      tooltipStyle={{
                        position: "absolute",
                        top: tooltipY - 125,
                      }}
                      contentStyle={{
                        backgroundColor: "#FBFBFB",
                        height: 90,
                        width: 275,
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
              </View>
            </View>
          </View>
        </Frame>
        <AdvanceButton
          containerStyles="bottom-8 my-4 mx-6 justify-center"
          title="Next"
          onPress={() => router.navigate("./page_3")}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_2;
