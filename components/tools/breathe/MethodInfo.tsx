import { RootState } from "@/state/store";
import { View } from "react-native";
import { useSelector } from "react-redux";
import MethodInfoCircle from "./MethodInfoCircle";

const MethodInfo = () => {
  const breatheSettings = useSelector(
    (state: RootState) => state.breatheSettings,
  );

  return (
    <View className="flex-row justify-around py-4">
      {breatheSettings.mode.name === "4-7-8" && (
        <>
          <MethodInfoCircle step={"in"} time={4} />
          <MethodInfoCircle step={"hold"} time={7} />
          <MethodInfoCircle step={"out"} time={8} />
        </>
      )}
      {breatheSettings.mode.name === "box" && (
        <>
          <MethodInfoCircle step={"in"} time={4} />
          <MethodInfoCircle step={"hold"} time={4} />
          <MethodInfoCircle step={"out"} time={4} />
          <MethodInfoCircle step={"hold"} time={4} />
        </>
      )}
      {breatheSettings.mode.name === "box_deep" && (
        <>
          <MethodInfoCircle step={"in"} time={5} />
          <MethodInfoCircle step={"hold"} time={5} />
          <MethodInfoCircle step={"out"} time={5} />
          <MethodInfoCircle step={"hold"} time={5} />
        </>
      )}
    </View>
  );
};
export default MethodInfo;
