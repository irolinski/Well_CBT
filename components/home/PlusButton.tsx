import { Dimensions, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch } from "@/state/store";
import { Feather } from "@expo/vector-icons";

const PlusButton = () => {
  const windowHeight = Dimensions.get("window").height;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity onPress={() => dispatch(setShowNewActivityModal(true))}>
      <View
        className="absolute items-center justify-center rounded-full"
        style={{
          width: windowHeight * 0.085,
          height: windowHeight * 0.085,
          right: windowHeight * 0.04,
          bottom: windowHeight * 0.06,
          backgroundColor: "#E57353",
        }}
      >
        <Feather name="plus" size={36} color="white" />
      </View>
    </TouchableOpacity>
  );
};
export default PlusButton;
