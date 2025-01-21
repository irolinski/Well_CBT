import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

const CarouselBadge = ({
  image,
  index,
  selectedIndex,
}: {
  image: Image;
  index: number;
  selectedIndex: number;
}) => {
  const distanceFromSelectedIndex = index - selectedIndex;

  return (
    <View
      className="absolute bottom-0 z-20 h-40 w-40 rounded-full"
      style={
        index === selectedIndex
          ? {}
          : {
              opacity: 0.5,
              transform: [
                {
                  translateX: `${100 * distanceFromSelectedIndex}%`,
                },
                { scale: 0.66 },
              ],
            }
      }
    >
      <Image className="h-full w-full" source={image}></Image>
    </View>
  );
};

export default CarouselBadge;
