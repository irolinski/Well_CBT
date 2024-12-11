import { Image } from "expo-image";
import React, { useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import Text from "@/components/global/Text";
import DividerLine from "@/components/DividerLine";
import { Feather } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";
import { learnImages } from "@/assets/images/learn/images";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const headerHeight = windowHeight * 0.4;

const DynamicHeader = ({ value }: any) => {
  const animateHeaderHeight = value.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: "clamp",
  });

  const animateImageFilter = value.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0.1, 0.8],
    extrapolate: "clamp",
  });
  const hideBackButton = value.interpolate({
    inputRange: [0, headerHeight - 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        className={`absolute z-10 mx-6 ${windowHeight > 750 ? "top-20" : "top-12"} left-4 flex-row justify-start`}
        style={{
          opacity: hideBackButton,
        }}
      >
        <BackButton color="#FBFBFB" />
      </Animated.View>
      <Animated.View
        style={{
          height: animateHeaderHeight,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          right: 0,
        }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          source={learnImages[0]}
        />
        <Animated.View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            position: "absolute",
            opacity: animateImageFilter,
          }}
        ></Animated.View>
      </Animated.View>
    </View>
  );
};

const ArticlePage = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: false,
    },
  );

  return (
    <View>
      {/* Page Header */}
      <DynamicHeader value={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        style={{ paddingTop: headerHeight }}
      >
        <View className="px-6" style={{ width: "100%" }}>
          {/* Article Header */}
          <View>
            <View className="mt-6 flex-row justify-between">
              <Text className="text-center text-base">Science</Text>
              <Text className="italic opacity-80">20 min read</Text>
            </View>
            <View className="mt-3.5 flex-row justify-center">
              <Text
                className="text-3xl"
                style={{ fontFamily: "KodchasanRegular", fontWeight: 400 }}
              >
                10 suprising benefits of breathwork
              </Text>
            </View>
            <View className="mt-4 flex-row justify-center">
              <Text className="italic opacity-80">
                How young millenial queens are rocking the Tesla-inspired
                post-slow-fashion movement
              </Text>
            </View>
          </View>
          {/* Article Body */}
          <View className="pt-6">
            {/* Single paragraph w/ header */}
            <View className="mt-3">
              <Text className="text-lg font-semibold">Header 1</Text>
              <Text className="m-3 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                laoreet gravida mauris nec pulvinar. Vivamus nec pulvinar odio.
                Duis venenatis gravida nunc, ac laoreet turpis tristique a.
                Vestibulum sagittis volutpat condimentum. Aliquam accumsan ex eu
                magna dignissim blandit. Sed odio tellus, tempor sed pharetra
                eu, tincidunt sit amet neque. Integer lobortis at mauris in
                elementum. Maecenas pulvinar aliquam molestie. Aliquam efficitur
                magna nec orci sollicitudin faucibus. Nullam ut accumsan eros.
                In vel nunc eu nibh condimentum ultricies. Pellentesque finibus
                orci eu arcu eleifend, vel scelerisque nunc gravida. Sed
                pulvinar porttitor dignissim. Maecenas nisi arcu, convallis eu
                viverra et, hendrerit ac quam.
              </Text>
            </View>
            <View className="mt-3">
              <Text className="text-lg font-semibold">Header 2</Text>
              <Text className="m-3 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                laoreet gravida mauris nec pulvinar. Vivamus nec pulvinar odio.
                Duis venenatis gravida nunc, ac laoreet turpis tristique a.
                Vestibulum sagittis volutpat condimentum. Aliquam accumsan ex eu
                magna dignissim blandit. Sed odio tellus, tempor sed pharetra
                eu, tincidunt sit amet neque. Integer lobortis at mauris in
                elementum. Maecenas pulvinar aliquam molestie. Aliquam efficitur
                magna nec orci sollicitudin faucibus. Nullam ut accumsan eros.
                In vel nunc eu nibh condimentum ultricies. Pellentesque finibus
                orci eu arcu eleifend, vel scelerisque nunc gravida. Sed
                pulvinar porttitor dignissim. Maecenas nisi arcu, convallis eu
                viverra et, hendrerit ac quam.
              </Text>
            </View>
            {/* optional image */}
            <View className="my-6 items-center">
              <View style={{ width: windowWidth * 0.8, height: 240 }}>
                <Image
                  className="rounded-lg"
                  style={{ width: "100%", height: "100%" }}
                  source={learnImages[1]}
                />
                <View className="flex-row justify-end">
                  <Text className="m-2 italic" style={{ color: "#B8B8B8" }}>
                    Subtitle
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="py-12">
            <DividerLine width={windowWidth * 0.65} />
          </View>
          <View className="mb-12">
            <View>
              <Text className="text-xl">Related Articles</Text>
            </View>
            <View className="my-4 items-center">
              <View
                className="rounded-2xl border px-4"
                style={{
                  width: "100%",
                  height: 140,
                  borderColor: "#B8B8B8",
                }}
              >
                <View className="h-full flex-row">
                  <View className="h-full w-2/5 justify-center">
                    <Image
                      className="h-24 w-24 rounded-xl"
                      source={learnImages[0]}
                    />
                  </View>
                  <View className="w-3/5">
                    <View className="py-5">
                      <View>
                        <Text className="text-base">
                          10 suprising benefits of breathwork
                        </Text>
                      </View>
                      <View className="mt-2 flex-row items-end justify-between">
                        <Text
                          className="mb-2 text-sm"
                          style={{ color: "#B8B8B8" }}
                        >
                          20 min read
                        </Text>
                        <View
                          className="items-center justify-center rounded-xl"
                          style={{
                            width: 70,
                            height: 45,
                            backgroundColor: "#FF997C",
                          }}
                        >
                          <Feather
                            name="arrow-right"
                            size={24}
                            color="#FFFFFF"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArticlePage;
