import React from "react";
import { View } from "react-native";
import { ToolList } from "@/constants/models/activity_log";
import StatRow from "./StatRow";

export enum ballSizeParameter {
  xxs = 0.175,
  xs = 0.25,
  sm = 0.3,
  md = 0.35,
  lg = 0.4,
  xl = 0.475,
  xxl = 0.525,
}
const ballColors = ["#FF997C", "#008A63", "#F9A947", "#4391BC"];

const AboutStats = () => {
  return (
    //delete constant later
    <View className="rounded-xl" style={{ backgroundColor: "#F5F5F5" }}>
      <View className="w-full py-8">
        <StatRow
          ballSizeParameter={ballSizeParameter.sm}
          caption="Minutes of meditation"
          statNumber={50}
          icon={ToolList.breathing.icon}
          ballColor={ballColors[1]}
          indexNum={0}
        />
        <StatRow
          ballSizeParameter={ballSizeParameter.md}
          caption="Mindful breaths taken"
          statNumber={400}
          icon={ToolList.breathing.icon}
          ballColor={ballColors[0]}
          indexNum={1}
        />
        <StatRow
          ballSizeParameter={ballSizeParameter.lg}
          caption="Journal Entries"
          statNumber={21}
          icon={ToolList.journal.icon}
          ballColor={ballColors[2]}
          indexNum={2}
        />
        <StatRow
          ballSizeParameter={ballSizeParameter.xl}
          caption="Days in log-in streak"
          statNumber={18}
          icon={ToolList.journal.icon}
          ballColor={ballColors[3]}
          indexNum={3}
        />
        <StatRow
          ballSizeParameter={ballSizeParameter.xxs}
          caption="Mood journal entries"
          statNumber={1}
          icon={ToolList.journal.icon}
          ballColor={ballColors[1]}
          indexNum={4}
        />
        <StatRow
          ballSizeParameter={ballSizeParameter.xs}
          caption="Thoughts untangled"
          statNumber={3}
          icon={ToolList.cda.icon}
          ballColor={ballColors[0]}
          indexNum={5}
        />

        <StatRow
          ballSizeParameter={ballSizeParameter.xxl}
          caption="Achievements unlocked"
          statNumber={24}
          icon={ToolList.journal.icon}
          ballColor={ballColors[1]}
          indexNum={6}
        />
      </View>
    </View>
  );
};

export default AboutStats;
