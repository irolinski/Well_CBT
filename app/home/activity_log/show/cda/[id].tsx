import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import DistortionPill from "@/components/DistortionPill";
import ErrorScreen from "@/components/ErrorScreen";
import Text from "@/components/global/Text";
import ActivityShowNav from "@/components/home/ActivityShowNav";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import ToolHeader from "@/components/tools/ToolHeader";
import { cdaEntryType } from "@/constants/models/tools/cda";
import { fetchCDAEntry } from "@/db/activity_log";
import { deleteCDAEntry } from "@/db/tools";
import { formatDateStringForWrapping } from "@/utils/dates";
import { handleDeleteEntry } from "@/utils/deleteEntry";

const ActivityShowPage = () => {
  const windowHeight = Dimensions.get("window").height;

  const id: number = Number(useLocalSearchParams<{ id: string }>().id);
  const [fetchedEntry, setFetchedEntry] = useState<cdaEntryType | undefined>(
    undefined,
  );

  useEffect(() => {
    if (id) {
      fetchCDAEntry(id).then((res) => {
        let fetchedArr = res as cdaEntryType[];
        setFetchedEntry(fetchedArr[0]);
      });
    }
  }, []);

  if (fetchedEntry) {
    let date;
    if (fetchedEntry.datetime) {
      date = fetchedEntry.datetime.split(" ")[0];
      date = formatDateStringForWrapping(date);
    }

    return (
      <ScrollView>
        <ActivityShowNav
          handlePressDelete={() => handleDeleteEntry(deleteCDAEntry, id)}
        />
        <View className={`mx-6 my-10 flex-1 justify-center`}>
          <View className="mb-12 pb-10" style={{ height: windowHeight * 0.8 }}>
            <View className="wrap mb-8 w-full flex-row justify-between overflow-hidden">
              <ToolHeader>Thought challenge </ToolHeader>

              <Text
                className="wrap mt-0.5 overflow-hidden text-lg"
                style={{
                  fontFamily: "KodchasanMedium",
                  color: "#B8B8B8",
                  flexShrink: 1,
                }}
              >
                {date}
              </Text>
            </View>
            <View className="mx-4 my-8">
              <View className="mb-4">
                <Text>Situation: </Text>
                <View
                  className="mb-4 border-b px-2 py-7"
                  style={{ borderColor: "#D9D9D9" }}
                >
                  <Text className="mx-4 text-start">
                    {fetchedEntry.situation}
                  </Text>
                </View>
              </View>
              <View className="mb-4">
                <Text>Distorted thought: </Text>
                <CDATextBox textContent={fetchedEntry.oldThought} />
              </View>
              <View
                className="mb-4 border-b border-t px-2 py-7"
                style={{ borderColor: "#D9D9D9" }}
              >
                <Text>Cognitive Distortion:</Text>
                <View className="mx-auto mt-4 w-3/4 px-4">
                  <DistortionPill
                    title={fetchedEntry.distortion}
                    checked={true}
                    highlighted={false}
                  />
                </View>
              </View>
              <View className="mt-4">
                <Text>Rational thought:</Text>
                <CDATextBox textContent={fetchedEntry.newThought} />
              </View>
              <View className="w-full flex-row justify-center">
                <Image
                  className="h-4 w-1/2 translate-y-16"
                  source={require("@/assets/images/logo_braid.webp")}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <ErrorScreen />;
  }
};
export default ActivityShowPage;
