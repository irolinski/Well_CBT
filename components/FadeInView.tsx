import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type FadeInViewProps = {
  children: React.ReactNode;
  isActive?: boolean;
  duration?: number;
  inputVal?: number;
  outputVal?: number;
};

const FadeInView = ({
  children,
  isActive = true,
  duration = 1500,
  inputVal = 0.5,
  outputVal = 1,
}: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(inputVal)).current;

  const fadeAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: outputVal,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    if (isActive) {
      fadeAnimation();
    }
  }, [isActive]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>
  );
};

export default FadeInView;
