import BackButton from "@/components/BackButton";
import CustomButton from "@/components/CustomButton";
import Frame from "@/components/Frame";
import { cdaResetState, toggleSave } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import { router } from "expo-router";
import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import DistortionTag from "@/components/DistortionTag";
import * as SQLite from "expo-sqlite";

// import storage from "@/storage";

const Page_4 = () => {
  type CdaEntry = {
    situation: string;
    oldThought: string;
    distortion: string;
    newThought: string;
    date: string;
    id?: number;
  };

  const cdaState = useSelector((state: RootState) => state.cda);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    if (cdaState.save) {
      const db = await SQLite.openDatabaseAsync("databaseName");

      // First, create the table
      await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cdaArchive (
    situation VARCHAR(100) NOT NULL,
    oldThought VARCHAR(100) NOT NULL,
    distortion VARCHAR(35) NOT NULL,
    newThought VARCHAR(100) NOT NULL,
    date VARCHAR(20)
  );
`);

      // Then, insert data into the table
      await db.execAsync(`
    INSERT INTO cdaArchive (situation, oldThought, distortion, newThought, date)
    VALUES (
      '${cdaState.situation}',
      '${cdaState.oldThought}',
      '${cdaState.distortion}',
      '${cdaState.newThought}',
      '${new Date().toLocaleDateString()}'
    );
  `);
      console.log(await db.getAllAsync("SELECT * FROM cdaArchive"));
      dispatch(cdaResetState());
    }
  };

  return (
    <React.Fragment>
      <ScrollView>
        <BackButton />
        <Frame>
          <View className="py-8">
            <Text className="text-xl font-bold text-center">Overview </Text>

            <View className="my-4 mx-8">
              <View className="border-b">
                <Text className="text-center px-2 pb-2">
                  Here are your results. Try to think about them for a second.
                  Do you feel the new thought makes more sense?
                </Text>
              </View>
              <View>
                <Text className="text-lg font-bold my-4">
                  Distorted thought:
                </Text>
                <View className=" bg-gray-200  justify-center b">
                  <Text className="h-24 my-2 mx-4 text-lg text-center ">
                    {cdaState.oldThought}
                  </Text>
                </View>
              </View>
              <View>
                <View className="border-t mt-4 p-2">
                  <Text className="text-lg font-bold my-4">
                    Cognitive Distortion:
                  </Text>
                  <View className="w-3/4 px-4 mx-auto">
                    <DistortionTag title={cdaState.distortion} checked={true} />
                  </View>
                </View>
              </View>
              <View className="border-t mt-4">
                <Text className="text-lg font-bold my-4">
                  Rational thought:
                </Text>
                <View className=" bg-gray-200  justify-center b">
                  <Text className="h-24 my-2 mx-4 text-lg text-center ">
                    {cdaState.newThought}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row py-4 my-4">
                <Pressable onPress={() => dispatch(toggleSave())}>
                  <View className="w-6 h-6 bg-slate-300">
                    {cdaState.save && (
                      <Feather name="check" size={24} color="black" />
                    )}
                  </View>
                </Pressable>
                <Text className="text-lg text-center mx-4 my-1">
                  Save in journal
                </Text>
              </View>
            </View>
          </View>
        </Frame>
        {/* <CustomButton title="Save" onPress={() => handleSave()} /> */}
        <CustomButton
          containerStyles="bottom-8 mx-auto"
          title="Finish"
          onPress={() => {
            handleSave();
            router.replace("/");
          }}
        />
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_4;
