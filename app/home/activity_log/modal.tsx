import { useTranslation } from "react-i18next";
import { Dimensions, Modal, Pressable, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DividerLine from "@/components/DividerLine";
import Text from "@/components/global/Text";
import CategoryFilter from "@/components/home/CategoryFilter";
import { Colors } from "@/constants/styles/colorTheme";
import { CLOSE_MODAL_OFFSET_TRESHOLD } from "@/constants/styles/values";
import { setShowActivityLogModal } from "@/state/features/menus/activityLogModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import ActivityLogCalendar from "./Calendar";

const ActivityLogModal = () => {
  const { t } = useTranslation("home");

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
          evt.nativeEvent.contentOffset.y < CLOSE_MODAL_OFFSET_TRESHOLD &&
            dispatch(setShowActivityLogModal(false));
        }}
      >
        <View
          className={`px-4 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            top: 0,
            width: windowWidth,
            height: windowHeight, //remove if more height needed
            backgroundColor: Colors.offWhite,
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
            <Text className="text-xl" style={{ color: Colors.mainGray }}>
              {t("activity_log.modal.title")}
            </Text>
          </View>
          <View className="mt-8">
            <View>
              <Text className="mb-2 text-lg" style={{ color: Colors.mainGray }}>
                {t("activity_log.modal.select_dates")}
              </Text>
              <View className="flex-row justify-around">
                <ActivityLogCalendar />
              </View>
            </View>
          </View>
          <View className="my-4">
            <DividerLine width={windowWidth * 0.5} />
          </View>
          <View className="mb-8 mt-4">
            <View>
              <Text className="text-lg" style={{ color: Colors.mainGray }}>
                {t("activity_log.modal.show_only")}
              </Text>
              <CategoryFilter />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ActivityLogModal;
