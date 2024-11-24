import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, SectionList, View } from "react-native";
import BackButton from "@/components/BackButton";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import JournalCard from "@/components/JournalCard";
import ToolHeader from "@/components/ToolHeader";
import {
  allDataByMonthType,
  EntryListSection,
  EntryViewTableRow,
  getMonthYearTitle,
} from "@/constants/models/activity_log";
import { dbName } from "@/db/service";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const transformData = (fetchedData: EntryViewTableRow[]) => {
  const allDataByMonth: allDataByMonthType =
    [] as unknown as allDataByMonthType;

  fetchedData.map((el) => {
    const monthYear = getMonthYearTitle(el.datetime);

    if (!Object.keys(allDataByMonth).includes(monthYear)) {
      allDataByMonth[monthYear] = [el];
    } else {
      let updatedArr = [...allDataByMonth[monthYear], el];
      allDataByMonth[monthYear] = updatedArr;
    }
  });

  const resultsArr: EntryListSection[] = [];
  Object.entries(allDataByMonth).map((el) => {
    const obj: EntryListSection = {
      title: el[0] as string,
      data: el[1] as EntryViewTableRow[],
    };
    resultsArr.push(obj);
  });

  console.log(allDataByMonth);

  return resultsArr;
};

const ActivityLog = () => {
  const [entryData, setEntryData] = useState<EntryListSection[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedData, setDisplayedData] = useState<EntryListSection[]>([]);

  const fetchEntryData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync(dbName);
      const res = await db.getAllAsync(
        "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 500",
      );
      return res;
      100;
    } catch (err) {
      console.error(err);
    }
  };

  const displayMoreData = (dataArr: EntryListSection[]) => {
    if (currentIndex < dataArr.length) {
      setDisplayedData((prevState: EntryListSection[]) => [
        ...prevState,
        dataArr[currentIndex],
      ]);
      setCurrentIndex((prevState: number) => prevState + 1);
    }
  };

  useEffect(() => {
    fetchEntryData().then((res) => {
      const fetchedData: EntryListSection[] = transformData(
        res as EntryViewTableRow[],
      );
      if (fetchedData) {
        if (fetchedData[currentIndex].data.length < 10) {
          setDisplayedData((prevState: EntryListSection[]) => [
            ...prevState,
            fetchedData[currentIndex],
            fetchedData[currentIndex + 1],
          ]);
          setCurrentIndex((prevState: number) => prevState + 2);
        } else {
          displayMoreData(fetchedData);
        }
      }
      setEntryData(fetchedData);
    });
  }, []);

  return (
    <React.Fragment>
      <View className="h-full pb-8">
        {/* NAV */}
        <View className="z-10">
          <View
            className={`z-10 box-border w-full border-b pb-7 ${windowHeight > 750 ? "top-20" : "top-12"}`}
            style={{
              borderColor: "#D9D9D9",
            }}
          >
            <View className="z-10 w-full flex-row items-center justify-center">
              <View className="absolute left-6">
                <BackButton />
              </View>
              <View></View>
              <View className="absolute right-6">
                {/* add the bell icon w/out plus if notifications are on */}
                {/* <MaterialCommunityIcons name="bell-outline" size={24} color="black" /> */}
                <MaterialCommunityIcons
                  name="bell-plus-outline"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </View>
        </View>
        {/* / NAV */}
        <View className="mx-3 my-12 pt-12">
          <View className="w-full items-center">
            {/* Button row */}
            <View className="mx-12 mb-8 w-full flex-row justify-between">
              <Pressable
                className="h-full flex-row items-center justify-center rounded-lg border"
                style={{ borderColor: "#73848D" }}
                onPress={() => {
                  console.log("pressed");
                }}
              >
                <View className="mr-4 w-36 flex-row items-center justify-center">
                  <View className="relative mx-16 w-full justify-center">
                    <Text style={{ color: "#1E1E1E" }} className="text-center">
                      Filters
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign name="filter" size={24} color="#B8B8B8" />
                  </View>
                </View>
              </Pressable>
              <Pressable
                className="flex-row items-center rounded-lg border"
                style={{ borderColor: "#B8B8B8" }}
                onPress={() => {
                  console.log("pressed");
                }}
              >
                <View className="mx-4 my-2">
                  <AntDesign name="calendar" size={24} color="#73848D" />
                </View>
              </Pressable>
            </View>
          </View>
          {/* /Button row */}
          <View
            className="relative px-1"
            style={{ height: windowHeight * 0.75 }}
          >
            <SectionList
              sections={displayedData}
              keyExtractor={(item: EntryViewTableRow, index: number) =>
                `${item.id}-${index}`
              }
              onEndReached={() => displayMoreData(entryData)}
              renderSectionHeader={({ section: { title } }) => (
                <View
                  className="rounded-xl pb-3"
                  style={{ backgroundColor: "#F2F2F2" }}
                >
                  <ToolHeader style={{ marginBottom: 16 }}>{title}</ToolHeader>
                </View>
              )}
              renderItem={({ item }: { item: EntryViewTableRow }) => (
                <JournalCard
                  toolName={item.activityName}
                  datetime={item.datetime}
                  link={`/${item.id}`}
                  value={item.value ? item.value : (item.value as undefined)}
                />
              )}
              ListFooterComponent={
                <DividerLine
                  viewStyle={{
                    marginBottom: windowHeight * 0.1,
                    marginTop: windowHeight * 0.05,
                  }}
                  width={windowWidth / 2}
                />
              }
            />
          </View>
        </View>
      </View>
      {/* ADD + BUTTON */}
      <View
        className="absolute bottom-0 right-0 items-center justify-center rounded-full"
        style={{
          width: 72,
          height: 72,
          right: windowHeight * 0.04,
          bottom: windowHeight * 0.06,
          backgroundColor: "#E57353",
        }}
      >
        <Feather name="plus" size={36} color="white" />
      </View>
    </React.Fragment>
  );
};
export default ActivityLog;
