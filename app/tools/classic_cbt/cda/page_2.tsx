import AdvanceButton from "@/components/AdvanceButton";
import DistortionTag from "@/components/DistortionTag";
import Frame from "@/components/Frame";
import cognitiveDistortions from "@/constants/models/cda_distortionList";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ToolNav from "@/components/ToolNav";

const Page_2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={2} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <Text
              className="text-2xl text-left mr-[10vw]"
              style={{ fontFamily: "KodchasanMedium", color: "#1E1E1E" }}
            >
              Now, let's take a closer look...
            </Text>
            <View className="my-4 ">
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
                  describes your thought.
                </Text>
                <View>
                  <View className="flex flex-row mt-6 mx-2 overflow-hidden flex-wrap">
                    {cognitiveDistortions.map((d, index) => (
                      <DistortionTag
                        title={d}
                        checked={Boolean(d === cdaState.distortion)}
                        onPress={() => dispatch(setDistortion(d))}
                        key={index}
                      />
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
