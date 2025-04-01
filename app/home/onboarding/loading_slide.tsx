import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import onboardingImages from '@/assets/images/home/onboarding/images';
import FadeInView from '@/components/FadeInView';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_WIDTH } from '@/constants/styles/values';

const THIS_SLIDE_KEY = "5";
const IMAGE_EL_SIZE_PX = 100;

const Onboarding_LoadingSlide = ({
  onboardingSlideNum,
  onFinish,
}: {
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const [animationsFinished, setAnimationsFinished] = useState(false);
  const leaf_1_rotate_anim = useRef(new Animated.Value(0)).current;
  const loading_bar_anim = useRef(
    new Animated.Value(-SCREEN_WIDTH * 0.75),
  ).current;
  // Leaf swaying animation (looping)

  const leavesSwayingAnimation = () => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(leaf_1_rotate_anim, {
          toValue: 0.5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(leaf_1_rotate_anim, {
          toValue: -1.5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(leaf_1_rotate_anim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
  };

  const loadBarAnim = () => {
    return Animated.timing(loading_bar_anim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    if (onboardingSlideNum === Number(THIS_SLIDE_KEY) - 1) {
      leavesSwayingAnimation().start();
      loadBarAnim().start(() => {
        setAnimationsFinished(true);
      });
    }
  }, [onboardingSlideNum]);

  return (
    <FadeInView
      className="relative z-10 h-full w-full items-center"
      key={THIS_SLIDE_KEY}
      inputVal={1}
      outputVal={0}
      isActive={animationsFinished}
      onFinish={() => onFinish()}
    >
      <View className="h-3/4 w-full justify-center">
        <View className="flex-row justify-center">
          <View
            className="flex-row justify-center"
            style={{
              transform: [{ translateX: IMAGE_EL_SIZE_PX * 0.5 }], // Center the image set
            }}
          >
            <Image
              contentFit="contain"
              style={{
                width: IMAGE_EL_SIZE_PX,
                height: IMAGE_EL_SIZE_PX,
                transform: [{ translateX: 0.4 * IMAGE_EL_SIZE_PX }],
              }}
              source={onboardingImages.free_plant_stem}
            />
            <Animated.View
              style={{
                width: IMAGE_EL_SIZE_PX,
                height: IMAGE_EL_SIZE_PX,
                transform: [
                  { translateX: -IMAGE_EL_SIZE_PX / 2 }, // Move left to set pivot to right edge
                  {
                    rotate: leaf_1_rotate_anim.interpolate({
                      inputRange: [-1, 1],
                      outputRange: ["-2deg", "4deg"], // Small subtle sway
                    }),
                  },
                  { translateX: IMAGE_EL_SIZE_PX / 2 }, // Move it back
                ],
              }}
            >
              <Image
                contentFit="contain"
                style={{
                  width: IMAGE_EL_SIZE_PX,
                  height: IMAGE_EL_SIZE_PX,
                }}
                source={onboardingImages.free_plant_leaf_1}
              />
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  { translateX: -IMAGE_EL_SIZE_PX * 0.55 },
                  { translateY: 5 }, // Move left to set pivot to right edge
                  {
                    rotate: leaf_1_rotate_anim.interpolate({
                      inputRange: [-1, 1],
                      outputRange: ["2deg", "5deg"], // Small subtle sway
                    }),
                  },
                  { translateX: IMAGE_EL_SIZE_PX / 2 }, // Move it back
                ],
              }}
            >
              <Image
                contentFit="contain"
                style={{
                  width: IMAGE_EL_SIZE_PX,
                  height: IMAGE_EL_SIZE_PX,
                  transform: [{ translateX: -IMAGE_EL_SIZE_PX * 1.25 }],
                }}
                source={onboardingImages.free_plant_leaf_2}
              />
            </Animated.View>
          </View>
        </View>
        <Text
          className="mt-4 text-center text-2xl"
          style={{
            color: Colors.offWhite,
          }}
        >
          Preparing everything...
        </Text>
        <View className="flex-row justify-center">
          <View
            className="mt-16 h-1.5 overflow-hidden rounded-3xl"
            style={{
              width: SCREEN_WIDTH * 0.75,
              backgroundColor: Colors.offWhite,
            }}
          >
            <Animated.View
              className="absolute z-20 h-4 w-full"
              style={{
                backgroundColor: "#757575",
                transform: [{ translateX: loading_bar_anim }],
              }}
            />
          </View>
        </View>
      </View>
      <View className="h-1/2 justify-center">
        <View></View>
      </View>
    </FadeInView>
  );
};

export default Onboarding_LoadingSlide;
