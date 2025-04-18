import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation, interpolate, SharedValue, useAnimatedStyle
} from 'react-native-reanimated';
import { Colors } from '@/constants/styles/colorTheme';

type InfoSlideScreenPaginationCompProps = {
  index: number;
  x: SharedValue<number>;
  screenWidth: number;
};

const InfoSlideScreenPaginationComp = ({
  index,
  x,
  screenWidth,
}: InfoSlideScreenPaginationCompProps) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [10, 20, 10],
      Extrapolation.CLAMP,
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

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
  return (
    <View style={styles.container}>
      {data.map((item: any, index: number) => (
        <InfoSlideScreenPaginationComp
          key={item.id}
          index={index}
          x={x}
          screenWidth={screenWidth}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.darkGray,
    marginHorizontal: 10,
  },
});
