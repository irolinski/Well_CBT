import { Image } from 'expo-image';
import { Href, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { groundYourselfImages } from '@/assets/images/tools/ground_yourself';
import FadeInView from '@/components/global/FadeInView';
import Text from '@/components/global/Text';
import GroundYourselfSlideFrame, {
    getGroundingTime
} from '@/components/tools/ground_yourself/GroundYourselfSlideFrame';
import { ToolCategories, ToolList, ToolNames } from '@/constants/models/home/activity_log';
import { GroundYourselfSlideProps } from '@/constants/models/tools/ground_yourself';
import { Colors } from '@/constants/styles/colorTheme';
import { REFERENCE_SMALL_DEVICE_HEIGHT, SCREEN_HEIGHT } from '@/constants/styles/values';
import { handleLogRelaxActivity } from '@/db/tools';
import { analyticsLogFinishToolEvent } from '@/services/firebase/firebase';
import { RootState } from '@/state/store';
import { Typewriter } from 'typewriter4react-native';

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
    | "instruction_4"
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
        <Typewriter
          textStyle={{fontSize: 24, lineHeight: 36, letterSpacing: 1.5}}
          text={t("tools.ground_yourself.finish.congratulations")}
          isActive={currentInstruction === "instruction_1"}
          onFinish={() => {
            setCurrentInstruction("instruction_2");
          }}
        ></Typewriter>
        <View className="mt-6">
          <Typewriter
            textStyle={{fontSize: 20, lineHeight: 30, letterSpacing: 1.5}}
            text={t("tools.ground_yourself.finish.instruction_1")}
            startDelay={2500}
            onFinish={() => {
              setCurrentInstruction("instruction_3");
            }}
            isActive={currentInstruction === "instruction_2"}
          />

          <Typewriter
            containerStyle={{marginTop: 16}}
            textStyle={{color: Colors.mainGray, fontSize: 18, lineHeight: 27, letterSpacing: 1.5}}
            text={t("tools.ground_yourself.finish.instruction_2")}
            onFinish={() => {
              setCurrentInstruction("image");
            }}
            isActive={currentInstruction === "instruction_3"}
          />
          <FadeInView
            className={`h-1/3 w-full flex-row justify-center ${SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT ? "mt-10" : ""}`}
            inputVal={0}
            outputVal={1}
            duration={3000}
            isActive={currentInstruction === "image"}
            onFinish={() => {
              setCurrentInstruction("instruction_4");
            }}
          >
            <Image
              style={{ width: 250, height: 150 }}
              source={groundYourselfImages.relax_on_logo}
            />
          </FadeInView>
          <Typewriter
            textStyle={{color: Colors.mainGray, fontSize: 18, lineHeight: 27, letterSpacing: 1.5}}
            text={t("tools.ground_yourself.finish.instruction_3")}
            onFinish={() => {
              setCurrentInstruction("buttons");
            }}
            isActive={currentInstruction === "instruction_4"}
          />

          {/* Button row */}
          <FadeInView
            className="w-full flex-row justify-around"
            style={{
              marginTop:
                SCREEN_HEIGHT < REFERENCE_SMALL_DEVICE_HEIGHT
                  ? 20
                  : SCREEN_HEIGHT * 0.05,
            }}
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
                router.replace("/tools_tab" as Href);
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
