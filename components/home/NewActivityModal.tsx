import { Href, router } from "expo-router";
import { ReactNode } from "react";
import { Dimensions, Modal, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ToolList } from "@/constants/models/activity_log";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DividerLine from "../DividerLine";
import ModalButton from "../ModalButton";
import NewActivityModalCard from "./NewActivityModalCard";

export type NewActivityModalCardTypes = {
  name: string;
  icon: ReactNode;
  iconBright: ReactNode;
  link: string;
};

const modalActivityList: NewActivityModalCardTypes[][] = [
  [
    {
      name: ToolList.journal.name,
      icon: ToolList.journal.icon,
      iconBright: ToolList.journal.iconBright,
      link: "/tools/classic_cbt/journal",
    },
    {
      name: ToolList.cda.name,
      icon: ToolList.cda.icon,
      iconBright: ToolList.cda.iconBright,
      link: "tools/classic_cbt/cda",
    },
  ],
  [
    {
      name: ToolList.breathing.name,
      icon: ToolList.breathing.icon,
      iconBright: ToolList.breathing.iconBright,
      link: "tools/relax/breathing",
    },
  ],
];

const NewActivityModal = () => {
  const windowHeight = Dimensions.get("window").height;
  const newActivityModalState = useSelector(
    (state: RootState) => state.newActivityModal,
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigateToNewActivity = async (selectedLink: string) => {
    router.navigate(selectedLink as Href);
    setTimeout(() => {
      dispatch(setShowNewActivityModal(false));
    }, 200);
  };

  return (
    <Modal
      visible={newActivityModalState.showModal}
      animationType="slide"
      transparent={true}
    >
      <View className="h-full items-center justify-center">
        {/* Modal body */}
        <View
          className="rounded-xl border bg-white px-8 pt-4"
          style={{
            width: 320,
            height: 425,
            borderColor: "#B8B8B8",
          }}
        >
          {/* Header */}
          <View>
            <View className="flex-row justify-end">
              <Pressable
                onPress={() => dispatch(setShowNewActivityModal(false))}
              >
                <View className="m-1">
                  <MaterialCommunityIcons
                    name="window-close"
                    size={24}
                    color="#B8B8B8"
                  />
                </View>
              </Pressable>
            </View>
            <View
              className="mx-1 flex-row justify-center border-b pb-3"
              style={{ borderColor: "#B8B8B8", borderBottomWidth: 0.4 }}
            >
              <Text className="text-lg">New activity</Text>
            </View>
          </View>
          {/* Header */}

          <View className="mt-4 h-56 w-full justify-center">
            {/* Main */}
            <View className="items-center py-4">
              {/* Card */}
              {modalActivityList.map((category, categoryIndex) => (
                <View key={categoryIndex}>
                  {category.map((activity, activityIndex) => (
                    <NewActivityModalCard {...activity} key={activityIndex} />
                  ))}
                  {categoryIndex + 1 !== modalActivityList.length && (
                    <View className="mb-2.5 mt-5">
                      <DividerLine width={"75%"} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View
            className="absolute bottom-8 flex-row items-center justify-center"
            style={{ width: 320 }}
          >
            <ModalButton
              title="Redirect"
              onPress={() => navigateToNewActivity(newActivityModalState.link)}
              icon={
                <Feather
                  className="mx-2"
                  name="arrow-right"
                  size={28}
                  color="#FFFFFF"
                />
              }
              disabled={!newActivityModalState.link}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NewActivityModal;
