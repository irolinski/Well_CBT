import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AdvanceButton from "@/components/global/AdvanceButton";
import ChecklistElement from "@/components/global/ChecklistElement";
import { Colors } from "@/constants/styles/colorTheme";
import { WINDOW_HEIGHT } from "@/constants/styles/values";
import { analyticsLogGoalsQuestionnaireAnswers } from "@/services/firebase/firebase";

const goals_questionnaire_items: string[] = [
  "mood",
  "anxiety",
  "thinking_habits",
  "mindfulness",
  "challenging_thoughts",
  "mood_journal",
  "emotional_awareness",
  "self_esteem",
  "sleep",
  "cbt_exercises",
  "therapy_support",
  "procrastination",
  "phobias_fears",
  "just_browsing",
];

const SkipButton = ({ onPress }: { onPress: () => void }) => {
  const { t } = useTranslation("common");

  return (
    <TouchableOpacity
      className="h-12 flex-row items-center justify-center"
      onPress={() => {
        onPress();
      }}
    >
      <Text style={{ color: Colors.offWhite, fontWeight: 600, fontSize: 16 }}>
        {t("buttons.skip_questionnaire").toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const Onboarding_GoalsQuestionnaireSlide = ({
  slideKey,
  onboardingSlideNum,
  onFinish,
}: {
  slideKey: string;
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const { t } = useTranslation(["home", "common"]);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  return (
    <View className="relative z-10 h-full w-full items-center" key={slideKey}>
      <Text
        className="w-72 text-center text-[26px]"
        style={{
          color: Colors.offWhite,
          marginTop: WINDOW_HEIGHT * 0.125,
          marginBottom: WINDOW_HEIGHT * 0.02,
        }}
      >
        {t("onboarding.accomplish_questionnaire.question")}
      </Text>
      <Text
        className="my-4 text-base"
        style={{
          color: Colors.offWhite,
        }}
      >
        {t("onboarding.accomplish_questionnaire.instruction")}
      </Text>
      <View className="h-1/2 w-full px-2">
        <View
          className="mt-4 w-full items-center justify-center pr-4"
          style={{
            height: WINDOW_HEIGHT * 0.35,
            borderRadius: 12,
            backgroundColor: Colors.whiteSmoke,
          }}
        >
          <ScrollView
            className="mb-4 mt-2 w-full rounded-lg px-4 py-4"
            contentContainerStyle={{
              justifyContent: "space-between",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {goals_questionnaire_items.map((item: string, indexNum: number) => (
              <View className="my-4" key={indexNum}>
                <ChecklistElement
                  text={t(
                    "onboarding.accomplish_questionnaire.options." + item,
                  )}
                  checked={selectedGoals.includes(item)}
                  onPress={() => {
                    selectedGoals.includes(item)
                      ? setSelectedGoals((prev) =>
                          prev.filter((el) => el !== item),
                        )
                      : setSelectedGoals((prev) => [...prev, item]);
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="bottom-1 my-8 w-full flex-row justify-center">
          {selectedGoals.length > 0 ? (
            <AdvanceButton
              title={t("buttons.continue", { ns: "common" })}
              btnStyle={{ backgroundColor: "white", width: "40%" }}
              textStyle={{ color: Colors.blackPearl }}
              onPress={async () => {
                await analyticsLogGoalsQuestionnaireAnswers(selectedGoals);
                onFinish();
              }}
            />
          ) : (
            <SkipButton
              onPress={() => {
                onFinish();
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Onboarding_GoalsQuestionnaireSlide;
