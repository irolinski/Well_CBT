import { Image } from "expo-image";
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { phoneFaces } from "@/assets/images/tools/phone/phoneFaces";
import { setShowNavigateSettingsModal } from "@/state/features/menus/navigateSettingsModalSlice";
import { AppDispatch } from "@/state/store";
import { Feather } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;

const ProfilePic = ({ pictureURI }: { pictureURI: string | undefined }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [faceNumber, setFaceNumber] = useState(
    (Math.random() * (phoneFaces.length - 1)) | 0,
  );

  const handlePress = () => {
    dispatch(setShowNavigateSettingsModal(true));
  };

  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            handlePress();
          }}
        >
          {pictureURI ? (
            <Image style={styles.image} source={pictureURI} />
          ) : (
            <Image style={styles.image} source={phoneFaces[faceNumber]} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="absolute bottom-0 right-8 items-center justify-center rounded-full"
        style={{
          width: 44,
          height: 44,
          backgroundColor: "#E0E0E0",
        }}
        activeOpacity={0.8}
        onPress={() => {
          handlePress();
        }}
      >
        <Feather name="settings" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
