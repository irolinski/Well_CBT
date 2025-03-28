import React, { useCallback, useRef, useState } from "react";
import {
  ColorValue,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import AdvanceButton from "@/components/AdvanceButton";
import ChecklistElement from "@/components/ChecklistElement";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";
import { Feather } from "@expo/vector-icons";

const THIS_SLIDE_KEY = "3";

const goals_questionnaire_items: string[] = [
  "I want to reduce my anxiety",
  "I want to start a mood journal",
  "Nothing in particular - just browsing",
  "I want to practice CBT exercises",
  "I want to supplement my talk therapy",
];

const SkipButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      className="h-12 w-24 flex-row items-center justify-center"
      onPress={() => {}}
    >
      <Text style={{ color: Colors.offWhite, fontWeight: 600, fontSize: 18 }}>
        SKIP
      </Text>
    </TouchableOpacity>
  );
};

const Onboarding_Slide_3 = ({
  onboardingSlideNum,
  onFinish,
}: {
  onboardingSlideNum: number;
  onFinish: () => void;
}) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  return (
    <View
      className="relative z-10 h-full w-full items-center"
      key={THIS_SLIDE_KEY}
    >
      <Text
        className="w-72 text-center text-3xl"
        style={{
          color: Colors.offWhite,
          marginTop: SCREEN_HEIGHT * 0.125,
          marginBottom: 24,
        }}
      >
        What are you hoping to accomplish using WorryFree?
      </Text>
      <Text
        className="my-4 text-base"
        style={{
          color: Colors.offWhite,
        }}
      >
        Choose one or many out of the options below.
      </Text>
      <View className="h-1/2 w-full">
        <View
          className="mt-4 h-3/4 w-full items-center justify-center pr-4"
          style={{
            height: SCREEN_HEIGHT * 0.35,
            borderRadius: 12,
            backgroundColor: Colors.whiteSmoke,
          }}
        >
          <ScrollView
            className="my-4 w-full rounded-lg px-4"
            contentContainerStyle={{
              justifyContent: "space-between",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {goals_questionnaire_items.map((item: string, indexNum: number) => (
              <View className="my-4" key={indexNum}>
                <ChecklistElement
                  text={item}
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
        <View className="bottom-2 mt-8 w-full flex-row justify-center">
          {selectedGoals.length > 0 ? (
            <AdvanceButton
              title={"Continue"}
              btnStyle={{ backgroundColor: "white", width: "40%" }}
              textStyle={{ color: Colors.blackPearl }}
              onPress={() => {
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

export default Onboarding_Slide_3;
