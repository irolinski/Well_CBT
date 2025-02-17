import React from 'react';
import { View } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';
import Text from '../global/Text';

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
  const distanceFromSelectedIndex = index - selectedIndex;

  if (distanceFromSelectedIndex === 0) {
    return (
      <View
        className="absolute z-20 w-full items-center justify-center"
        style={{ top: 0.09 * SCREEN_HEIGHT, height: 0.2 * SCREEN_HEIGHT }}
      >
        <View className="absolute top-0">
          <Text
            className="mb-3 px-12"
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
            className="w-80 px-10 text-center"
            style={{
              color: Colors.white,
              fontSize: SCREEN_HEIGHT > 750 ? 16 : 14,
            }}
          >
            {description}
          </Text>
        </View>
      </View>
    );
  }
};

export default CarouselDetails;
