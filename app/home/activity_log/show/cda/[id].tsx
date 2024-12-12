import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import BackButton from "@/components/BackButton";
import ToolHeader from "@/components/tools/ToolHeader";
import { fetchCDAEntry } from "@/db/activity_log";

const ActivityShowPage = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const id: number = Number(useLocalSearchParams<{ id: string }>().id);

  useEffect(() => {
    if (id) {
      fetchCDAEntry(id).then((res) => {
        console.log(res);
      });
    }
  }, []);

  return (
    <View className="h-full pb-8">
      {/* NAV */}
      <View
        className={`z-10 box-border w-full border-b ${windowHeight > 750 ? "pb-4 pt-16" : "top-12"}`}
        style={{
          borderColor: "#D9D9D9",
          backgroundColor: "#8DBED8",
        }}
      >
        <View className="z-10 w-full flex-row items-center justify-between">
          <View className="left-6">
            <BackButton
              color="#FBFBFB"
              // handleBackButtonPress={() => {
              //   dispatch(activityLogResetState());
              // }}
            />
          </View>
          <View className="mx-6 flex-row justify-end">
            <ToolHeader noIndent style={{ color: "#FBFBFB" }}>
              Entry Log
            </ToolHeader>
          </View>
        </View>
      </View>
      {/* / NAV */}
    </View>
  );
};
export default ActivityShowPage;
