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
// import { cdaResetState, toggleSave } from "@/state/features/tools/cdaSlice";
import { AppDispatch, RootState } from "@/state/store";
import Feather from "@expo/vector-icons/Feather";
import CDATextBox from "@/components/tools/CDATextBox";
import emotionList from "@/constants/models/journal_emotionList";

const Log_5 = () => {
  const journalState = useSelector((state: RootState) => state.journal);
  const dispatch = useDispatch<AppDispatch>();

  // const handleSave = async () => {
  //   if (cdaState.save) {
  //     const db = await SQLite.openDatabaseAsync("well-test-db");

  //     // First, create the table
  //     await db.execAsync(`
  //       CREATE TABLE IF NOT EXISTS cdaArchive (
  //         situation VARCHAR(100) NOT NULL,
  //         oldThought VARCHAR(100) NOT NULL,
  //         distortion VARCHAR(35) NOT NULL,
  //         newThought VARCHAR(100) NOT NULL,
  //         date VARCHAR(20)
  //       );
  //     `);
  //     // Then, insert data into the table
  //     await db.execAsync(`
  //       INSERT INTO cdaArchive (situation, oldThought, distortion, newThought, date)
  //         VALUES (
  //           '${cdaState.situation}',
  //           '${cdaState.oldThought}',
  //           '${cdaState.distortion}',
  //           '${cdaState.newThought}',
  //           '${new Date().toLocaleDateString()}'
  //         );
  //     `);
  //     console.log(await db.getAllAsync("SELECT * FROM cdaArchive"));
  //   }
  //   dispatch(cdaResetState());
  // };

  const handleSave = () => {
    console.log("handling save");
  };

  console.log(emotionList.filter((e) => e.name === "Relaxed")[0].color);

  return (
    <React.Fragment>
      <ScrollView>
        <ToolNav currentPage={5} numOfAllPages={6} />
        <Frame>
          <View className="py-10">
            <ToolHeader>Overview </ToolHeader>
            <View className="my-8">
              <View>
                <Text>Mood rating: </Text>
                <Text>{journalState.moodValue}</Text>
              </View>
              <View
                className="my-8 border-b border-t px-2 py-7"
                style={{ borderColor: "#D9D9D9" }}
              >
                <Text>Emotions:</Text>
                <View className="mx-auto mt-4 w-3/4 flex-row flex-wrap px-4">
                  {journalState.emotions.map((e, index) => (
                    // <DistortionPill
                    //   // title={e}
                    //   // customColor={`${emotionList.filter((el) => el.name === e)[0].color}`}
                    //   checked={true}
                    //   key={index}
                    // />
                    <Text>Hello world!</Text>
                  ))}
                </View>
              </View>
              <View className="mt-4">
                <Text>Note:</Text>
                <CDATextBox textContent={journalState.note} />
              </View>
              {/* <Pressable onPress={() => dispatch(toggleSave())}> */}
              <View className="mx-2 mt-10 flex flex-row pt-4">
                <View
                  className="h-6 w-6 rounded-md border"
                  style={{
                    borderColor: "#4391BC",
                    backgroundColor: journalState.save
                      ? "#8DBED8"
                      : "transparent",
                  }}
                >
                  {journalState.save && (
                    <View className="mx-auto">
                      <Feather name="check" size={22} color="#F7F7F7" />
                    </View>
                  )}
                </View>
                <Text
                  className="text-md mx-4 my-1 text-center"
                  style={{ color: "#4391BC" }}
                >
                  Save to journal?
                </Text>
              </View>
              {/* </Pressable> */}
            </View>
          </View>
        </Frame>
        <AdvanceButton
          className="bottom-8 mx-6 mb-4 justify-center"
          title="Finish"
          onPress={() => {
            handleSave();
            router.navigate("./log_finish");
          }}
        />
      </ScrollView>
    </React.Fragment>
  );
};
export default Log_5;
