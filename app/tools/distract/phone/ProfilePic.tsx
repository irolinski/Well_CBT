import React, { useEffect, useRef } from "react";
import { View, Animated, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";

const PhoneFriendProfilePic = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get("window").height;

  // Start the spin animation
  const startSpinAnimation = () => {
    spinValue.setValue(0); // Reset spin value
    Animated.spring(spinValue, {
      toValue: 1, // Spin once (360 degrees)
      friction: 4, // Spring friction for a smooth effect
      tension: 80, // Adjust spring tension
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startSpinAnimation(); // Trigger animation on mount
  }, []);

  // Interpolating spin value to create a 360° rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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
          <Image
            style={{
              height: windowHeight / 4,
              width: windowHeight / 4,
              borderRadius: windowHeight / 8,
            }}
            source={require("@/assets/images/tools/phone/face_placeholder.webp")}
          />
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default PhoneFriendProfilePic;
