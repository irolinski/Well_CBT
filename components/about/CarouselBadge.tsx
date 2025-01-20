import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

const CarouselBadge = ({ image, index }: { image: Image; index: number }) => {
  return (
    <View
      className="absolute bottom-0 z-20 h-40 w-40 rounded-full"
      //   style={{
      //     opacity: 0.5,
      //     transform: [{ translateX: "100%" }, { scale: 0.66 }],
      //   }}
    >
      <Image className="h-full w-full" source={image}></Image>
    </View>
  );
};

export default CarouselBadge;
