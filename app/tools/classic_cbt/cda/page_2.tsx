import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import CDADistortionList from "@/components/tools/CDADistortionList";
import CDATextBox from "@/components/tools/CDATextBox";
import { RootState } from "@/state/store";

const Page_2 = () => {
  // tool state
  const cdaState = useSelector((state: RootState) => state.cda);

  // tooltip state
  const [showDistortionTooltip, setshowDistortionTooltip] = useState<
    number | null
  >(null);
  const [tooltipY, setTooltipY] = useState(0);
  const handleSetShowDistortionTooltip = (index: number | null) => {
    setshowDistortionTooltip(index);
  };
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
              <Text>Distorted thought: </Text>
              <CDATextBox textContent={cdaState.oldThought} />
              <View className="mx-auto mt-8">
                <Text className="mr-[10%] text-left">
                  Here is a list of some of the most common{" "}
                  <Text className="font-bold">cognitive distortions</Text>.
                  Choose <Text className="font-bold">one</Text> that most
                  accurately describes your thought:
                </Text>
                <CDADistortionList
                  showDistortionTooltip={showDistortionTooltip}
                  handleSetShowDistortionTooltip={
                    handleSetShowDistortionTooltip
                  }
                  tooltipY={tooltipY}
                  handleShowTooltip={handleShowTooltip}
                />
              </View>
            </View>
          </View>
        </Frame>
        <View className="bottom-16 mx-6">
          <AdvanceButton
            title="Next"
            onPress={() => router.navigate("./page_3")}
            disabled={!cdaState.distortion}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default Page_2;
