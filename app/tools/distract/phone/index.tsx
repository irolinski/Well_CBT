import { View, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackButton from "@/components/BackButton";
import { Href, router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { Linking } from "react-native";
import { useFocusEffect } from "expo-router";
import { dbName } from "@/db/service";
import ToolHeader from "@/components/ToolHeader";
import Text from "@/components/global/Text";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import PhoneFriendProfilePic from "./ProfilePic";

const Phone = () => {
  const windowHeight = Dimensions.get("window").height;

  type PhoneContact = { name: string; phone: string };
  const [phoneData, setPhoneData] = useState<PhoneContact | null>(null);

  const getPhoneData = async () => {
    const db = await SQLite.openDatabaseAsync(dbName);
    try {
      const pd: PhoneContact[] = await db.getAllAsync(
        "SELECT * FROM tools_phone",
      );
      setPhoneData(pd[0]);
    } catch (err) {
      console.error("no data found");
    }
  };

  useFocusEffect(() => {
    getPhoneData();
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
        {phoneData && (
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
              disabled={!phoneData}
              style={{
                width: windowHeight / 10,
                height: windowHeight / 10,
                backgroundColor: "#81C784",
                opacity: !phoneData ? 0.5 : 1,
              }}
              onPress={() => callContact(phoneData!.phone)}
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
                opacity: !phoneData ? 0.5 : 1,
              }}
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
        </View>
      </View>
    </React.Fragment>
  );
};

export default Phone;
