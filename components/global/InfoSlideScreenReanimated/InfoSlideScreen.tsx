import { ReactNode } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View, ViewToken } from 'react-native';
import Animated, {
    Extrapolation, interpolate, SharedValue, useAnimatedRef, useAnimatedScrollHandler,
    useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import Text from '@/components/global/Text';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants/styles/values';
import { InfoSlideScreenButton } from './InfoSlideScreenButton';
import { InfoSlideScreenPagination } from './InfoSlideScreenPagination';

export type InfoSlideScreenData = {
  id: number;
  imagePart: ReactNode;
  title?: string;
  text?: string;
};

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: InfoSlideScreenData;
  index: number;
  x: SharedValue<number>;
}) => {
  const imagePartAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP,
    );

    return {
      width: SCREEN_WIDTH * 0.8,
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP,
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View
      style={[
        styles.itemContainer,
        {
          width: SCREEN_WIDTH,
          justifyContent: item.text && item.title ? "center" : "flex-start",
        },
      ]}
    >
      <Animated.View
        style={[
          imagePartAnimatedStyle,
          {
            height:
              item.text && item.title
                ? SCREEN_WIDTH * 0.8
                : SCREEN_HEIGHT * 0.8,
          },
        ]}
      >
        {item.imagePart}
      </Animated.View>
      {item.title && item.text && (
        <Animated.View style={textAnimatedStyle}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemText}>{item.text}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const InfoSlideScreen = ({
  slideData,
}: {
  slideData: InfoSlideScreenData[];
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList>();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slideData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={styles.footerContainer}>
        <InfoSlideScreenPagination
          data={slideData}
          screenWidth={SCREEN_WIDTH}
          x={x}
        />

        <InfoSlideScreenButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={slideData.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBlue,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Colors.mainBlue,
    alignItems: "center",
    // justifyContent: "space-around",
  },
  itemTitle: {
    color: Colors.offWhite,
    fontSize: 26,
    fontFamily: "Kodchasan",

    fontWeight: 700,
    textAlign: "center",
    marginBottom: 10,
  },
  itemText: {
    color: Colors.white,
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 30,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
});

export default InfoSlideScreen;
