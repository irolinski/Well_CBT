import { router } from "expo-router";
import * as SQLite from "expo-sqlite";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import DistortionPill from "@/components/DistortionPill";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import ToolHeader from "@/components/ToolHeader";
import ToolNav from "@/components/ToolNav";
import { cdaResetState, toggleSave } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import Feather from "@expo/vector-icons/Feather";

const Page_4 = () => {
  const cdaState = useSelector((state: RootState) => state.cda);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    if (cdaState.save) {
      const db = await SQLite.openDatabaseAsync("well-test-db");

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
    }
    dispatch(cdaResetState());
  };

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={4} numOfAllPages={5} />
        <Frame>
          <View className="py-10">
            <ToolHeader>
              Here are your results. Try to meditate on them for a second.
            </ToolHeader>
            <View className="my-8 ">
              <View>
                <Text>Distorted thought: </Text>
                <View
                  className="bg-gray-200 justify-center rounded-lg border mt-4"
                  style={{ borderColor: "#4391BC" }}
                >
                  <Text className="h-28 my-2 mx-4 text-lg text-center ">
                    {cdaState.oldThought}
                  </Text>
                </View>
              </View>
              <View
                className="my-8 py-7 border-t border-b px-2"
                style={{ borderColor: "#D9D9D9" }}
              >
                <Text>Cognitive Distortion:</Text>
                <View className="w-3/4 mt-4 px-4 mx-auto">
                  <DistortionPill title={cdaState.distortion} checked={true} />
                </View>
              </View>
              <View className="mt-4">
                <Text>Rational thought:</Text>
                <View
                  className="bg-gray-200 justify-center rounded-lg border mt-4"
                  style={{ borderColor: "#4391BC" }}
                >
                  <Text className="h-24 my-2 mx-4 text-lg text-center ">
                    {cdaState.newThought}
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => dispatch(toggleSave())}>
                <View className="flex flex-row pt-4 mt-10 mx-2">
                  <View
                    className="w-6 h-6 border rounded-md "
                    style={{
                      borderColor: "#4391BC",
                      backgroundColor: cdaState.save
                        ? "#8DBED8"
                        : "transparent",
                    }}
                  >
                    {cdaState.save && (
                      <View className="mx-auto">
                        <Feather name="check" size={22} color="#F7F7F7" />
                      </View>
                    )}
                  </View>
                  <Text
                    className="text-md text-center mx-4 my-1"
                    style={{ color: "#4391BC" }}
                  >
                    Save to journal?
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Frame>
        <AdvanceButton
          containerStyles="bottom-8 mb-4 mx-6 justify-center"
          title="Finish"
          onPress={() => {
            handleSave();
            router.navigate("./page_finish");
          }}
        />
      </ScrollView>
    </React.Fragment>
  );
};
export default Page_4;
