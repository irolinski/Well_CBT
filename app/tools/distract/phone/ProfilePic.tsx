import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  phoneFacePlaceholder,
  phoneFaces,
} from "@/assets/images/tools/phone/phoneFaces";

const PhoneFriendProfilePic = ({
  pictureURI,
}: {
  pictureURI: string | undefined;
}) => {
  const windowHeight = Dimensions.get("window").height;
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
    startSpinAnimation(); // Trigger animation on mount
  }, []);

  return (
    <Pressable onPress={startSpinAnimation}>
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
              style={{
                height: windowHeight / 4,
                width: windowHeight / 4,
                borderRadius: windowHeight / 8,
              }}
              source={pictureURI}
            />
          ) : (
            <Image
              style={{
                height: windowHeight / 4,
                width: windowHeight / 4,
                borderRadius: windowHeight / 8,
              }}
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

export default PhoneFriendProfilePic;
