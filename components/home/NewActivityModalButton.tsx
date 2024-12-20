import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const NewActivityModalButton = ({ selectedLink }: { selectedLink: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = async () => {
    router.navigate(selectedLink as Href);
    setTimeout(() => {
      dispatch(setShowNewActivityModal(false));
    }, 200);
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-center rounded-xl"
      style={{
        width: 0.75 * 320,
        height: 50,
        backgroundColor: selectedLink ? "#4391BC" : "#B8B8B8",
      }}
      disabled={!selectedLink}
      onPress={() => {
        handlePress();
      }}
    >
      <Text className="mx-2" style={{ color: "#FFFFFF" }}>
        Redirect
      </Text>
      <Feather className="mx-2" name="arrow-right" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};
export default NewActivityModalButton;
