import { View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { Feather } from "@expo/vector-icons";
import Text from "../global/Text";

const ShowPageHeaderDate = ({ date, time }: { date: string; time: string }) => {
  return (
    <View className="mx-1 mt-1 flex-row justify-start" style={{ width: "95%" }}>
      <View className="mr-4 flex-row items-center">
        <Feather name="calendar" size={22} color={Colors.darkGray} />
        <Text
          className="wrap text-md m-1 ml-2 overflow-hidden"
          style={{
            fontFamily: "KodchasanMedium",
            color: Colors.offBlack,
            flexShrink: 1,
          }}
        >
          {date}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Feather name="clock" size={22} color={Colors.darkGray} />
        <Text
          className="wrap text-md mx-2 overflow-hidden"
          style={{
            fontFamily: "KodchasanMedium",
            color: Colors.offBlack,
            flexShrink: 1,
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export default ShowPageHeaderDate;
