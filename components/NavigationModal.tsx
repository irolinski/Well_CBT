import { Href, router } from "expo-router";
import { ReactNode, useEffect } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { UnknownAction } from "@reduxjs/toolkit";
import DividerLine from "./DividerLine";
import NavigationModalButton from "./NavigationModalButton";
import NavigationModalSelect, {
  NavigationModalObj,
} from "./NavigationModalSelect";

type NavigationModalTypes = {
  title: string;
  icon: ReactNode;
  items: NavigationModalObj[][];
  modalState: {
    showModal: boolean;
    link: string;
  };
  handleShowModal: (isOpen: boolean) => UnknownAction;
  handleSelect: (link: string) => UnknownAction;
};

const NavigationModal = ({
  title,
  icon,
  items,
  modalState,
  handleShowModal,
  handleSelect,
}: NavigationModalTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigate = async (selectedLink: string) => {
    router.navigate(selectedLink as Href);
    setTimeout(() => {
      dispatch(handleShowModal(false));
    }, 200);
  };

  return (
    <Modal
      visible={modalState.showModal}
      animationType="slide"
      transparent={true}
    >
      <View
        className="h-full items-center justify-center"
        style={{ backgroundColor: "rgba(184, 184, 184, 0.5)" }} //b8b8b8
      >
        {/* Modal body */}
        <View
          className="rounded-xl border bg-white px-8 pt-4"
          style={{
            width: 320,
            // height: 425,
            borderColor: Colors.mainGray,
          }}
        >
          {/* Header */}
          <View>
            <View className="flex-row justify-end">
              <Pressable onPress={() => dispatch(handleShowModal(false))}>
                <View className="m-1">
                  <MaterialCommunityIcons
                    name="window-close"
                    size={24}
                    color={Colors.mainGray}
                  />
                </View>
              </Pressable>
            </View>
            <View
              className="mx-1 flex-row items-center justify-center border-b pb-3"
              style={{ borderColor: Colors.mainGray, borderBottomWidth: 0.4 }}
            >
              <View className="mx-1.5">{icon}</View>
              <View className="mx-1.5">
                <Text className="text-lg">{title}</Text>
              </View>
            </View>
          </View>
          {/* Header */}

          <View className="w-full justify-center">
            {/* Main */}
            <View className="mb-24 items-center py-4">
              {/* Card */}
              {items.map((category, categoryIndex) => (
                <View key={categoryIndex}>
                  {category.map((activity, activityIndex) => (
                    <NavigationModalSelect
                      {...activity}
                      modalState={modalState}
                      handleSelect={(link: string) =>
                        dispatch(handleSelect(link))
                      }
                      key={activityIndex}
                    />
                  ))}
                  {categoryIndex + 1 !== items.length && (
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
            <NavigationModalButton
              title="Redirect"
              onPress={() => handleNavigate(modalState.link)}
              icon={
                <Feather
                  className="mx-2"
                  name="arrow-right"
                  size={28}
                  color={Colors.white}
                />
              }
              disabled={!modalState.link}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NavigationModal;
