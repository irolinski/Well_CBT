import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { phoneFacePlaceholder, phoneFaces } from '@/assets/images/tools/phone/phoneFaces';
import { RootState } from '@/state/store';

const windowHeight = Dimensions.get("window").height;

const ProfilePic = ({
  pictureURI,
  nonSpinnable,
  location,
}: {
  pictureURI: string | undefined;
  nonSpinnable?: boolean;
  location: "phone" | "about";
}) => {
  const phoneState = useSelector((state: RootState) => state.phone);

  const [faceNumber, setFaceNumber] = useState(
    (Math.random() * (phoneFaces.length - 1)) | 0,
  );

  // animation code
  const spinValue = useRef(new Animated.Value(0)).current;

  // Start the spin animation
  const startSpinAnimation = () => {
    if (!pictureURI) {
      spinValue.setValue(0); // Reset spin value
      Animated.spring(spinValue, {
        toValue: 1, // Spin once (360 degrees)
        friction: 4, // friction for a smooth effect
        tension: 80,
        useNativeDriver: true,
      }).start();
    }
  };

  // Interpolating spin value to create a 360° rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    !nonSpinnable && startSpinAnimation(); // Trigger animation on mount
  }, []);

  return (
    <Pressable onPress={!nonSpinnable ? startSpinAnimation : null}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={{
            transform: [{ rotate: spin }], // Spin around its center
          }}
        >
          {pictureURI ? (
            <Image
              style={[
                location === "phone" && styles.imagePhone,
                location === "about" && styles.imageAbout,
              ]}
              source={pictureURI}
            />
          ) : (
            <Image
              style={[
                location === "phone" && styles.imagePhone,
                location === "about" && styles.imageAbout,
              ]}
              source={
                !phoneState ? phoneFacePlaceholder : phoneFaces[faceNumber]
              }
            />
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imagePhone: {
    height: windowHeight / 4,
    width: windowHeight / 4,
    borderRadius: windowHeight / 8,
  },
  imageAbout: {
    height: windowHeight / 5,
    width: windowHeight / 5,
    borderRadius: windowHeight / 8,
  },
});

export default ProfilePic;
