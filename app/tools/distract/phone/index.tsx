import { Href, router, useFocusEffect } from "expo-router";
import React from "react";
import { Dimensions, Linking, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "@/components/BackButton";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import { getPhoneData } from "@/db/tools";
import {
  setShowModal,
  setSupportContact,
} from "@/state/features/tools/phoneSlice";
import { AppDispatch, RootState } from "@/state/store";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ConversationModal from "./modal";
import PhoneFriendProfilePic from "./ProfilePic";

const Phone = () => {
  const windowHeight = Dimensions.get("window").height;

  const dispatch = useDispatch<AppDispatch>();
  const phoneState = useSelector((state: RootState) => state.phone);

  const handleGetPhoneData = async () => {
    const phoneData = await getPhoneData();
    if (phoneData) {
      dispatch(setSupportContact(phoneData[0]));
    }
  };

  useFocusEffect(() => {
    handleGetPhoneData();
  });

  const callContact = (phone: string) => {
    const num = encodeURIComponent(phone.replace(/-/g, "").replace(/\s/g, ""));
    try {
      Linking.openURL(`tel://${num}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <View
        className={`z-10 mx-6 ${windowHeight > 750 ? "top-20" : "top-12"} flex-row justify-between`}
      >
        <BackButton />
        {phoneState.supportContact && (
          <TouchableOpacity
            onPress={() => router.replace("tools/distract/phone/add" as Href)}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={26}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        className={`mx-6 ${windowHeight > 750 ? "top-24" : "top-16"}`}
        style={{
          height: windowHeight - windowHeight / 5,
        }}
      >
        <View className="mb-8">
          <ToolHeader>Phone a friend</ToolHeader>
        </View>
        <View
          className="rounded-3xl border"
          style={{ height: windowHeight / 1.6, borderColor: "#B8B8B8" }}
        >
          <View className="mt-4">
            <PhoneFriendProfilePic />
          </View>
          <View className="mx-4 justify-end" style={{ height: "20%" }}>
            <Text className="text-center text-2xl font-semibold">
              You don't have a chosen contact yet.
            </Text>
          </View>
          <View
            className="mx-4 flex-row items-center justify-center"
            style={{ height: "35%" }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="mx-8 items-center justify-center rounded-full"
              style={{
                width: windowHeight / 10,
                height: windowHeight / 10,
                backgroundColor: "#81C784",
                opacity: !phoneState.supportContact ? 0.5 : 1,
              }}
              onPress={() => callContact(phoneState.supportContact!.phone)}
              disabled={!phoneState.supportContact}
            >
              <AntDesign name="phone" size={24} color="#FBFBFB" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className="mx-8 items-center justify-center rounded-full"
              style={{
                width: windowHeight / 10,
                height: windowHeight / 10,
                backgroundColor: "#4391BC",
                opacity: !phoneState.supportContact ? 0.5 : 1,
              }}
              disabled={!phoneState.supportContact}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="my-4 h-12 flex-row items-center justify-center rounded-xl"
            style={[
              {
                backgroundColor: "#4391BC",
                opacity: 8,
              },
            ]}
            onPress={() => router.replace("tools/distract/phone/add" as Href)}
          >
            <Text className="text-md mx-2" style={{ color: "#FBFBFB" }}>
              Add contact
            </Text>
            <View className="mx-2">
              <MaterialIcons
                name="person-add-alt-1"
                size={24}
                color="#FBFBFB"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="my-4 h-12 flex-row items-center justify-center rounded-xl border"
            style={[
              {
                borderColor: "#B8B8B8",
                backgroundColor: "#FBFBFB",
                opacity: 8,
              },
            ]}
            onPress={() => {
              dispatch(setShowModal(true));
            }}
          >
            <Text className="text-md mx-2" style={{ color: "#212529" }}>
              Conversation Topics
            </Text>
            <View className="mx-2">
              <MaterialCommunityIcons
                name="message-reply-text-outline"
                size={24}
                color="#212529"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ConversationModal />
    </React.Fragment>
  );
};

export default Phone;
