import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch } from "@/state/store";
import { Feather } from "@expo/vector-icons";

const PlusButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity onPress={() => dispatch(setShowNewActivityModal(true))}>
      <View
        className="absolute items-center justify-center rounded-full"
        style={{
          width: SCREEN_HEIGHT * 0.085,
          height: SCREEN_HEIGHT * 0.085,
          right: SCREEN_HEIGHT * 0.04,
          bottom: SCREEN_HEIGHT * 0.06,
          backgroundColor: Colors.carrotOrange,
        }}
      >
        <Feather name="plus" size={36} color="white" />
      </View>
    </TouchableOpacity>
  );
};
export default PlusButton;
