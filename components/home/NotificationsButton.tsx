import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";
import { AppDispatch } from "@/state/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationsButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      className="flex-row justify-end rounded-lg"
      style={{ borderColor: "#B8B8B8" }}
      onPress={() => {
        dispatch(setShowNotificationModal(true));
      }}
    >
      <View
        className="h-8 w-16 -translate-y-1 items-center justify-center rounded-xl border"
        style={{ borderColor: "#B8B8B8" }}
      >
        <MaterialCommunityIcons name="bell" size={22} color="#DEC773" />
      </View>
    </TouchableOpacity>
  );
};
export default NotificationsButton;
