import BackButton from "@/components/BackButton";
import DividerLine from "@/components/DividerLine";
import Frame from "@/components/Frame";
import Text from "@/components/global/Text";
import JournalCard from "@/components/JournalCard";
import ToolHeader from "@/components/ToolHeader";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ActivityLog = () => {
  return (
    <React.Fragment>
      <ScrollView className="relative pb-8">
        <View className="z-10">
          <View
            className={`absolute z-10 box-border w-full border-b pb-7 ${windowHeight > 750 ? "top-20" : "top-12"}`}
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
        <Frame>
          <View className="py-10">
            <ToolHeader>Entry Log</ToolHeader>
          </View>
          <View className="w-full items-center">
            <View className="mx-12 mb-8 w-full flex-row justify-between">
              <Pressable
                className="h-full flex-row items-center justify-center rounded-lg border"
                style={{ borderColor: "#73848D" }}
                onPress={() => {
                  console.log("pressed");
                }}
              >
                <View className="mr-4 h-full w-36 flex-row items-center justify-center">
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
                className="flex-rowitems-center h-full rounded-lg border"
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
            <View className="px-1 pb-16">
              <ToolHeader style={{ marginBottom: 24 }}>
                September 2024
              </ToolHeader>
              <JournalCard toolName="cda" link={""} date="20 Sep 2024" />
              <JournalCard toolName="breathing" link={""} date="20 Sep 2024" />
              <JournalCard
                toolName="journal"
                link={""}
                moodValue={5}
                date="20 Sep 2024"
              />

              <DividerLine
                width={windowWidth * 0.75}
                viewStyle={{ marginTop: 25, marginBottom: 50 }}
              />
              <ToolHeader style={{ marginBottom: 24 }}>July 2024</ToolHeader>
              <JournalCard toolName="cda" link={""} date="20 Sep 2024" />
              <JournalCard toolName="breathing" link={""} date="20 Sep 2024" />
              <JournalCard
                toolName="journal"
                link={""}
                moodValue={5}
                date="20 Sep 2024"
              />
              <JournalCard toolName="cda" link={""} date="20 Sep 2024" />
              <JournalCard toolName="breathing" link={""} date="20 Sep 2024" />
              <JournalCard
                toolName="journal"
                link={""}
                moodValue={5}
                date="20 Sep 2024"
              />
            </View>
            <DividerLine
              viewStyle={{ paddingBottom: windowHeight * 0.1 }}
              width={windowWidth / 2}
            />
          </View>
        </Frame>
      </ScrollView>
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
