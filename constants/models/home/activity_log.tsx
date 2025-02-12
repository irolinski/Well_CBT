import { ReactNode } from 'react';
import { Colors } from '@/constants/styles/colorTheme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { monthNames } from '../dates';

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
  },
  breathing: {
    name: "breathing",
    category: "relax",
    icon: <Feather name="wind" size={32} color={Colors.mainGray} />,
    iconBright: <Feather name="wind" size={32} color={Colors.white} />,
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
