import { Href, router } from "expo-router";
import { Modal, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setShowEditProfileModal } from "@/state/features/menus/editProfileModalSlice";
import {
  setNavigateSettingsModalSelectedLink,
  setShowNavigateSettingsModal,
} from "@/state/features/menus/navigateSettingsModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import NavigationModalButton from "../NavigationModalButton";
import NavigationModalSelect from "../NavigationModalSelect";

const items = {
  editProfile: {
    name: "Edit Profile",
    icon: <Feather name="user" size={32} color="#B8B8B8" />,
    iconBright: <Feather name="user" size={32} color="#FFFFFF" />,
    // fake link - used instead of an enum to prevent component redesign
    link: "about/editProfile",
  },
  settings: {
    name: "Settings",
    icon: <Feather name="tool" size={32} color="#B8B8B8" />,
    iconBright: <Feather name="tool" size={32} color="#FFFFFF" />,
    link: "about/settings",
    handleOpenModal: setShowNavigateSettingsModal,
  },
};

const NavigationModal = () => {
  const navigateSettingsModalState = useSelector(
    (state: RootState) => state.navigateSettingsModal,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigate = async (selectedLink: string) => {
    router.navigate(selectedLink as Href);
    setTimeout(() => {
      dispatch(setShowNavigateSettingsModal(false));
    }, 200);
  };

  const handleOpenEditProfileModal = async () => {
    dispatch(setShowNavigateSettingsModal(false));
    dispatch(setShowEditProfileModal(true));
  };

  const handleButonPress = () => {
    if (navigateSettingsModalState.link === items.settings.link) {
      handleNavigate(navigateSettingsModalState.link);
    } else if (navigateSettingsModalState.link === items.editProfile.link) {
      handleOpenEditProfileModal();
    }
  };

  return (
    <Modal
      visible={navigateSettingsModalState.showModal}
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
            borderColor: "#B8B8B8",
          }}
        >
          {/* Header */}
          <View>
            <View className="flex-row justify-end">
              <Pressable
                onPress={() => dispatch(setShowNavigateSettingsModal(false))}
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
              className="mx-1 flex-row items-center justify-center border-b pb-3"
              style={{ borderColor: "#B8B8B8", borderBottomWidth: 0.4 }}
            >
              <View className="mx-1.5">
                {<Feather name="settings" size={24} color="#B8B8B8" />}
              </View>
              <View className="mx-1.5">
                <Text className="text-lg">Preferences</Text>
              </View>
            </View>
          </View>
          {/* Header */}
          <View className="w-full justify-center">
            {/* Main */}
            <View className="mb-24 items-center py-4">
              {/* Card */}
              <NavigationModalSelect
                {...items.editProfile}
                modalState={navigateSettingsModalState}
                handleSelect={(link: string) =>
                  dispatch(setNavigateSettingsModalSelectedLink(link))
                }
              />
              <NavigationModalSelect
                {...items.settings}
                modalState={navigateSettingsModalState}
                handleSelect={(link: string) =>
                  dispatch(setNavigateSettingsModalSelectedLink(link))
                }
              />
            </View>
          </View>
          <View
            className="absolute bottom-8 flex-row items-center justify-center"
            style={{ width: 320 }}
          >
            <NavigationModalButton
              title="Redirect"
              onPress={() => handleButonPress()}
              icon={
                <Feather
                  className="mx-2"
                  name="arrow-right"
                  size={28}
                  color="#FFFFFF"
                />
              }
              disabled={!navigateSettingsModalState.link}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NavigationModal;
