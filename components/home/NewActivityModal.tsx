import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ToolList } from "@/constants/models/activity_log";
import { setShowNewActivityModal } from "@/state/features/menus/newActivityModalSlice";
import { RootState } from "@/state/store";
import NavigationModal from "../NavigationModal";
import { NavigationModalCardTypes } from "../NavigationModalCard";

const itemList: NavigationModalCardTypes[][] = [
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
  const newActivityModalState = useSelector(
    (state: RootState) => state.newActivityModal,
  );

  return (
    <View>
      <NavigationModal
        items={itemList}
        modalState={newActivityModalState}
        handleShowModal={(isOpen: boolean) => setShowNewActivityModal(isOpen)}
      />
    </View>
  );
};

export default NewActivityModal;
