import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

type ToolType = {
  name: string;
  category: keyof typeof ToolCategories;
  icon?: ReactNode;
};

export const toolNameList = ["cda", "journal", "breathing"];
export type ToolNames = (typeof toolNameList)[number];

export const ToolList: Record<ToolNames, ToolType> = {
  cda: {
    name: "Thoughts Challange",
    category: "Exercise",
    icon: (
      <MaterialCommunityIcons
        name="thought-bubble-outline"
        size={32}
        color="#B8B8B8"
      />
    ),
  },
  journal: { name: "Mood Journal", category: "Journal" },
  breathing: {
    name: "Breathing",
    category: "Relax",
    icon: <Feather name="wind" size={32} color="#B8B8B8" />,
  },
};

export const ToolCategories: Record<
  "Exercise" | "Relax" | "Journal",
  { icon: ReactNode }
> = {
  Exercise: {
    icon: (
      <MaterialCommunityIcons
        name="head-cog-outline"
        size={32}
        color="#B8B8B8"
      />
    ),
  },
  Relax: {
    icon: (
      <MaterialCommunityIcons name="meditation" size={36} color="#B8B8B8" />
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
  },
};
