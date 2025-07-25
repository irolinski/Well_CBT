import { Href } from "expo-router";
import { ReactNode } from "react";
import { Colors } from "@/constants/styles/colorTheme";
import {
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { monthNames } from "../global/dates";

type ToolType = {
  name: string;
  category: keyof typeof ToolCategories;
  icon?: ReactNode;
  iconBright?: ReactNode;
  requiresInput?: boolean;
  URI: Href;
};

const classicCBTToolNames = ["cda", "journal"] as const;
export type classicCBTToolNames = (typeof classicCBTToolNames)[number];

const relaxToolNames = ["breathing", "ground_yourself"] as const;
export type RelaxToolNames = (typeof relaxToolNames)[number];

const distractToolNames = ["phone_a_friend"] as const;

export const activityLogToolNameList = [
  ...classicCBTToolNames,
  ...relaxToolNames,
] as const;

export type ToolNamesInJournal = (typeof activityLogToolNameList)[number];

export const allToolsNameList = [
  ...classicCBTToolNames,
  ...relaxToolNames,
  ...distractToolNames,
] as const;
export type ToolNames = (typeof allToolsNameList)[number];

export type ActivityLogCardProps = {
  toolName: ToolNamesInJournal;
  link: string;
  datetime: string;
  value?: number;
  onPress?: () => void;
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

// below obj should be deleted -- merged w/ tools.tsx contstants file during refactoring
export const ToolList: Record<ToolNamesInJournal, ToolType> = {
  cda: {
    name: "cda",
    category: "exercise",
    icon: (
      <MaterialCommunityIcons
        name="thought-bubble-outline"
        size={32}
        color={Colors.mainGray}
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="thought-bubble-outline"
        size={32}
        color={Colors.white}
      />
    ),
    requiresInput: true,
    URI: "/tools/classic_cbt/cda",
  },
  journal: {
    name: "journal",
    category: "journal",
    icon: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color={Colors.mainGray}
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color={Colors.white}
      />
    ),
    requiresInput: true,
    URI: "/tools/classic_cbt/journal",
  },
  breathing: {
    name: "breathing",
    category: "relax",
    icon: <Feather name="wind" size={32} color={Colors.mainGray} />,
    iconBright: <Feather name="wind" size={32} color={Colors.white} />,
    URI: "/tools/relax/breathing/Breathe",
  },
  ground_yourself: {
    name: "ground_yourself",
    category: "relax",
    icon: <FontAwesome6 name="street-view" size={24} color={Colors.mainGray} />,
    iconBright: (
      <FontAwesome6 name="street-view" size={24} color={Colors.white} />
    ),
    URI: "/tools/relax/ground_yourself",
  },
};

export const ToolCategories: Record<
  "exercise" | "relax" | "journal",
  { icon: ReactNode; iconBright: ReactNode }
> = {
  exercise: {
    icon: (
      <MaterialCommunityIcons
        name="head-cog-outline"
        size={32}
        color={Colors.mainGray}
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="head-cog-outline"
        size={32}
        color={Colors.white}
      />
    ),
  },
  relax: {
    icon: (
      <MaterialCommunityIcons
        name="meditation"
        size={36}
        color={Colors.mainGray}
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="meditation"
        size={36}
        color={Colors.white}
      />
    ),
  },
  journal: {
    icon: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color={Colors.mainGray}
      />
    ),
    iconBright: (
      <MaterialCommunityIcons
        name="notebook-outline"
        size={32}
        color={Colors.white}
      />
    ),
  },
};

export type EntryViewTableRow = {
  activityName: ToolNamesInJournal;
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
