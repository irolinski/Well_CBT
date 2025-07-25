import { ImageSource } from "expo-image";
import { Href } from "expo-router";
import { ReactNode } from "react";
import { toolCardImages } from "@/assets/images/tools/cards";
import { Colors } from "@/constants/styles/colorTheme";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type ToolName =
  | "breathing"
  | "cda"
  | "ground_yourself"
  | "journal"
  | "phone_a_friend";

type ToolType = {
  name: ToolName;
  card_bg: ImageSource;
  icon: ReactNode;
  link: Href;
  tutorial_link?: Href;
};

type ToolTypeWithForm = ToolType & { num_of_pages: number };

export const cda_tool: ToolTypeWithForm = {
  name: "cda",
  card_bg: toolCardImages.thoughtsChallange,
  icon: (
    <MaterialCommunityIcons
      name="thought-bubble-outline"
      size={24}
      color={Colors.white}
    />
  ),
  link: "/tools/classic_cbt/cda",
  num_of_pages: 5,
};

export const journal_tool: ToolTypeWithForm = {
  name: "journal",
  card_bg: toolCardImages.journal,
  icon: (
    <MaterialCommunityIcons
      name="notebook-outline"
      size={24}
      color={Colors.white}
    />
  ),
  link: "/tools/classic_cbt/journal",
  num_of_pages: 6,
};

export const groundYourself_tool: ToolType = {
  name: "ground_yourself",
  card_bg: toolCardImages.groundYourself,
  icon: <FontAwesome6 name="street-view" size={24} color={Colors.white} />,
  link: "/tools/relax/ground_yourself",
};

export const breathing_tool: ToolType = {
  name: "breathing",
  card_bg: toolCardImages.breathing,
  icon: <Feather name="wind" size={24} color={Colors.white} />,
  link: "/tools/relax/breathing",
};
export const phoneAFriend_tool: ToolType = {
  name: "phone_a_friend",
  card_bg: toolCardImages.phone,
  icon: <AntDesign name="phone" size={24} color={Colors.white} />,
  link: "/tools/distract/phone",
};

const cbtTools = { name: "cbt", tools: [cda_tool, journal_tool] };
const relaxTools = {
  name: "relax",
  tools: [groundYourself_tool, breathing_tool],
};
const distractTools = { name: "distraction", tools: [phoneAFriend_tool] };

export const allToolCategoriesArr = [cbtTools, relaxTools, distractTools];
