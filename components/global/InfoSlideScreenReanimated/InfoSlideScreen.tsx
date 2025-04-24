import React, { ReactNode } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Text from "@/components/global/Text";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/styles/values";
import { InfoSlideScreenButton } from "./InfoSlideScreenButton";
import { InfoSlideScreenPagination } from "./InfoSlideScreenPagination";

export type InfoSlideScreenData = {
  id: number;
  visualItems: ReactNode;
  visualPart?: ReactNode;
  title?: string;
  text?: string;
  orientation?: "text_bottom" | "text_top";
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
  //set default orientation
  let orientation = "text_bottom";
  if (item.orientation) {
    orientation = item.orientation;
  } else if (!item.text && !item.title) {
    orientation = "text_top";
  }

  const visualItemsAnimatedStyle = useAnimatedStyle(() => {
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
      width: SCREEN_WIDTH * 0.95,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <React.Fragment>
      {orientation === "text_bottom" ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.itemContainer,
            {
              width: SCREEN_WIDTH,
              justifyContent: item.text && item.title ? "center" : "flex-start",
            },
          ]}
        >
          <Animated.View
            style={[
              visualItemsAnimatedStyle,
              {
                height:
                  item.text && item.title
                    ? SCREEN_WIDTH * 0.8
                    : SCREEN_HEIGHT * 0.8,
              },
            ]}
          >
            {item.visualItems}
          </Animated.View>
          {item.title && item.text ? (
            <Animated.View style={textAnimatedStyle}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemText}>{item.text}</Text>
            </Animated.View>
          ) : (
            item.visualPart
          )}
        </ScrollView>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            styles.itemContainer,
            {
              width: SCREEN_WIDTH,
              paddingTop: SCREEN_HEIGHT * 0.15,
              alignItems: "center",
            },
          ]}
        >
          {item.title && item.text ? (
            <Animated.View style={[textAnimatedStyle]}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemText}>{item.text}</Text>
            </Animated.View>
          ) : (
            item.visualPart
          )}
          <Animated.View style={[visualItemsAnimatedStyle]}>
            {item.visualItems}
          </Animated.View>
        </ScrollView>
      )}
    </React.Fragment>
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
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemTitle: {
    color: Colors.offWhite,
    fontSize: 24,
    fontFamily: "KodchasanBold",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
    width: "95%",
  },
  itemText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Inter",
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
