import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation, interpolate, SharedValue, useAnimatedStyle, withTiming
} from 'react-native-reanimated';
import { Colors } from '@/constants/styles/colorTheme';

type InfoSlideScreenPaginationProps = {
  data: any;
  x: SharedValue<number>;
  screenWidth: number;
};

export function InfoSlideScreenPagination({
  data,
  screenWidth,
  x,
}: InfoSlideScreenPaginationProps) {
  const totalSlides = data.length;
  const animatedTrackStyle = useAnimatedStyle(() => {
    const isLastSlide = x.value >= (totalSlides - 1) * screenWidth;
    const targetWidth = isLastSlide ? screenWidth * 0.5 : screenWidth * 0.65;

    return {
      width: withTiming(targetWidth, { duration: 150 }), // smooth animation
    };
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    const progressWidth = interpolate(
      x.value,
      [0, (totalSlides - 1) * screenWidth],
      [0, 1], // We’ll multiply this by track width in layout
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scaleX: progressWidth }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.progress, animatedProgressStyle]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  track: {
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: Colors.darkGray,
    borderRadius: 3,
    width: "100%", // Needed for scaleX to work
    transformOrigin: "left",
  },
});
