import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ToolList } from "@/constants/models/activity_log";
import { fetchStatsData, StatsDataObjType } from "@/db/about";
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
  const [statsData, setStatsData] = useState<StatsDataObjType>();

  useEffect(() => {
    fetchStatsData().then((res) => {
      let fetchedData = res as StatsDataObjType;
      setStatsData(fetchedData);
    });
  }, []);

  return (
    <View className="rounded-xl" style={{ backgroundColor: "#F5F5F5" }}>
      <View className="w-full py-8">
        {
          // if only one stat number, then show a placeholder sign
        }
        <StatRow
          ballSizeParameter={ballSizeParameter.sm}
          caption="Minutes of meditation"
          statNumber={statsData?.relaxTimeSec ?? 0}
          icon={ToolList.breathing.icon}
          ballColor={ballColors[1]}
          indexNum={0}
        />
        <StatRow
          ballSizeParameter={ballSizeParameter.lg}
          caption="Journal Entries"
          statNumber={statsData?.journalCount ?? 0}
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
          ballSizeParameter={ballSizeParameter.xs}
          caption="Thoughts untangled"
          statNumber={statsData?.cbtCount ?? 0}
          icon={ToolList.cda.icon}
          ballColor={ballColors[0]}
          indexNum={4}
        />
      </View>
    </View>
  );
};

export default AboutStats;
