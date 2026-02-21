import breatheOutSound from "@/assets/audio/tools/breathe/en_out.mp3";
import breatheOutSoundPL from "@/assets/audio/tools/breathe/pl_out.mp3";
import holdSound from "@/assets/audio/tools/breathe/en_hold.mp3";
import holdInSoundPL from "@/assets/audio/tools/breathe/pl_hold_in.mp3";
import holdOutSoundPL from "@/assets/audio/tools/breathe/pl_hold_out.mp3";
import breatheInSound from "@/assets/audio/tools/breathe/en_in.mp3";
import breatheInSoundPL from "@/assets/audio/tools/breathe/pl_in.mp3";
import getReadySound from "@/assets/audio/tools/breathe/en_get_ready.mp3";
import getReadySoundPL from "@/assets/audio/tools/breathe/pl_get_ready.mp3";

const breatheSounds = {
  pl: {
    breatheOutSound: breatheOutSoundPL,
    holdInSound: holdInSoundPL,
    holdOutSound: holdOutSoundPL,
    breatheInSound: breatheInSoundPL,
    getReadySound: getReadySoundPL,
  },
  en: {
    breatheOutSound: breatheOutSound,
    holdInSound: holdSound,
    holdOutSound: holdSound,
    breatheInSound: breatheInSound,
    getReadySound: getReadySound,
  },
};

export default breatheSounds;
