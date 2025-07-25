import { Image } from "expo-image";
import { Href, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { groundYourselfImages } from "@/assets/images/tools/ground_yourself";
import FadeInView from "@/components/global/FadeInView";
import Text from "@/components/global/Text";
import TypewriterText from "@/components/global/TypewriterText";
import GroundYourselfSlideFrame, {
  getGroundingTime,
} from "@/components/tools/ground_yourself/GroundYourselfSlideFrame";
import {
  ToolCategories,
  ToolList,
  ToolNames,
} from "@/constants/models/home/activity_log";
import { GroundYourselfSlideProps } from "@/constants/models/tools/ground_yourself";
import { Colors } from "@/constants/styles/colorTheme";
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
} from "@/constants/styles/values";
import { handleLogRelaxActivity } from "@/db/tools";
import { analyticsLogFinishToolEvent } from "@/services/firebase/firebase";
import { RootState } from "@/state/store";

const Ground_Finish_Page = ({
  exerciseName,
  objKey,
  exerciseLength,
}: GroundYourselfSlideProps) => {
  const { t } = useTranslation(["tools", "common"]);

  const groundYourselfToolState = useSelector(
    (state: RootState) => state.ground_yourself,
  );
  const [currentInstruction, setCurrentInstruction] = useState<
    | "instruction_1"
    | "instruction_2"
    | "image"
    | "instruction_3"
    | "buttons"
    | null
  >(null);
  useEffect(() => {
    if (groundYourselfToolState.currentSlide === objKey) {
      setCurrentInstruction("instruction_1");
      analyticsLogFinishToolEvent(ToolList.ground_yourself.name as ToolNames);
    }
  }, [groundYourselfToolState.currentSlide]);

  return (
    <GroundYourselfSlideFrame
      exerciseName={exerciseName}
      slideNum={objKey}
      exerciseLenght={exerciseLength}
    >
      <View>
        <TypewriterText
          text={t("tools.ground_yourself.finish.congratulations")}
          size={24}
          isActive={currentInstruction === "instruction_1"}
        ></TypewriterText>
        <View className="mt-6">
          <TypewriterText
            size={20}
            text={t("tools.ground_yourself.finish.instruction_1")}
            delaySeconds={2.5}
            onFinish={() => {
              setCurrentInstruction("instruction_2");
            }}
            isActive={currentInstruction === "instruction_1"}
          />

          <TypewriterText
            className="mt-4"
            textColor={Colors.mainGray}
            size={18}
            text={t("tools.ground_yourself.finish.instruction_2")}
            onFinish={() => {
              setCurrentInstruction("image");
            }}
            isActive={currentInstruction === "instruction_2"}
          />
          <FadeInView
            className={`h-1/3 w-full flex-row justify-center ${SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT ? "my-4" : ""}`}
            inputVal={0}
            outputVal={1}
            duration={3000}
            isActive={currentInstruction === "image"}
            onFinish={() => {
              setCurrentInstruction("instruction_3");
            }}
          >
            <Image
              style={{ width: 250, height: 150 }}
              source={groundYourselfImages.relax_on_logo}
            />
          </FadeInView>
          <TypewriterText
            textColor={Colors.mainGray}
            size={18}
            text={t("tools.ground_yourself.finish.instruction_3")}
            onFinish={() => {
              setCurrentInstruction("buttons");
            }}
            isActive={currentInstruction === "instruction_3"}
          />

          {/* Button row */}
          <FadeInView
            className="w-full flex-row justify-around"
            style={{ marginTop: SCREEN_HEIGHT * 0.025 }}
            isActive={currentInstruction === "buttons"}
            inputVal={0}
            outputVal={1}
          >
            <TouchableOpacity
              className="flex-row justify-center"
              onPress={() => {
                handleLogRelaxActivity(
                  "ground_yourself",
                  getGroundingTime(objKey, exerciseLength),
                );
                router.replace(ToolList.journal.URI);
              }}
            >
              <View className="items-center justify-center">
                <View
                  className="h-12 w-12 flex-row items-center justify-center rounded-full"
                  style={[{ backgroundColor: Colors.mainBlue }]}
                >
                  {ToolCategories.journal.iconBright}
                </View>
                <Text className="mt-2" style={{ letterSpacing: 1.25 }}>
                  {t("buttons.go_to_journal", { ns: "common" })}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-center"
              onPress={() => {
                handleLogRelaxActivity(
                  "ground_yourself",
                  getGroundingTime(objKey, exerciseLength),
                );
                router.replace("tools" as Href);
              }}
            >
              <View className="items-center justify-center">
                <View
                  className="h-12 w-12 flex-row items-center justify-center rounded-full"
                  style={[{ backgroundColor: Colors.mainBlue }]}
                >
                  {ToolCategories.exercise.iconBright}
                </View>
                <Text className="mt-2" style={{ letterSpacing: 1.25 }}>
                  {t("buttons.return_to_tools", { ns: "common" })}
                </Text>
              </View>
            </TouchableOpacity>
          </FadeInView>
        </View>
      </View>
    </GroundYourselfSlideFrame>
  );
};

export default Ground_Finish_Page;
