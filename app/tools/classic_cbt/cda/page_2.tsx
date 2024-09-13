import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import DistortionTag from "@/components/DistortionTag";
import Frame from "@/components/Frame";
import cognitiveDistortions from "@/constants/models/cda_distortionList";
import { setDistortion } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Page_2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cdaState = useSelector((state: RootState) => state.cda);
  // const distorionsArr: string[] = cdaState.distortion;

  // const handleDistortionState = (
  //   distortion: string,
  //   distortionsArr: string[]
  // ) => {
  //   const elIndex = distortionsArr.indexOf(distortion);
  //   let newArr = [];
  //   if (elIndex > -1) {
  //     newArr = [...distortionsArr];
  //     newArr.splice(elIndex, 1);
  //   } else {
  //     newArr = [...distorionsArr, distortion];
  //   }

  //   dispatch(setDistortions(newArr));
  // };

  return (
    <React.Fragment>
      <BackButton />
      <Frame>
        <View className="my-4 mx-8">
          <Text className="text-xl font-bold text-center">
            Now let's take a closer look...
          </Text>
          <Text className="text-lg font-bold my-4">Your thought:</Text>
          <View className=" bg-gray-200  justify-center b">
            <Text className="h-24 my-2 mx-4 text-lg text-center ">
              {cdaState.oldThought}
            </Text>
          </View>
          <View className="border-t mt-4 p-2">
            <Text className="text-center">
              Here is a list of some potential cognitive distortions. Choose one
              that best describes your thought.
            </Text>
            <View>
              <View className="flex flex-row my-8 mx-2 overflow-hidden flex-wrap">
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
      </Frame>
      <CustomButton
        containerStyles="bottom-8 mx-auto"
        title="Next"
        onPress={() => router.navigate("./page_3")}
      />
    </React.Fragment>
  );
};

export default Page_2;
