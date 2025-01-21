import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setNewActivityModalSelectedLink } from "@/state/features/menus/newActivityModalSlice";
import { AppDispatch, RootState } from "@/state/store";

export type NavigationModalCardTypes = {
  name: string;
  icon: ReactNode;
  iconBright: ReactNode;
  link: string;
};

const NewActivityModalCard = ({
  name,
  icon,
  iconBright,
  link,
}: NavigationModalCardTypes) => {
  const dispatch = useDispatch<AppDispatch>();
  const newActivityModalState = useSelector(
    (state: RootState) => state.newActivityModal,
  );
  return (
    <Pressable
      className="mt-2.5 flex-row items-center justify-center rounded-xl border-2"
      style={{
        width: 0.7 * 320,
        height: 47,
        borderColor: "#B8B8B8",
        backgroundColor:
          newActivityModalState.link === link ? "#8DBED8" : "transparent",
      }}
      onPress={() => dispatch(setNewActivityModalSelectedLink(link))}
    >
      <View>{newActivityModalState.link === link ? iconBright : icon}</View>

      <Text
        className="mx-2"
        style={{
          color: newActivityModalState.link === link ? "#FFFFFF" : "#757575",
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};
export default NewActivityModalCard;
