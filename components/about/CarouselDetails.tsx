import React from "react";
import { Dimensions, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import Text from "../global/Text";

const CarouselDetails = ({
  title,
  description,
  index,
  selectedIndex,
}: {
  title: string;
  description: string;
  index: number;
  selectedIndex: number;
}) => {
  const windowHeight = Dimensions.get("window").height;
  const distanceFromSelectedIndex = index - selectedIndex;

  if (distanceFromSelectedIndex === 0) {
    return (
      <View
        className="absolute z-20 w-full items-center justify-center"
        style={{ top: 0.09 * windowHeight, height: 0.2 * windowHeight }}
      >
        <Text
          className="absolute top-0.5 px-12"
          style={{
            fontSize: 26,
            color: Colors.white,
            fontFamily: "Kodchasan",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        <Text
          className="my-4 w-80 px-10 text-center"
          style={{
            color: Colors.white,
            fontSize: windowHeight > 750 ? 16 : 14,
          }}
        >
          {description}
        </Text>
      </View>
    );
  }
};

export default CarouselDetails;
