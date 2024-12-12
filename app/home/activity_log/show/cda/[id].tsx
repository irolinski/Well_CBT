import Text from "@/components/global/Text";
import { fetchCDAEntry } from "@/db/activity_log";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const ActivityShowPage = () => {
  const id: number = Number(useLocalSearchParams<{ id: string }>().id);

  useEffect(() => {
    if (id) {
      fetchCDAEntry(id).then((res) => {
        console.log(res);
      });
    }
  }, []);

  return (
    <View className="h-48 w-48 flex-1 items-center justify-center">
      <Text className="text-xl"> CDA</Text>
    </View>
  );
};
export default ActivityShowPage;
