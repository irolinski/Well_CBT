import { useTranslation } from "react-i18next";
import { View } from "react-native";
import Text from "@/components/global/Text";
import { breathing_tool } from "@/constants/models/tools";
import { Colors } from "@/constants/styles/colorTheme";

const TOOL_NAME = breathing_tool.name;

type MethodInfoCircleProps = {
  step: "in" | "out" | "hold";
  time: number;
};

const MethodInfoCircle = ({ step, time }: MethodInfoCircleProps) => {
  const { t } = useTranslation("tools");

  return (
    <View className="mx-2 items-center">
      <View
        className="h-20 w-20 items-center justify-center rounded-full border"
        style={{
          backgroundColor: Colors.lightGray,
          borderColor: Colors.mainGray,
        }}
      >
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{
            backgroundColor:
              step === "hold" ? Colors.mainGray : Colors.offWhite,
          }}
        >
          {step === "in" && (
            <Text className="text-center" style={{ fontSize: 12 }}>
              {t(`tools.${TOOL_NAME}.exercise.commands.breathe_in`)}
            </Text>
          )}
          {step === "hold" && (
            <Text className="text-center" style={{ fontSize: 12 }}>
              {t(`tools.${TOOL_NAME}.exercise.commands.hold`)}
            </Text>
          )}
          {step === "out" && (
            <Text className="text-center" style={{ fontSize: 12 }}>
              {t(`tools.${TOOL_NAME}.exercise.commands.breathe_out`)}
            </Text>
          )}
        </View>
      </View>
      <Text className="pt-3 text-base" style={{ color: Colors.mainGray }}>
        {time}s
      </Text>
    </View>
  );
};
export default MethodInfoCircle;
