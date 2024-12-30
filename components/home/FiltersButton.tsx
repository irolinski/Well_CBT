import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { AntDesign } from "@expo/vector-icons";
import { setShowActivityLogModal } from "@/state/features/menus/activityLogModalSlice";

const FiltersButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  let numOfFilters = 0;
  if (activityLogState.filterPeriod.length > 0) {
    numOfFilters++;
  }
  return (
    <TouchableOpacity
      className="h-full flex-row items-center justify-center rounded-lg border"
      style={{ borderColor: "#B8B8B8" }}
      onPress={() => {
        dispatch(setShowActivityLogModal(true));
      }}
    >
      <View className="mx-3.5 w-36 flex-row items-center justify-center">
        <View className="relative w-full flex-row items-center justify-start">
          <Text style={{ color: "#1E1E1E" }} className="text-left text-base">
            Filters
          </Text>
        </View>
        <View className="absolute right-0 flex-row items-center justify-center">
          {numOfFilters > 0 && (
            <View
              className="left-0 mx-1 h-6 w-6 items-center justify-center rounded-full"
              style={{ backgroundColor: "#D46A6A" }}
            >
              <Text
                className="text-center text-sm"
                style={{ color: "#FFFFFF" }}
              >
                {numOfFilters}
              </Text>
            </View>
          )}
          <View className="ml-[5px]">
            <AntDesign name="calendar" size={26} color="#73848D" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default FiltersButton;
