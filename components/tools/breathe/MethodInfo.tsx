import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import MethodInfoCircle from "./MethodInfoCircle";

const MethodInfo = () => {
  const breatheSettings = useSelector(
    (state: RootState) => state.breatheSettings,
  );

  return (
    <View className="flex-row justify-around py-4">
      {breatheSettings.mode.name === "4-7-8" && (
        <React.Fragment>
          <MethodInfoCircle step={"in"} time={4} />
          <MethodInfoCircle step={"hold"} time={7} />
          <MethodInfoCircle step={"out"} time={8} />
        </React.Fragment>
      )}
      {breatheSettings.mode.name === "box" && (
        <React.Fragment>
          <MethodInfoCircle step={"in"} time={4} />
          <MethodInfoCircle step={"hold"} time={4} />
          <MethodInfoCircle step={"out"} time={4} />
          <MethodInfoCircle step={"hold"} time={4} />
        </React.Fragment>
      )}
    </View>
  );
};
export default MethodInfo;
