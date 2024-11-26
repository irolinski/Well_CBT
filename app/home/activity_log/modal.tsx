import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/global/Text";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import { toggleModal } from "@/state/features/menus/activityLogSlice";

const ActivityLogModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activityLogState = useSelector((state: RootState) => state.activityLog);

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={activityLogState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(toggleModal(false));
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
              console.log("toggle false");
              dispatch(toggleModal(false));
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
            <Text>This is my activity log modal </Text>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ActivityLogModal;
