import React from "react";
import { useTranslation } from "react-i18next";
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

const NewActivityModal = () => {
  const { t } = useTranslation(["home", "tools"]);

  const itemList: NavigationModalObj[][] = [
    [
      {
        name: t(`tools.${ToolList.journal.name}.title`, { ns: "tools" }),
        icon: ToolList.journal.icon,
        iconBright: ToolList.journal.iconBright,
        link: "/tools/classic_cbt/journal",
      },
      {
        name: t(`tools.${ToolList.cda.name}.title`, { ns: "tools" }),

        icon: ToolList.cda.icon,
        iconBright: ToolList.cda.iconBright,
        link: "tools/classic_cbt/cda",
      },
    ],
    [
      {
        name: t(`tools.${ToolList.breathing.name}.title`, { ns: "tools" }),

        icon: ToolList.breathing.icon,
        iconBright: ToolList.breathing.iconBright,
        link: "tools/relax/breathing",
      },
    ],
  ];

  const newActivityModalState = useSelector(
    (state: RootState) => state.newActivityModal,
  );

  return (
    <React.Fragment>
      <NavigationModal
        title={t("modals.new_activity.title")}
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
