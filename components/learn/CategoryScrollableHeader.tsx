import { Image } from "expo-image";
import { Animated, ColorValue, Dimensions, View } from "react-native";
import Text from "../global/Text";
import MenuNav from "../global/MenuNav";
import { LinearGradient } from "expo-linear-gradient";

type CategoryScrollableHeaderTypes = {
  title: string;
  color: ColorValue;
  description: string;
  value: any;
  headerHeight: number;
  image: Image;
};

const CategoryScrollableHeader = ({
  title,
  color,
  description,
  value,
  headerHeight,
  image,
}: CategoryScrollableHeaderTypes) => {
  const windowHeight = Dimensions.get("window").height;

  const animateHeaderHeight = value.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: "clamp",
  });

  const animateImageFilter = value.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0.5, 0.9],
    extrapolate: "clamp",
  });
  const hideNav = value.interpolate({
    inputRange: [0, headerHeight - 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        className={`absolute top-2 z-30 flex-row`} //idk why top-2 works here but it does
        style={{ opacity: hideNav }}
      >
        <MenuNav name="Learn" backgroundColor="transparent" />
      </Animated.View>
      <Animated.View
        style={{
          width: "100%",
          height: animateHeaderHeight,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        {/* Text */}
        <Animated.View className="z-30" style={{ opacity: hideNav }}>
          <View
            className="flex-row justify-center"
            style={{ marginTop: windowHeight * 0.03 }}
          >
            <Text className="text-center text-lg" style={{ color: "#FFFFFF" }}>
              Category
            </Text>
          </View>
          <View className="mt-3 flex-row justify-center">
            <Text
              className="px-8 text-center text-4xl"
              style={{
                fontFamily: "KodchasanRegular",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              {title}
            </Text>
          </View>
          <View className="mt-7 flex-row justify-center">
            <Text
              className="mx-10 text-center text-base italic"
              style={{ color: "#FFFFFF" }}
            >
              {description}
            </Text>
          </View>
        </Animated.View>
        {/* /Text */}
         {/* <LinearGradient
          colors={[`${String(color)}`, `rgba(0, 0, 0, 0.65)`]}
          start={[0, 0]}
          end={[0, 0.5]}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 10,
          }}
        ></LinearGradient>  */}
        {/* Design required gradient HERE but it slowed down performance */}
        <Image
          style={{ width: "100%", height: "100%" }}
          className="absolute h-full w-full"
          source={image}
          cachePolicy="memory" // necessary to prevent image flicker onScroll
        />
        {/* <Animated.View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            position: "absolute",
            opacity: animateImageFilter,
            zIndex: 20,
          }}
        ></Animated.View> */}
      </Animated.View>
    </View>
  );
};

export default CategoryScrollableHeader;


