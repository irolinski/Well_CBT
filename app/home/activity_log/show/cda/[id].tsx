import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import ToolHeader from "@/components/tools/ToolHeader";
import { fetchCDAEntry } from "@/db/activity_log";
import Text from "@/components/global/Text";
import CDATextBox from "@/components/tools/cda/CDATextBox";
import DistortionPill from "@/components/DistortionPill";
import ActivityShowNav from "@/components/home/ActivityShowNav";

const ActivityShowPage = () => {
  const windowHeight = Dimensions.get("window").height;

  const id: number = Number(useLocalSearchParams<{ id: string }>().id);
  const [fetchedEntry, setFetchedEntry] = useState<any>({});

  let date;
  if (fetchedEntry.datetime) {
    date = fetchedEntry.datetime.split(" ")[0];
  }

  useEffect(() => {
    if (id) {
      fetchCDAEntry(id).then((res: any) => {
        setFetchedEntry(res[0]);
        console.log(res);
      });
    }
  }, []);

  return (
    <ScrollView>
      <ActivityShowNav />
      <View className={`mx-6 my-10 flex-1 justify-center`}>
        <View
          className="mb-12 justify-center pb-10"
          style={{ height: windowHeight * 0.8 }}
        >
          <View className="my-8 flex-row">
            <ToolHeader>Thought challenge </ToolHeader>
            <View className="justify-center">
              <Text
                className="mt-0.5 text-lg"
                style={{ fontFamily: "KodchasanMedium", color: "#B8B8B8" }}
              >
                {date}
              </Text>
            </View>
          </View>
          <View className="mx-4 my-8">
            <View className="mb-4">
              <Text>Situation: </Text>
              <View
                className="mb-4 border-b px-2 py-7"
                style={{ borderColor: "#D9D9D9" }}
              >
                {/* <CDATextBox textContent={fetchedEntry.situation} /> */}
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
                source={require("@/assets/images/tools/phone/logo_braid.webp")}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ActivityShowPage;
