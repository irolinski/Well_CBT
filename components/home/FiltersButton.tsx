import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/state/features/menus/activityLogSlice";
import { AppDispatch } from "@/state/store";
import { AntDesign } from "@expo/vector-icons";

const FiltersButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      className="h-full flex-row items-center justify-center rounded-lg border"
      style={{ borderColor: "#B8B8B8" }}
      onPress={() => {
        dispatch(toggleModal(true));
      }}
    >
      <View className="mr-4 w-36 flex-row items-center justify-center">
        <View className="relative mx-16 w-full justify-center">
          <Text style={{ color: "#1E1E1E" }} className="text-center">
            Filters
          </Text>
        </View>
        <View className="absolute right-0">
          <AntDesign name="calendar" size={24} color="#73848D" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default FiltersButton;
