import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { setShowNotificationModal } from "@/state/features/menus/notificationModalSlice";
import { AppDispatch } from "@/state/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationsButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      className="flex-row justify-end rounded-lg"
      style={{ borderColor: Colors.mainGray }}
      onPress={() => {
        dispatch(setShowNotificationModal(true));
      }}
    >
      <View
        className="h-8 w-16 -translate-y-1 items-center justify-center rounded-xl border"
        style={{ borderColor: Colors.mainGray }}
      >
        <MaterialCommunityIcons name="bell" size={22} color={Colors.gold} />
      </View>
    </TouchableOpacity>
  );
};
export default NotificationsButton;
