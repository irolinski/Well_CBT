import { Dimensions, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { activityLogResetState } from "@/state/features/menus/activityLogSlice";
import { AppDispatch } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../BackButton";

type ActivityShowNavTypes = {
  handlePressDelete: () => void;
};

const ActivityShowNav = ({ handlePressDelete }: ActivityShowNavTypes) => {
  const windowHeight = Dimensions.get("window").height;
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View
      className={`z-10 w-full border-b`}
      style={{
        borderColor: Colors.lightGray,
        backgroundColor: Colors.mainBlue,
        paddingTop: windowHeight * 0.065,
        paddingBottom: 16,
      }}
    >
      <View className="z-10 w-full flex-row items-center justify-between">
        <View className="left-6">
          <BackButton color={Colors.offWhite} />
        </View>
        <View className="mx-6 flex-row justify-end">
          <Pressable
            onPress={() => {
              handlePressDelete();
              dispatch(activityLogResetState());
            }}
          >
            <Ionicons name="trash-outline" size={22} color={Colors.offWhite} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ActivityShowNav;
