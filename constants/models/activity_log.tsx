import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { monthNames } from "./dates";

type ToolType = {
  name: string;
  category: keyof typeof ToolCategories;
  icon?: ReactNode;
  iconBright?: ReactNode;
  requiresInput?: boolean;
};

export const toolNameList = ["cda", "journal", "breathing"];
export type ToolNames = (typeof toolNameList)[number];

export type JournalCardProps = {
  toolName: ToolNames;
  link: string;
  datetime: string;
  value?: number;
  // hasShowPage: boolean;
};

export type JournalEntryMainType = {
  datetime: string;
  moodValue: number;
  note: string;
};

export type emotionObjType = {
  name: string;
  color?: string;
  strength?: number;
};

export const ToolList: Record<ToolNames, ToolType> = {
  cda: {
    name: "Thoughts Challenge",
    category: "Exercise",
    icon: (
      <MaterialCommunityIcons
        name="thought-bubble-outline"
        size={32}
        color="#B8B8B8"
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="thought-bubble-outline"
        size={32}
        color="#FFFFFF"
      />
    ),
    requiresInput: true,
  },
  journal: {
    name: "Mood Journal",
    category: "Journal",
    icon: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color="#B8B8B8"
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color="#FFFFFF"
      />
    ),
    requiresInput: true,
  },
  breathing: {
    name: "Breathing",
    category: "Relax",
    icon: <Feather name="wind" size={32} color="#B8B8B8" />,
    iconBright: <Feather name="wind" size={32} color="#FFFFFF" />,
  },
};

export const ToolCategories: Record<
  "Exercise" | "Relax" | "Journal",
  { icon: ReactNode; iconBright: ReactNode }
> = {
  Exercise: {
    icon: (
      <MaterialCommunityIcons
        name="head-cog-outline"
        size={32}
        color="#B8B8B8"
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="head-cog-outline"
        size={32}
        color="#FFFFFF"
      />
    ),
  },
  Relax: {
    icon: (
      <MaterialCommunityIcons name="meditation" size={36} color="#B8B8B8" />
    ),
    iconBright: (
      <MaterialCommunityIcons name="meditation" size={36} color="#FFFFFF" />
    ),
  },
  Journal: {
    icon: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color="#B8B8B8"
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color="#FFFFFF"
      />
    ),
  },
};

export type EntryViewTableRow = {
  activityName: ToolNames;
  datetime: string;
  id: number;
  value?: number | undefined;
};

export type EntryListSection = {
  title: string;
  data: EntryViewTableRow[];
};

export type allDataByMonthType = {
  [title: string]: EntryViewTableRow[];
};

// Helper function to format month-year as "MonthName YYYY" --
export const getMonthYearTitle = (dateString: string) => {
  const date = new Date(dateString);
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};
