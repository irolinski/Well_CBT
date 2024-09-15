import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Frame from "@/components/Frame";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import * as SQLite from "expo-sqlite";

const Phone = () => {
  type PhoneContact = { name: string; phone: string };
  const [phoneData, setPhoneData] = useState<PhoneContact | null>(null);

  useEffect(() => {
    const getPhoneData = async () => {
      const db = await SQLite.openDatabaseAsync("well-test-db");
      try {
        const pd: PhoneContact = (await db.getAllAsync(
          "SELECT phone FROM tools-data"
        )) as unknown as PhoneContact;
        console.log(pd);
        setPhoneData(pd);
      } catch (err) {
        console.log("no data found");
      }
    };

    getPhoneData();
  }, []);

  return (
    <React.Fragment>
      <BackButton />
      <Frame>
        <View className="my-4 mx-8">
          <Text className="text-2xl font-bold text-center">
            Phone to someone close
          </Text>
          <View className="my-16 justify-center mx-8 ">
            {/* <Text className="text-lg font-bold">Header</Text> */}
            {/* <Text className="text-sm my-12">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
              pariatur perferendis inventore porro quasi quidem dignissimos eos
              velit fugiat at quibusdam perspiciatis, dicta qui asperiores
              sapiente deleniti harum, distinctio ea.
            </Text> */}
          </View>
        </View>
      </Frame>
      {!phoneData && (
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
