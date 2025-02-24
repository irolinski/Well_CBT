import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";

type FadeInViewProps = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  isActive?: boolean;
  duration?: number;
  inputVal?: number;
  outputVal?: number;
  onFinish?: () => any;
};

const FadeInView = ({
  children,
  className,
  isActive = true,
  duration = 1500,
  inputVal = 0.5,
  outputVal = 1,
  style,
  onFinish,
}: FadeInViewProps) => {
  console.log(className);
  const fadeAnim = useRef(new Animated.Value(inputVal)).current;

  const fadeAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: outputVal,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(onFinish && onFinish);
  };

  useEffect(() => {
    if (isActive) {
      fadeAnimation();
    }
  }, [isActive]);

  return (
    <Animated.View className={className} style={[{ opacity: fadeAnim }, style]}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
