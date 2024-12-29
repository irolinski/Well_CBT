import { Image } from "expo-image";
import { Text, View } from "react-native";

const EntryLogListPlaceholder = () => {
  return (
    <View className="mx-4 h-3/4 items-center justify-center">
      <View className="h-full w-full flex-row items-center justify-around">
        <View
          className="mx-4"
          style={{
            width: "45%",
            height: "40%",
          }}
        >
          <Image
            className="h-full w-full"
            source={require("@/assets/images/logo/triple-logo-braid-vertical.webp")}
            contentFit={"fill"}
          />
        </View>
        <View
          className="flex-row items-center justify-center"
          style={{
            width: "55%",
            height: "40%",
          }}
        >
          <Text className="px-8 text-left text-xl" style={{ color: "#D9D9D9" }}>
            No data found
          </Text>
        </View>
      </View>
      <View className="flex-row justify-center"></View>
    </View>
  );
};
export default EntryLogListPlaceholder;
