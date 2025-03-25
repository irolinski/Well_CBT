import React from "react";
import { Text, View } from "react-native";
import DistortionPill from "@/components/DistortionPill";
import FadeInView from "@/components/FadeInView";
import { Colors } from "@/constants/styles/colorTheme";

const Onboarding_Feat_CDA_1 = ({ slideNum }: { slideNum: number | null }) => {
  return (
    <View className="items-center" key="3">
      <Text className="mt-4 text-3xl" style={{ color: Colors.offWhite }}>
        Turn distorted thoughts...
      </Text>
      <FadeInView className="mt-12 flex-row">
        {/* Left column */}
        <View className="w-3/5">
          <View className="items-start">
            <DistortionPill title={"All-or-Nothing Thinking"} checked />
          </View>
          <View className="mt-2 items-end">
            <DistortionPill
              title={"Mind reading"}
              customColor={Colors.offWhite}
              checked={false}
            />
          </View>
          <View className="h-16" />
          <View className="items-start">
            <DistortionPill
              title={"'Should' Statements"}
              checked={false}
              customColor={Colors.offWhite}
            />
          </View>
          <View className="mt-4 flex-row">
            <View className="mt-6 w-1/2">
              <DistortionPill title={"Labeling"} checked={true} />
            </View>
            <View className="w-1/2 items-end">
              <View className="w-3/4">
                <DistortionPill
                  title={"Blame"}
                  checked={false}
                  customColor={Colors.offWhite}
                />
              </View>
            </View>
          </View>
          <View className="h-6" />
        </View>
        {/* Right column */}
        <View className="w-2/5">
          <View className="items-end">
            <DistortionPill
              title={"Mental filter"}
              checked={false}
              customColor={Colors.offWhite}
            />
          </View>
          <View className="h-16 w-full" />
          <View className="w-full items-center">
            <DistortionPill
              title={"Fortune telling"}
              checked
              customColor={"#D46A6A"}
            />
          </View>
        </View>
      </FadeInView>
    </View>
  );
};

export default Onboarding_Feat_CDA_1;
