import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import FrameMenu from "@/components/FrameMenu";
import Text from "@/components/global/Text";
import JournalCard from "@/components/JournalCard";
import AdvanceButton from "@/components/AdvanceButton";
import { Entypo } from "@expo/vector-icons";
import QuoteWidget from "@/components/QuoteWidget";
import DividerLine from "@/components/DividerLine";
import TypewriterText from "@/components/TypewriterText";
import { router } from "expo-router";

import * as SQLite from "expo-sqlite";
import { dbName } from "@/db/service";
import { EntryViewTableRow } from "@/constants/models/activity_log";

const windowWidth = Dimensions.get("window").width;

const fetchRecentEntries = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const res = await db.getAllAsync(
      "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 3",
    );
    // console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};

const Home = () => {
  const [recentEntriesArr, setRecentEntriesArr] = useState<EntryViewTableRow[]>(
    [],
  );

  useEffect(() => {
    fetchRecentEntries().then((res) => {
      setRecentEntriesArr(res as EntryViewTableRow[]);
    });
  }, []);

  return (
    <FrameMenu title="Home" className="items-center justify-center">
      <View>
        {/* Welcome */}
        <View className="my-4">
          <View
            className="mx-4 mb-8 mt-2 justify-center"
            style={{ borderColor: "#DDDDDD" }}
          >
            <TypewriterText
              text={"Hi, Olga! How are you, today? "}
              speed="fast"
              fontFamily="KodchasanMedium"
              color="#757575"
              letterSpacing={2}
              lineHeight={1.5}
              hideCursorOnFinish={true}
            />
          </View>
          <DividerLine width={windowWidth / 1.5} weight={0.5} />
        </View>
        {/* Quote Widget */}
        <View className="my-4 items-center justify-center">
          <QuoteWidget
            image={require("@/assets/images/home/quote_widget/bg_1.webp")}
          />
        </View>
        {/* Recent */}
        <View>
          <View className="mx-4 flex-row justify-between">
            <Text className="my-6 text-left text-2xl">
              Your recent activity:
            </Text>
            <Pressable className="justify-center" onPress={() => {}}>
              <Entypo name="plus" size={32} color="black" />
            </Pressable>
          </View>
          <View className="px-1" style={{ height: 370 }}>
            {recentEntriesArr[0] &&
              recentEntriesArr.map((el: EntryViewTableRow, index: number) => (
                <JournalCard
                  toolName={el.activityName}
                  datetime={el.datetime}
                  value={el.value && el.value}
                  key={index}
                  link={`/route/${el.id}`}
                />
              ))}
          </View>
          <View className="mt-3 flex-row justify-end">
            <AdvanceButton
              title="See all"
              onPress={() => {
                router.push("/home/activity_log/");
              }}
              btnStyle={{
                width: 150,
                height: 45,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "#D9D9D9",
                borderRadius: 12,
              }}
              textStyle={{ color: "#27261F" }}
            />
          </View>
        </View>
      </View>
    </FrameMenu>
  );
};

export default Home;
