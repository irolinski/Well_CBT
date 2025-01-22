import React from "react";
import { useSelector } from "react-redux";
import {
  setNavigateSettingsModalSelectedLink,
  setShowNavigateSettingsModal,
} from "@/state/features/menus/navigateSettingsModalSlice";
import { RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import NavigationModal from "../NavigationModal";
import { NavigationModalObj } from "../NavigationModalSelect";

const itemList: NavigationModalObj[][] = [
  [
    {
      name: "Edit Profile",
      icon: <Feather name="user" size={32} color="#B8B8B8" />,
      iconBright: <Feather name="user" size={32} color="#FFFFFF" />,
      link: "about/edit",
    },
    {
      name: "Settings",
      icon: <Feather name="tool" size={32} color="#B8B8B8" />,
      iconBright: <Feather name="tool" size={32} color="#FFFFFF" />,
      link: "about/settings",
    },
  ],
];

const NavigateSettingsModal = () => {
  const navigateSettingsModalState = useSelector(
    (state: RootState) => state.navigateSettingsModal,
  );

  return (
    <React.Fragment>
      <NavigationModal
        title="Preferences"
        icon={<Feather name="settings" size={24} color="#B8B8B8" />}
        items={itemList}
        modalState={navigateSettingsModalState}
        handleShowModal={(isOpen: boolean) =>
          setShowNavigateSettingsModal(isOpen)
        }
        handleSelect={(link: string) =>
          setNavigateSettingsModalSelectedLink(link)
        }
      />
    </React.Fragment>
  );
};

export default NavigateSettingsModal;
