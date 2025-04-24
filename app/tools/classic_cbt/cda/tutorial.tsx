import { Image } from "expo-image";
import React, { useState } from "react";
import { View } from "react-native";
import { tutorialImages } from "@/assets/images/tools/tutorials/tutorials";
import DistortionPill from "@/components/DistortionPill";
import InfoSlideScreen, {
  InfoSlideScreenData,
} from "@/components/global/InfoSlideScreenReanimated/InfoSlideScreen";
import Text from "@/components/global/Text";
import CBTDiagramSubtitledImage from "@/components/tools/CBTDiagramSubtitledImage";
import CDADistortionList from "@/components/tools/cda/CDADistortionList";
import { Colors } from "@/constants/styles/colorTheme";
import { SCREEN_HEIGHT } from "@/constants/styles/values";

const CDA_Tutorial = () => {
  // tooltip state
  const [showDistortionTooltip, setshowDistortionTooltip] = useState<
    number | null
  >(null);
  const [tooltipY, setTooltipY] = useState(0);
  const handleSetShowDistortionTooltip = (index: number | null) => {
    setshowDistortionTooltip(index);
  };
  const handleSetTooltipY = (y: number) => {
    if (showDistortionTooltip === null) setTooltipY(y);
  };
  const handleShowTooltip = (y: number, index: number) => {
    setTooltipY(y);
    setshowDistortionTooltip(index);
  };

  const CDATutorialSlideData: InfoSlideScreenData[] = [
    {
      id: 1,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.cognitive_distortions}
          />
        </View>
      ),
      title: "Welcome",
      text: "Since it's your first time using this tool, we’d love to give you a quick 2-3 minute tutorial. \n\nWe’ll show you how to effectively work with this tool and also explain the concepts of cognitive distortions and automatic thoughts.",
    },
    {
      id: 2,
      orientation: "text_top",
      visualItems: (
        <View style={{ width: "100%", marginTop: 48 }} className="items-center">
          <CBTDiagramSubtitledImage />
        </View>
      ),
      title: "How your thoughts shape your feelings",
      text: "The key messeage of Cognitive-Behavioral Therapy is that \n\n the way we think (our cognition) shapes the way we feel \n\n...and that, in turn, influences our behaviour.",
    },
    {
      id: 3,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.change_the_way_you_feel}
          />
        </View>
      ),
      title: "Change the way you feel",
      text: "The good news is, by changing how we think, we can change how we feel. \n\n”Ok, but how can I do that?” you may ask...\n\nThis tool aims to help you do this by:\n\n- Identifying an automatic thought...\n- Finding in it a cognitive distortion\n- Replacing the distorted thought with a rational, undistorted one.",
    },
    {
      id: 4,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.automatic_thoughts}
          />
        </View>
      ),
      title: "Automatic Thoughts",
      text: "Automatic thoughts are the quick, often subtle thoughts that pop into our minds throughout the day. \n\nWe may not always be aware of them right away, but with a little guidance, they’re easy to spot.\n\nOn the following page you’ll see some tips on how to notice your automatic thoughts and also some common examples.\n",
    },
    {
      id: 5,
      orientation: "text_top",
      visualItems: (
        <React.Fragment>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              paddingTop: 36,
              paddingBottom: 48,
            }}
          >
            <View className="w-full flex-row justify-end">
              <DistortionPill
                title="“This person is probably mad at me.”"
                checked={false}
                customColor={Colors.white}
              />
            </View>
            <View className="w-full flex-row justify-start">
              <DistortionPill
                title="“I’m such a loser”"
                checked={false}
                customColor={Colors.white}
              />
            </View>
            <View
              className="w-full flex-row justify-end"
              style={{ paddingBottom: 15 }}
            >
              <DistortionPill
                title="“No one really cares about me.”"
                checked={false}
                customColor={Colors.white}
              />
            </View>
            <View
              className="w-full flex-row justify-start"
              style={{ paddingBottom: 30 }}
            >
              <DistortionPill
                title="“This is going to be a terrible day.”"
                checked={false}
                customColor={Colors.white}
              />
            </View>
            <View
              className="w-full flex-row justify-start"
              style={{ paddingBottom: 15 }}
            >
              <DistortionPill
                title="“I don’t deserve this promotion”"
                checked={false}
                customColor={Colors.white}
              />
            </View>
            <View
              className="w-full flex-row justify-end"
              style={{ paddingBottom: 50 }}
            >
              <DistortionPill
                title="“I’ll never get this right!”"
                checked={false}
                customColor={Colors.white}
              />
            </View>
          </View>
        </React.Fragment>
      ),
      title: "How to identify an automatic thought?",
      text: "Knowing that our thoughts shape our feelings, “What may I be thinking to make me feel the way I feel” tends to be a helpful question.\n\nSome examples of automatic thoughts are:",
    },
    {
      id: 6,
      orientation: "text_bottom",
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 280,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.cognitive_distortions}
          />
        </View>
      ),
      title: "Cognitive Distortions",
      text: "After identifying a problematic thought, a helpful next step is to analyze it—ask yourself whether it’s true or untrue, rational or irrational. \n\nCognitive distortions are the common patterns our automatic thoughts often follow when they’re inaccurate or unhelpful.\n\nOn the following slide, you’ll see a list of them.",
    },
    {
      id: 7,
      visualItems: (
        <View
          onTouchStart={(evt) => {
            handleSetTooltipY(evt.nativeEvent.pageY);
          }}
          style={{
            height: "100%",
            justifyContent: "flex-start",
            paddingTop: SCREEN_HEIGHT * 0.05,
          }}
        >
          <Text
            style={{
              fontFamily: "Kodchasan",
              color: Colors.white,
              fontSize: 20,
            }}
          >
            Types of Cognitive Distortions
          </Text>
          <CDADistortionList
            showDistortionTooltip={showDistortionTooltip}
            handleSetShowDistortionTooltip={handleSetShowDistortionTooltip}
            tooltipY={tooltipY}
            handleShowTooltip={handleShowTooltip}
            instructionColor={Colors.white}
            disableSelect
          />
          <Text style={{ color: Colors.white, marginTop: 24 }}>
            On following slides, you’ll see an example of a situation worked out
            with help of this tool
          </Text>
        </View>
      ),
    },
  ];

  return (
    <React.Fragment>
      <InfoSlideScreen slideData={CDATutorialSlideData} />
    </React.Fragment>
  );
};
export default CDA_Tutorial;
