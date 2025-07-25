import { Dimensions, Pressable, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { activityLogResetState } from "@/state/features/menus/activityLogSlice";
import { AppDispatch } from "@/state/store";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../global/BackButton";

type ActivityShowNavTypes = {
  handlePressDelete: () => void;
};

const ActivityShowNav = ({ handlePressDelete }: ActivityShowNavTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const TOP_FRAME_HEIGHT = 50 + insets.top;

  return (
    <SafeAreaView
      className={`z-10 w-full border-b`}
      // style={{
      //   borderColor: Colors.lightGray,
      //   backgroundColor: Colors.mainBlue,
      //   paddingTop: SCREEN_HEIGHT * 0.065,
      //   paddingBottom: 16,
      // }}
      style={{
        height: TOP_FRAME_HEIGHT,
        borderColor: Colors.lightGray,
        // paddingBottom: SCREEN_HEIGHT * 0.065,
        backgroundColor: Colors.mainBlue ?? Colors.mainBlue,
      }}
    >
      <View className="z-10 h-full w-full flex-row items-center justify-between">
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
    </SafeAreaView>
  );
};

export default ActivityShowNav;
