import AdvanceButton from "@/components/AdvanceButton";
import DistortionTag from "@/components/DistortionTag";
import Frame from "@/components/Frame";
import cognitiveDistortions from "@/constants/models/cda_distortionList";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToolNav from "@/components/ToolNav";
import ToolHeader from "@/components/ToolHeader";
import Tooltip from "react-native-walkthrough-tooltip";
import Text from "@/components/global/Text";

const Page_2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  const [showDistortionTooltip, setshowDistortionTooltip] = useState<
    number | null
  >(null);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={2} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <ToolHeader>Now, let's take a closer look...</ToolHeader>
            <View className="my-4">
              <View
                className=" bg-gray-200 justify-center rounded-lg border"
                style={{ borderColor: "#4391BC" }}
              >
                <Text className="h-28 my-2 mx-4 text-lg text-center ">
                  {cdaState.oldThought}
                </Text>
              </View>
              <View className="mt-8 mx-auto">
                <Text className="text-left mr-[15vw]">
                  Here is a list of some popular cognitive distortions. Choose{" "}
                  <Text className="font-bold">one</Text> that most accurately
                  describes your thought:
                </Text>
                <View>
                  <View className="flex-1 flex-row mt-6 flex-wrap">
                    {cognitiveDistortions.map((d, index) => (
                      <View>
                        <Tooltip
                          isVisible={showDistortionTooltip === index && true}
                          content={<Text>{d.description}</Text>}
                          tooltipStyle={{
                            minWidth: 160,
                            minHeight: 80,
                          }}
                          useInteractionManager={false}
                          accessible={false}
                          placement="top"
                          onClose={() => setshowDistortionTooltip(null)}
                          key={index}
                        >
                          <DistortionTag
                            title={d.name}
                            checked={Boolean(d.name === cdaState.distortion)}
                            onPress={() => {
                              dispatch(setDistortion(d.name));
                            }}
                            onLongPress={() => setshowDistortionTooltip(index)}
                          />
                        </Tooltip>
                      </View>
                    ))}
                  </View>
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
