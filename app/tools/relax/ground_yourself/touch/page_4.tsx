import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SecondaryButton from "@/components/SecondaryButton";
import { setNumOfRepeats } from "@/state/features/tools/groundYourselfSlice";
import { AppDispatch, RootState } from "@/state/store";

const Ground_Touch_Page_4 = ({
  objKey,
  handleOneMore,
}: {
  objKey: number;
  handleOneMore: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  return (
    <View className="flex-row items-center justify-center">
      <SecondaryButton
        title="One more"
        onPress={() => {
          dispatch(setNumOfRepeats(groundYourselfToolState.numOfRepeats + 1));
          handleOneMore();
        }}
      />
      <SecondaryButton
        title="Next"
        onPress={() => {
          dispatch(setNumOfRepeats(0));
        }}
      />
    </View>
  );
};

export default Ground_Touch_Page_4;
