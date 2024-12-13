import { Dimensions, Pressable, View } from "react-native";
import BackButton from "../BackButton";
import { Ionicons } from "@expo/vector-icons";

const ActivityShowNav = ({
  handleDeletePress,
}: {
  handleDeletePress: () => void;
}) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      className={`z-10 box-border w-full border-b ${windowHeight > 750 ? "pb-4 pt-16" : "top-12"}`}
      style={{
        borderColor: "#D9D9D9",
        backgroundColor: "#8DBED8",
      }}
    >
      <View className="z-10 w-full flex-row items-center justify-between">
        <View className="left-6">
          <BackButton color="#FBFBFB" />
        </View>
        <View className="mx-6 flex-row justify-end">
          <Pressable
            onPress={() => {
              handleDeletePress();
            }}
          >
            <Ionicons name="trash-outline" size={22} color="#FBFBFB" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ActivityShowNav;
