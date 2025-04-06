import { Image } from "expo-image";
import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { UnknownAction } from "@reduxjs/toolkit";

const ProfilePic = ({
  image,
  handlePress,
  buttonIcon,
}: {
  image: Image;
  handlePress?: () => UnknownAction;
  buttonIcon?: ReactNode;
}) => {
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={handlePress ? 0.6 : 1}
          onPress={() => {
            handlePress && handlePress();
          }}
        >
          <Image style={styles.image} source={image} />
        </TouchableOpacity>
      </View>
      {buttonIcon && (
        <TouchableOpacity
          className="absolute bottom-1 right-2 items-center justify-center rounded-full"
          style={{
            width: 44,
            height: 44,
            backgroundColor: Colors.lightGray,
          }}
          activeOpacity={handlePress ? 0.8 : 1}
          onPress={() => {
            handlePress && handlePress();
          }}
        >
          {buttonIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: SCREEN_HEIGHT / 5,
    width: SCREEN_HEIGHT / 5,
    borderRadius: SCREEN_HEIGHT / 8,
  },
});

export default ProfilePic;
