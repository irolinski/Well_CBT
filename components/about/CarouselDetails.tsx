import React from "react";
import { Dimensions, View } from "react-native";
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
        className="absolute z-20 w-full items-center"
        style={{ top: 0.1 * windowHeight }}
      >
        <Text
          className="px-12"
          style={{
            fontSize: 26,
            color: "#FFFFFF",
            fontFamily: "Kodchasan",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
        <Text
          className="my-2 px-10 text-center text-base"
          style={{ color: "#FFFFFF" }}
        >
          {description}
        </Text>
      </View>
    );
  }
};

export default CarouselDetails;
