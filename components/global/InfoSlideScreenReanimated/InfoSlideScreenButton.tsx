import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, {
  AnimatedRef,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/styles/colorTheme";
import { Feather } from "@expo/vector-icons";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type InfoInfoSlideScreenButtonProps = {
  flatListRef: AnimatedRef<FlatList>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  text: string;
  onFinish?: () => void;
};

export function InfoSlideScreenButton({
  dataLength,
  flatListIndex,
  flatListRef,
  text,
  onFinish,
}: InfoInfoSlideScreenButtonProps) {
  const buttonOpacity = useSharedValue(1);

  const InfoSlideScreenButtonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;

    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
      opacity: buttonOpacity.value,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;

    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastScreen ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;

    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;

    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      onFinish && onFinish();
    }
  };

  return (
    <AnimatedPressable
      onPressIn={() => {
        buttonOpacity.value = withTiming(0.75, { duration: 100 });
      }}
      onPressOut={() => {
        buttonOpacity.value = withTiming(1, { duration: 100 });
      }}
      onPress={handleNextScreen}
      style={[styles.container, InfoSlideScreenButtonAnimationStyle]}
    >
      <Animated.Text
        style={[styles.text, textAnimationStyle, { textAlign: "center" }]}
      >
        {text}
      </Animated.Text>

      <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
        <Feather name="arrow-right" size={30} color={Colors.offWhite} />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.carrotOrange,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  text: {
    position: "absolute",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    color: Colors.offWhite,
  },
});
