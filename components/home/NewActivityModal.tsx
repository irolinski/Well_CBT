import React from "react";
import { useSelector } from "react-redux";
import { ToolList } from "@/constants/models/home/activity_log";
import { Colors } from "@/constants/styles/colorTheme";
import {
  setNewActivityModalSelectedLink,
  setShowNewActivityModal,
} from "@/state/features/menus/newActivityModalSlice";
import { RootState } from "@/state/store";
import { Entypo } from "@expo/vector-icons";
import NavigationModal from "../NavigationModal";
import { NavigationModalObj } from "../NavigationModalSelect";

const itemList: NavigationModalObj[][] = [
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
    <React.Fragment>
      <NavigationModal
        title="Add a new activity"
        icon={<Entypo name="new-message" size={28} color={Colors.lightGray} />}
        items={itemList}
        modalState={newActivityModalState}
        handleShowModal={(isOpen: boolean) => setShowNewActivityModal(isOpen)}
        handleSelect={(link: string) => setNewActivityModalSelectedLink(link)}
      />
    </React.Fragment>
  );
};

export default NewActivityModal;
