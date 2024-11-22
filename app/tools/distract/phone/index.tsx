import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Frame from "@/components/Frame";
import AdvanceButton from "@/components/AdvanceButton";
import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { Linking } from "react-native";
import { useFocusEffect } from "expo-router";
import { dbName } from "@/db/service";

const Phone = () => {
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
      console.log("no data found");
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
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <BackButton />
      <Frame>
        <View className="mx-8 my-4">
          <Text className="text-center text-2xl font-bold">
            Phone to someone close
          </Text>
          <View className="mx-8 my-16 justify-center">
            {phoneData && (
              <React.Fragment>
                <Text>Your chosen contact is:</Text>
                <View className="h-32 bg-slate-200">
                  <Text className="m-2 text-center text-xl">
                    {" "}
                    {phoneData.name}
                  </Text>
                  <Text className="m-4 text-center text-lg">
                    {phoneData.phone}
                  </Text>
                </View>
              </React.Fragment>
            )}
          </View>
        </View>
      </Frame>
      {phoneData ? (
        <React.Fragment>
          <AdvanceButton
            className="bottom-8 m-2 mx-auto w-1/2"
            title="Call"
            onPress={() => callContact(phoneData.phone)}
          />
          <AdvanceButton
            className="bottom-8 m-2 mx-auto w-1/4"
            title="Change contact"
            onPress={() => router.navigate("./add")}
          />
        </React.Fragment>
      ) : (
        <AdvanceButton
          className="bottom-8 mx-auto"
          title="Add contact"
          onPress={() => router.navigate("./add")}
        />
      )}
    </React.Fragment>
  );
};

export default Phone;
