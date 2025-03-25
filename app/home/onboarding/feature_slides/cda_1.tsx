import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import DistortionPill from "@/components/DistortionPill";
import { Colors } from "@/constants/styles/colorTheme";

const THIS_SLIDE_KEY = "3";

const SlideInView = ({
  isActive,
  children,
  delay,
  from,
}: {
  isActive: boolean;
  children: React.ReactNode;
  delay: number;
  from: "left" | "right";
}) => {
  const INITIAL_OFFSET_PX = 1000; // if it is less than this, there is a glitch during slide change
  const translateX = useRef(
    new Animated.Value(
      from === "left" ? -INITIAL_OFFSET_PX : INITIAL_OFFSET_PX,
    ),
  ).current;

  const SlideInViewAnim = () => {
    return Animated.timing(translateX, {
      toValue: 0,
      duration: 400,
      delay,
      useNativeDriver: true,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Slight ease-out effect
    });
  };

  useEffect(() => {
    if (isActive) {
      SlideInViewAnim().start();
    }
  }, [translateX, delay, isActive]);

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  );
};

const Onboarding_Feat_CDA_1 = ({ slideNum }: { slideNum: number | null }) => {
  return (
    <View className="items-center" key={THIS_SLIDE_KEY}>
      <Text className="mt-4 text-3xl" style={{ color: Colors.offWhite }}>
        Turn distorted thoughts...
      </Text>
      <View className="mt-12 flex-row">
        {/* Left column */}
        <View className="w-3/5">
          <SlideInView
            isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
            delay={0}
            from="left"
          >
            <View className="items-start">
              <DistortionPill title={"All-or-Nothing Thinking"} checked />
            </View>
          </SlideInView>
          <SlideInView
            isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
            delay={200}
            from="left"
          >
            <View className="mt-2 items-end">
              <DistortionPill
                title={"Mind reading"}
                customColor={Colors.offWhite}
                checked={false}
              />
            </View>
          </SlideInView>
          <View className="h-16" />
          <SlideInView
            isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
            delay={400}
            from="left"
          >
            <View className="items-start">
              <DistortionPill
                title={"'Should' Statements"}
                checked={false}
                customColor={Colors.offWhite}
              />
            </View>
          </SlideInView>
          <View className="mt-4 flex-row">
            <View className="mt-6 w-1/2">
              <SlideInView
                isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
                delay={600}
                from="left"
              >
                <DistortionPill title={"Labeling"} checked={true} />
              </SlideInView>
            </View>
            <View className="w-1/2 items-end">
              <View className="w-3/4">
                <SlideInView
                  isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
                  delay={800}
                  from="right"
                >
                  <DistortionPill
                    title={"Blame"}
                    checked={false}
                    customColor={Colors.offWhite}
                  />
                </SlideInView>
              </View>
            </View>
          </View>
          <View className="h-6" />
        </View>
        {/* Right column */}
        <View className="w-2/5">
          <View className="items-end">
            <SlideInView
              isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
              delay={100}
              from="right"
            >
              <DistortionPill
                title={"Mental filter"}
                checked={false}
                customColor={Colors.offWhite}
              />
            </SlideInView>
          </View>
          <View className="h-16 w-full" />
          <SlideInView
            isActive={slideNum === Number(THIS_SLIDE_KEY) - 1}
            delay={500}
            from="right"
          >
            <View className="w-full items-center">
              <DistortionPill
                title={"Fortune telling"}
                checked
                customColor={"#D46A6A"}
              />
            </View>
          </SlideInView>
        </View>
      </View>
    </View>
  );
};

export default Onboarding_Feat_CDA_1;
