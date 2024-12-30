import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/global/Text";
import { setShowActivityLogModal } from "@/state/features/menus/activityLogModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import ActivityLogCalendar from "./Calendar";

const ActivityLogModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogModalState = useSelector(
    (state: RootState) => state.activityLogModal,
  );

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={activityLogModalState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(setShowActivityLogModal(false));
        }}
      >
        <View
          className={`px-4 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            top: 0,
            width: windowWidth,
            height: windowHeight, //remove if more height needed
            backgroundColor: "#FBFBFB",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(setShowActivityLogModal(false));
            }}
          >
            <View className="items-center pb-6">
              <View>
                <Feather name="chevron-down" size={24} color="black" />
              </View>
            </View>
          </Pressable>
          <View className="items-center">
            <Text className="text-xl" style={{ color: "#B8B8B8" }}>
              Settings
            </Text>
          </View>
          <View className="my-8">
            <View
              className="border-b pb-4 pt-2"
              style={{ borderColor: "#B8B8B8" }}
            >
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Select dates
              </Text>
              <View className="m-4 flex-row justify-around">
                <ActivityLogCalendar />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ActivityLogModal;
