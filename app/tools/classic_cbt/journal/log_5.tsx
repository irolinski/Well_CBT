import { router } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AdvanceButton from '@/components/AdvanceButton';
import DistortionPill from '@/components/DistortionPill';
import Frame from '@/components/Frame';
import Text from '@/components/global/Text';
import ToolHeader from '@/components/ToolHeader';
import ToolNav from '@/components/ToolNav';
import CDATextBox from '@/components/tools/CDATextBox';
import { moodValueTitles } from '@/constants/models/journal';
import { journalResetState, toggleSave } from '@/state/features/tools/journalSlice';
import { AppDispatch, RootState } from '@/state/store';
import Feather from '@expo/vector-icons/Feather';
import { Slider } from '@miblanchard/react-native-slider';

const Log_5 = () => {
  //tool state
  const dispatch = useDispatch<AppDispatch>();
  const journalState = useSelector((state: RootState) => state.journal);

  const handleSave = async () => {
    if (journalState.save) {
      try {
        const db = await SQLite.openDatabaseAsync("well-test-db");

        // First, create the tables in separate calls
        await db.execAsync(`
              CREATE TABLE IF NOT EXISTS journalEntries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                moodValue INT NOT NULL,
                note VARCHAR(200),
                date VARCHAR(20)
              );
            `);

        await db.execAsync(`
              CREATE TABLE IF NOT EXISTS journalEntryEmotions (
                entryId INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                strength INT NOT NULL
              );
            `);

        // Insert data into the journal table
        // and save id to use it for joint emotion table
        const insertIntoJournalResult = await db.runAsync(`
              INSERT INTO journalEntries (id, moodValue, note, date) VALUES (
                NULL, ${journalState.moodValue}, '${journalState.note}', '${new Date().toLocaleDateString()}'
              );
            `);

        // Save emotions in joint table
        if (journalState.emotions.length > 0) {
          let query = `INSERT INTO journalEntryEmotions (entryId, name, strength) VALUES `;
          journalState.emotions.forEach((e) => {
            query += `(${insertIntoJournalResult.lastInsertRowId}, '${e.name}', ${e.strength}), `;
          });
          query = query.slice(0, -2) + ";"; // Remove trailing comma, add semicolon

          await db.execAsync(query);
        }
        console.log(await db.getAllAsync("SELECT * FROM journalEntries"));
        console.log("-----------------------");
        console.log(await db.getAllAsync("SELECT * FROM journalEntryEmotions"));
      } catch (err) {
        throw err;
      }
    }
    dispatch(journalResetState());
  };

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
                <View className="flex-row">
                  <View className="w-3/4 px-2 pt-2">
                    <Slider
                      animateTransitions
                      trackClickable
                      minimumValue={0} // 0.1 causes a visual glitch
                      maximumValue={0.6}
                      disabled
                      value={(journalState.moodValue - 1) / 10}
                      renderThumbComponent={() => (
                        <View
                          style={{
                            display: "none",
                          }}
                        ></View>
                      )}
                      minimumTrackTintColor={
                        journalState.moodValue < 4
                          ? "#D46A6A"
                          : journalState.moodValue < 6
                            ? "#F38E4E"
                            : "#AED581"
                      }
                      maximumTrackTintColor="#F5F5F5"
                      thumbTintColor="#F5F5F5"
                      trackStyle={{
                        paddingTop: 10,
                        borderRadius: 50,
                        borderColor: "#D9D9D9",
                        borderStyle: "solid",
                        borderWidth: 1,
                      }}
                    />
                  </View>
                  <View className="w-1/4 items-center justify-center">
                    <Text className="text-center text-xl">
                      {moodValueTitles[journalState.moodValue - 1]}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                className="my-8 border-b border-t px-2 py-7"
                style={{ borderColor: "#D9D9D9" }}
              >
                <Text>Emotions:</Text>
                <View className="mx-auto mt-6 w-[95%] flex-row flex-wrap px-4">
                  {journalState.emotions.map((e, index) => (
                    <View
                      className="w-full flex-row items-center justify-between"
                      key={index}
                    >
                      <DistortionPill
                        title={e.name}
                        customColor={e.color}
                        checked={true}
                        key={index}
                      />
                      <View className="flex-row">
                        {Array.from({ length: 5 }).map(
                          (q: unknown, i: number) => {
                            return (
                              <View
                                className="mx-1 h-4 w-4 rounded-full"
                                style={
                                  i <= e.strength!
                                    ? { backgroundColor: `${e.color}` }
                                    : { backgroundColor: "#FAF9F6" }
                                }
                                key={i}
                              ></View>
                            );
                          },
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
              <View className="mt-4">
                <Text>Note:</Text>
                {journalState.note ? (
                  <CDATextBox textContent={journalState.note} />
                ) : (
                  <View className="items-center justify-center p-8">
                    <Text>No note added to this log.</Text>
                  </View>
                )}
              </View>
              <Pressable
                onPress={() => {
                  dispatch(toggleSave());
                }}
              >
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
              </Pressable>
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
