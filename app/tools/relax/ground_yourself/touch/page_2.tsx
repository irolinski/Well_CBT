import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import FadeInView from "@/components/FadeInView";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/TypewriterText";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";

const Ground_Touch_Page_2 = ({
  objKey,
  onButtonPress,
}: {
  objKey: number;
  onButtonPress: () => void;
}) => {
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const innerCircleAnim = useRef(new Animated.Value(0.55)).current;
  const [breatheState, setBreatheState] = useState<"in" | "out" | "hold">("in");
  const [instruction2IsActive, setInstruction2IsActive] = useState(false);

  const expandInnerCircleAnim = (duration: number) => {
    return Animated.timing(innerCircleAnim, {
      toValue: 0.95,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  };

  const shrinkInnerCircleAnim = (duration: number) => {
    return Animated.timing(innerCircleAnim, {
      toValue: 0.65,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    });
  };

  const animateinnerCircle = (duration: number) => {
    expandInnerCircleAnim(7000).start(() => {
      setBreatheState("hold");
      setTimeout(() => {
        shrinkInnerCircleAnim(7000).start(() => {
          setInstruction2IsActive(true);
        });
        setBreatheState("out");
      }, 5000);
    });
  };

  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey - 1) {
      setTimeout(() => {
        animateinnerCircle(7000);
      }, 2000);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <React.Fragment>
      <View
        className=""
        style={{
          paddingTop: SCREEN_HEIGHT > 750 ? SCREEN_HEIGHT * 0.05 : null,
        }}
      >
        <TypewriterText
          text="Ok, now take a deep breath"
          size={20}
          speed="very_fast"
          isActive={groundYourselfToolState.currentSlide === objKey - 1}
        />
        <FadeInView
          isActive={groundYourselfToolState.currentSlide === objKey - 1}
        >
          <View className="my-8 flex-row justify-center">
            <View
              className="h-56 w-56 rounded-full border"
              style={{
                height: SCREEN_HEIGHT * 0.275,
                width: SCREEN_HEIGHT * 0.275,
                borderColor: Colors.mainGray,
              }}
            >
              <View className="absolute h-full w-full flex-row items-center justify-center">
                <Text
                  className="z-10 text-2xl"
                  style={{ color: Colors.offWhite, fontFamily: "Kodchasan" }}
                >
                  {breatheState}
                </Text>
              </View>
              <Animated.View
                className="relative h-full w-full items-center justify-center rounded-full"
                style={{
                  backgroundColor: Colors.mainBlue,
                  transform: [{ scale: innerCircleAnim }],
                }}
              ></Animated.View>
            </View>
          </View>
        </FadeInView>
        <View className="mb-8">
          <FadeInView>
            <TypewriterText
              text="Now, place one of your hands firmly on one of your thighs."
              size={20}
              speed="very_fast"
              delaySeconds={1.5}
              isActive={instruction2IsActive}
            />
          </FadeInView>
        </View>
        <TypewriterText
          text="(you may also use a surface on which you're sitting if that's what you prefer)"
          color={Colors.darkGray}
          size={14}
          speed="very_fast"
          delaySeconds={4}
          isActive={instruction2IsActive}
        />
        <View
          className="w-full flex-row justify-center"
          style={{ top: SCREEN_HEIGHT * 0.05 }}
        >
          <TouchableOpacity
            className="flex-row justify-center"
            onPress={() => onButtonPress()}
          >
            <Feather
              name="arrow-right-circle"
              size={48}
              color={Colors.mainGray}
            />
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Ground_Touch_Page_2;
