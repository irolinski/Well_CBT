  import { useAudioPlayer } from "expo-audio";
 
  
  //sound imports
  const breatheOutSound = require('@/assets/audio/en_out.mp3');
  const breatheOutSoundPL = require('@/assets/audio/pl_out.mp3');
  const holdSound = require('@/assets/audio/en_hold.mp3');
  const holdInSoundPL = require('@/assets/audio/pl_hold_in.mp3');
  const holdOutSoundPL = require('@/assets/audio/pl_hold_out.mp3');
  const breatheInSound = require('@/assets/audio/en_in.mp3');
  const breatheInSoundPL = require('@/assets/audio/pl_in.mp3');
  const getReadySound = require('@/assets/audio/en_get_ready.mp3');
  const getReadySoundPL = require('@/assets/audio/pl_get_ready.mp3');

  //AUDIO PLAYER SETUP
  const audioPlayer = {
    breatheOutPlayer: useAudioPlayer(breatheOutSound),
    holdPlayer: useAudioPlayer(holdSound),
    breatheOutPlayerPL: useAudioPlayer(breatheOutSoundPL),
    holdInPlayerPL: useAudioPlayer(holdInSoundPL),
    holdOutPlayerPL: useAudioPlayer(holdOutSoundPL),
    breatheInPlayer: useAudioPlayer(breatheInSound),
    breatheInPlayerPL: useAudioPlayer(breatheInSoundPL),
    getReadyPlayer: useAudioPlayer(getReadySound),
    getReadyPlayerPL: useAudioPlayer(getReadySoundPL)
  };

  export default audioPlayer;

