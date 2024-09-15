import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Frame from "@/components/Frame";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import { Linking } from "react-native";

const Phone = () => {
  type PhoneContact = { name: string; phone: string };
  const [phoneData, setPhoneData] = useState<PhoneContact | null>(null);

  useEffect(() => {
    const getPhoneData = async () => {
      const db = await SQLite.openDatabaseAsync("well-test-db");
      try {
        const pd: PhoneContact[] = await db.getAllAsync(
          "SELECT * FROM tools_phone"
        );
        setPhoneData(pd[0]);
      } catch (err) {
        console.log("no data found");
      }
    };

    getPhoneData();
  }, []);

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
        <View className="my-4 mx-8">
          <Text className="text-2xl font-bold text-center">
            Phone to someone close
          </Text>
          <View className="my-16 justify-center mx-8 ">
            {phoneData && (
              <React.Fragment>
                <Text>Your chosen contact is:</Text>
                <View className="h-32 bg-slate-200">
                  <Text className="text-xl text-center m-2">
                    {" "}
                    {phoneData.name}
                  </Text>
                  <Text className="text-lg text-center m-4">
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
          <CustomButton
            containerStyles="bottom-8 w-1/2 mx-auto m-2"
            title="Call"
            onPress={() => callContact(phoneData.phone)}
          />
          <CustomButton
            containerStyles="bottom-8 mx-auto w-1/4 m-2"
            title="Change contact"
            onPress={() => router.navigate("./add")}
          />
        </React.Fragment>
      ) : (
        <CustomButton
          containerStyles="bottom-8 mx-auto"
          title="Add contact"
          onPress={() => router.navigate("./add")}
        />
      )}
    </React.Fragment>
  );
};

export default Phone;
