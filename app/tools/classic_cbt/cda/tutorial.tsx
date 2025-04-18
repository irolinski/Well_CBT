import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';
import InfoSlideScreen, {
    InfoSlideScreenData
} from '@/components/global/InfoSlideScreenReanimated/InfoSlideScreen';

const CDA_Tutorial = () => {
  const exampleData: InfoSlideScreenData[] = [
    {
      id: 1,
      imagePart: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{ width: 100, height: 100 }}
            source={require(
              `@/assets/images/tools/cda/tutorial/tangled_thought.webp`,
            )}
          />
        </View>
      ),
    },
    {
      id: 2,
      imagePart: (
        <View className="h-full items-center justify-center">
          <Image
            contentFit="contain"
            style={{ width: 200, height: 125 }}
            source={require(
              `@/assets/images/tools/cda/tutorial/tangled_thought.webp`,
            )}
          />
        </View>
      ),
      title: "Lorem Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      imagePart: (
        <View className="h-full items-center justify-center">
          <Image
            contentFit="contain"
            style={{ width: 200, height: 125 }}
            source={require(
              `@/assets/images/tools/cda/tutorial/tangled_thought.webp`,
            )}
          />
        </View>
      ),
      title: "Lorem Ipsum",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <React.Fragment>
      <InfoSlideScreen slideData={exampleData} />
    </React.Fragment>
  );
};

export default CDA_Tutorial;
