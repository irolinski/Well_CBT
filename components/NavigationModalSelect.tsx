import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setNewActivityModalSelectedLink } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch, RootState } from "@/state/store";
import { UnknownAction } from "@reduxjs/toolkit";

export type NavigationModalObj = {
  name: string;
  icon: ReactNode;
  iconBright: ReactNode;
  link: string;
};

type NavigationModalSelectTypes = NavigationModalObj & {
  modalState: {
    showModal: boolean;
    link: string;
  };
  handleSelect: (link: string) => UnknownAction;
};

const NavigationModalSelect = ({
  name,
  icon,
  iconBright,
  link,
  modalState,
  handleSelect,
}: NavigationModalSelectTypes) => {
  return (
    <Pressable
      className="mt-2.5 flex-row items-center justify-center rounded-xl border-2"
      style={{
        width: 0.7 * 320,
        height: 47,
        borderColor: "#B8B8B8",
        backgroundColor: modalState.link === link ? "#8DBED8" : "transparent",
      }}
      onPress={() => handleSelect(link)}
    >
      <View>{modalState.link === link ? iconBright : icon}</View>

      <Text
        className="mx-2"
        style={{
          color: modalState.link === link ? "#FFFFFF" : "#757575",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};
export default NavigationModalSelect;
