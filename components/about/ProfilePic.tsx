import { Image } from "expo-image";
import React, { ReactNode, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { allFaces } from "@/assets/images/global/faces/faces";
import { UnknownAction } from "@reduxjs/toolkit";

const windowHeight = Dimensions.get("window").height;

const ProfilePic = ({
  image,
  handlePress,
  buttonIcon,
}: {
  image: Image;
  handlePress?: () => UnknownAction;
  buttonIcon?: ReactNode;
}) => {
  const [faceNumber, setFaceNumber] = useState(
    (Math.random() * (allFaces.length - 1)) | 0,
  );

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
            backgroundColor: "#E0E0E0",
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
    height: windowHeight / 5,
    width: windowHeight / 5,
    borderRadius: windowHeight / 8,
  },
});

export default ProfilePic;
