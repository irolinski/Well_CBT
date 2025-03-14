import { ImageSource } from "expo-image";
import { Href } from "expo-router";
import { toolCardImages } from "@/assets/images/tools/cards/cards";

type ToolName =
  | "breathing"
  | "cda"
  | "ground_yourself"
  | "journal"
  | "phone_a_friend";

type ToolType = {
  name: ToolName;
  card_bg: ImageSource;
  link: Href;
  tutorial_link?: Href;
};

type ToolTypeWithForm = ToolType & { num_of_pages: number };

export const cda_tool: ToolTypeWithForm = {
  name: "cda",
  card_bg: toolCardImages.thoughtsChallange,
  link: "/tools/classic_cbt/cda",
  num_of_pages: 5,
};

export const journal_tool: ToolTypeWithForm = {
  name: "journal",
  card_bg: toolCardImages.journal,
  link: "/tools/classic_cbt/journal",
  num_of_pages: 6,
};

export const groundYourself_tool: ToolType = {
  name: "ground_yourself",
  card_bg: toolCardImages.groundYourself,
  link: "/tools/relax/ground_yourself",
};

export const breathing_tool: ToolType = {
  name: "breathing",
  card_bg: toolCardImages.breathing,
  link: "/tools/relax/breathing",
};
export const phoneAFriend_tool: ToolType = {
  name: "phone_a_friend",
  card_bg: toolCardImages.phone,
  link: "/tools/distract/phone",
};

const cbtTools = { name: "cbt", tools: [cda_tool, journal_tool] };
const relaxTools = {
  name: "relax",
  tools: [groundYourself_tool, breathing_tool],
};
const distractTools = { name: "distraction", tools: [phoneAFriend_tool] };

export const allToolCategoriesArr = [cbtTools, relaxTools, distractTools];
