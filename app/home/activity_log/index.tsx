import BackButton from "@/components/BackButton";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import JournalCard from "@/components/JournalCard";
import ToolHeader from "@/components/ToolHeader";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, SectionList, View } from "react-native";

import * as SQLite from "expo-sqlite";
import { dbName } from "@/db/service";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

// Przemyśleć jak mam organizować to menu
// paginacja?

// fetch (data) => setFetchedData(data)
//  data = fetchedData or fetchedData.filter
//  render first 15, load more on reaching footer

const data = [
  {
    title: "December 2024",
    data: [
      { activityName: "breathing", datetime: "2024-12-29", id: 101, value: null },
      { activityName: "journal", datetime: "2024-12-15", id: 102, value: 5 },
      { activityName: "cda", datetime: "2024-12-03", id: 103, value: null },
    ],
  },
  {
    title: "November 2024",
    data: [
      { activityName: "journal", datetime: "2024-11-25", id: 104, value: 4 },
      { activityName: "breathing", datetime: "2024-11-10", id: 105, value: null },
      { activityName: "cda", datetime: "2024-11-01", id: 106, value: null },
    ],
  },
  {
    title: "October 2024",
    data: [
      { activityName: "cda", datetime: "2024-10-20", id: 41, value: null },
      { activityName: "journal", datetime: "2024-10-10", id: 42, value: 5 },
      { activityName: "breathing", datetime: "2024-10-05", id: 43, value: 1 },
    ],
  },
  {
    title: "September 2024",
    data: [
      { activityName: "journal", datetime: "2024-09-21", id: 1, value: 4 },
      { activityName: "cda", datetime: "2024-09-15", id: 2, value: null },
      { activityName: "breathing", datetime: "2024-09-07", id: 3, value: 2 },
    ],
  },
  {
    title: "August 2024",
    data: [
      { activityName: "breathing", datetime: "2024-08-30", id: 107, value: 3 },
      { activityName: "cda", datetime: "2024-08-22", id: 108, value: null },
      { activityName: "journal", datetime: "2024-08-12", id: 109, value: 7 },
    ],
  },
  {
    title: "May 2024",
    data: [
      { activityName: "journal", datetime: "2024-05-15", id: 12, value: 3 },
      { activityName: "breathing", datetime: "2024-05-10", id: 13, value: 4 },
      { activityName: "cda", datetime: "2024-05-05", id: 14, value: null },
    ],
  },
  {
    title: "April 2024",
    data: [
      { activityName: "breathing", datetime: "2024-04-30", id: 21, value: 1 },
      { activityName: "journal", datetime: "2024-04-20", id: 22, value: 2 },
      { activityName: "cda", datetime: "2024-04-10", id: 23, value: null },
    ],
  },
];

// const fetchData = async () => {
//   try {
    // const db = await SQLite.openDatabaseAsync(dbName);
//     const res = await db.getAllAsync(
//       "SELECT * FROM allActivities ORDER BY datetime DESC LIMIT 3",
//     );
//     console.log(res);
//     return res;
//   } catch (err) {
//     console.error(err);
//   }
// };

const ActivityLog = () => {
  // const [entriesArr, setEntriesArr] = useState<any>([]);

  //   useEffect(() => {
  //     fetchData().then((res) => {
  //       setEntriesData(res);
  //     });
  //   }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedData, setDisplayedData] = useState<any>([]);

  const displayMoreData = () => {
    // console.log(currentIndex + "/" + data.length);
    if (currentIndex < data.length) {
      setDisplayedData((prevState: any) => [...prevState, data[currentIndex]]);
      setCurrentIndex((prevState: number) => prevState + 1);
    }

    console.log(displayedData);
  };

  useEffect(() => {
    if (data[currentIndex].data.length < 10) {
      setDisplayedData((prevState: any) => [
        ...prevState,
        data[currentIndex],
        data[currentIndex + 1],
      ]);
      setCurrentIndex((prevState: number) => prevState + 2);
    } else {
      displayMoreData();
    }
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
          {/* <View className="pb-10 pt-12">
            <ToolHeader>Entry Log</ToolHeader>
          </View> */}
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
              onEndReached={displayMoreData}
              renderSectionHeader={({ section: { title } }) => (
                <View
                  className="rounded-xl pb-3"
                  style={{ backgroundColor: "#F2F2F2" }}
                >
                  <ToolHeader style={{ marginBottom: 16 }}>{title}</ToolHeader>
                </View>
              )}
              renderItem={({ item, index }: any) => (
                <JournalCard
                  toolName={item.activityName}
                  datetime={item.datetime}
                  link={item.id}
                  value={item.value}
                  key={index}
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
      {/* </View> */}
    </React.Fragment>
  );
};
export default ActivityLog;
