import { ImageSource } from "expo-image";
import { Href } from "expo-router";
import { toolCardImages } from "@/assets/images/tools/cards/cards";

type ToolType = {
  name: string;
  card_bg: ImageSource;
  //   firstPage_bg: ExpoImage;
  link: Href;
  tutorial_link?: Href;
};

const cda_tool: ToolType = {
  name: "Thoughts Challange",
  card_bg: toolCardImages.thoughtsChallange,
  link: "/tools/classic_cbt/cda",
};

const journal_tool: ToolType = {
  name: "Mood Journal",
  card_bg: toolCardImages.journal,
  link: "/tools/classic_cbt/journal",
};

// const grounding_tool: ToolType = {
//   name: "Ground Yourself",
//   card_bg: toolCardImages.grounding,
//   link: "/tools/classic_cbt/grounding",
// };

const breathing_tool: ToolType = {
  name: "Deep Breathing",
  card_bg: toolCardImages.breathing,
  link: "/tools/relax/breathing",
};
const phone_tool: ToolType = {
  name: "Phone a Friend",
  card_bg: toolCardImages.phone,
  link: "/tools/distract/phone",
};

const cbtTools = { name: "Classic CBT", tools: [cda_tool, journal_tool] };
const relaxTools = { name: "Relax", tools: [breathing_tool] };
const distractTools = { name: "Distract Yourself", tools: [phone_tool] };

export const allToolCategoriesArr = [cbtTools, relaxTools, distractTools];
