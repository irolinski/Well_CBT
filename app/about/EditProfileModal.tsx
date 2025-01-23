import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import CategoryFilter from "@/components/home/CategoryFilter";
import { setShowActivityLogModal } from "@/state/features/menus/activityLogModalSlice";
import { setShowEditProfileModal } from "@/state/features/menus/editProfileModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfileModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editProfileModalState = useSelector(
    (state: RootState) => state.editProfileModal,
  );

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editProfileModalState.showModal}
      className="flex-1"
    >
      <ScrollView
        onScroll={(evt) => {
          evt.nativeEvent.contentOffset.y < -175 &&
            dispatch(setShowEditProfileModal(false));
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
              dispatch(setShowEditProfileModal(false));
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
              Edit Profile
            </Text>
          </View>
          <View className="mt-8">
            <View>
              <Text className="mb-2 text-lg" style={{ color: "#B8B8B8" }}>
                Header 1
              </Text>
              <View className="flex-row justify-around"></View>
            </View>
          </View>
          <View className="my-4">
            <DividerLine width={windowWidth * 0.5} />
          </View>
          <View className="mb-8 mt-4">
            <View>
              <Text className="text-lg" style={{ color: "#B8B8B8" }}>
                Header 2
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditProfileModal;
