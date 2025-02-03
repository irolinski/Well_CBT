import { ReactNode } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ToolList } from "../activity_log";

export enum ballSizeParameter {
  min = 0.175,
  max = 0.525,
}
export const ballColors = ["#FF997C", "#008A63", "#F9A947", "#4391BC"];

export type StatsObj = {
  name: string;
  caption: string;
  icon: ReactNode;
  ballSize: {
    min: number;
    max: number;
  };
  count?: number;
};

export const statObjectsList: StatsObj[] = [
  {
    name: "highestVisitStreak",
    caption: "Visited most days in-row",
    icon: (
      <MaterialIcons name="lightbulb-outline" size={24} color={"#B8B8B8"} />
    ),
    ballSize: {
      min: 2,
      max: 40,
    },
  },
  {
    name: "cbtCount",
    caption: "Thoughts untangled",
    icon: ToolList.cda.icon,
    ballSize: {
      min: 3,
      max: 120,
    },
  },
  {
    name: "relaxTimeMin",
    caption: "Minutes of relaxation",
    icon: ToolList.breathing.icon,
    ballSize: {
      min: 3,
      max: 240,
    },
  },
  {
    name: "journalEntries",
    caption: "Journal Entries",
    icon: ToolList.journal.icon,
    ballSize: {
      min: 3,
      max: 160,
    },
  },
];
