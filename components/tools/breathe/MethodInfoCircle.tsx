import Text from "@/components/global/Text";
import { View } from "react-native";

type MethodInfoCircleProps = {
  step: "in" | "out" | "hold";
  time: number;
};

const MethodInfoCircle = ({ step, time }: MethodInfoCircleProps) => {
  return (
    <View className="mx-2 items-center">
      <View
        className="h-20 w-20 items-center justify-center rounded-full border"
        style={{ backgroundColor: "#E4E4E4", borderColor: "#B8B8B8" }}
      >
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: step === "hold" ? "#B8B8B8" : "#F4F4F4" }}
        >
          {step === "in" && (
            <Text className="text-center" style={{ fontSize: 12 }}>
              Breathe in
            </Text>
          )}
          {step === "hold" && (
            <Text className="text-center" style={{ fontSize: 12 }}>
              Hold
            </Text>
          )}
          {step === "out" && (
            <Text className="text-center" style={{ fontSize: 12 }}>
              Breathe out
            </Text>
          )}
        </View>
      </View>
      <Text className="pt-3 text-base" style={{ color: "#B8B8B8" }}>
        {time}s
      </Text>
    </View>
  );
};
export default MethodInfoCircle;
