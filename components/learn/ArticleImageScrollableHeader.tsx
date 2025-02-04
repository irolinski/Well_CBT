import { Image } from "expo-image";
import { Animated, Dimensions, View } from "react-native";
import BackButton from "@/components/BackButton";
import { Colors } from "@/constants/styles/colorTheme";
import { handleAddFinishedArticle } from "@/db/learn";

type ArticleImageScrollableHeaderTypes = {
  value: any;
  headerHeight: number;
  image: Image;
  id: number;
};

const ArticleImageScrollableHeader = ({
  value,
  headerHeight,
  image,
  id,
}: ArticleImageScrollableHeaderTypes) => {
  const windowHeight = Dimensions.get("window").height;

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
  const hideNav = value.interpolate({
    inputRange: [0, headerHeight - 200],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View>
      <Animated.View
        className={`absolute z-10 mx-6 ${windowHeight > 750 ? "top-20" : "top-12"} left-4 flex-row justify-start`}
        style={{
          opacity: hideNav,
        }}
      >
        <BackButton
          color={Colors.offWhite}
          handleBackButtonPress={() => handleAddFinishedArticle(id)}
        />
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
          source={image}
          cachePolicy="memory" // necessary to prevent image flicker onScroll
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

export default ArticleImageScrollableHeader;
