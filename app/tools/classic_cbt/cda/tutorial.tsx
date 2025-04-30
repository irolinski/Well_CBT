import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { tutorialImages } from '@/assets/images/tools/tutorials/tutorials';
import DistortionPill from '@/components/DistortionPill';
import InfoSlideScreen, {
    InfoSlideScreenData
} from '@/components/global/InfoSlideScreenReanimated/InfoSlideScreen';
import Text from '@/components/global/Text';
import CBTDiagramSubtitledImage from '@/components/tools/CBTDiagramSubtitledImage';
import CDADistortionList from '@/components/tools/cda/CDADistortionList';
import CDATextBox from '@/components/tools/cda/CDATextBox';
import { Colors } from '@/constants/styles/colorTheme';
import { SCREEN_HEIGHT } from '@/constants/styles/values';

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
    handleSetTooltipY(y);
    requestAnimationFrame(() => {
      setshowDistortionTooltip(index);
    });
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
              width: 180,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.welcome}
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
        <View
          style={{ width: "100%", marginVertical: 36 }}
          className="items-center"
        >
          <Text
            style={[
              styles.slideTextBodyLead,
              {
                fontSize: 18,
                marginBottom: 42,
                fontWeight: 800,
                textDecorationLine: "underline",
              },
            ]}
          >
            The Cognitive Model
          </Text>
          <CBTDiagramSubtitledImage />
        </View>
      ),
      title: "How your thoughts shape your feelings",
      text: "The key message of Cognitive-Behavioral Therapy is that the way we think (our cognition) shapes the way we feel \n\n...and that, in turn, influences our behaviour. ",
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
      //bold the els
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
      text: "Knowing that our thoughts shape our feelings, “What may I be thinking to make me feel this way” tends to be a helpful question.\n\nSome examples of automatic thoughts are:",
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
          <Text style={styles.slideTextHeader}>
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
          <Text style={styles.slideTextBodyInstruction}>
            On following slides, you’ll see an example of a situation worked out
            with help of this tool.
          </Text>
        </View>
      ),
    },
    {
      id: 8,
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 220,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.example_start}
          />
        </View>
      ),
      title: "Cognitive Distortion Check-In: Real Life Example",
      text: "Cathy works in finance and often chats with her officemate Andy. \n\nOne Monday, she greets him in the kitchen, but he avoids eye contact and harshly says... \n\n“I don’t have time for this right now, Cathy.”\n\n His voice sounded very angry to her. Surprised and confused, Cathy returns to her desk, her mind racing. \n\nUsually, she’d spiral, but this time she decides to try to analyze her thoughts and to look at this awkward situation rationally.",
    },
    {
      id: 9,
      visualItems: (
        <View style={{ paddingBottom: 24 }}>
          <View>
            <Text style={[styles.slideTextBodyLead, { paddingBottom: 8 }]}>
              First, she wrote down the context of the situation:
            </Text>
            <CDATextBox textContent="Andy told me that “he doesn’t have time for this” when I greeted him at work" />
            <Text
              style={[styles.slideTextBodyInstruction, { paddingBottom: 8 }]}
            >
              Hint:
              <Text
                style={[
                  styles.slideTextBodyInstruction,
                  { textDecoration: "italic" },
                ]}
              >
                It’s important to try to describe the situation as objectively
                as it is possible
              </Text>
            </Text>
          </View>
          <View>
            <Text style={[styles.slideTextBodyLead, { paddingBottom: 8 }]}>
              Then, she filled-in the first (out of the many running through her
              head) automatic thought that she noticed - this one seemed the
              loudest:
            </Text>
            <CDATextBox
              textContent={
                "Andy most probably hates me." +
                "\n" +
                "Just like the rest of the people in my office."
              }
            />
          </View>
        </View>
      ),
    },
    {
      id: 10,
      visualItems: (
        <View>
          <View>
            <Text style={styles.slideTextBodyLead}>
              Then, looking at the thought and at the list of cognitive
              distortions, she tried to pick which one could apply to this
              thought:{" "}
            </Text>
            <CDATextBox textContent="Andy most probably hates me. Just like the rest of the people in my office." />
          </View>
          <View>
            <Text
              style={[
                styles.slideTextBodyLead,
                {
                  marginBottom: SCREEN_HEIGHT * 0.035,
                },
              ]}
            >
              While the thought seemed believable at first, when it was still in
              her head, after she wrote it down, it became easier to subject it
              to a sober look. {"\n\n"} She identified the distortion as...
            </Text>
            <View className="items-center">
              <View className="w-36">
                <DistortionPill title={"Mind reading"} checked />
              </View>
            </View>
            <Text
              style={[
                styles.slideTextBodyLead,
                { fontSize: 16, textDecoration: "italic" },
              ]}
            >
              “Yes...{" "}
              <Text
                style={[
                  styles.slideTextBodyLead,
                  { fontWeight: 800, fontSize: 16, textDecoration: "italic" },
                ]}
              >
                mind reading
              </Text>
              <Text
                style={[
                  styles.slideTextBodyLead,
                  { fontSize: 16, textDecoration: "italic" },
                ]}
              >
                ... I may, in fact, be doing it"
              </Text>
              , she thought...
            </Text>
          </View>
        </View>
      ),
    },
    {
      id: 11,
      visualItems: (
        <View>
          <View>
            <Text
              style={[
                styles.slideTextBodyLead,
                { fontSize: 16, textDecoration: "italic" },
              ]}
            >
              <Text
                style={[
                  styles.slideTextBodyLead,
                  { fontSize: 16, textDecoration: "italic" },
                ]}
              >
                "...and just look how miserable it made me... in such a short
                amount of time!"
              </Text>
            </Text>
            <Text
              style={[
                styles.slideTextBodyLead,
                { fontSize: 16, textDecoration: "italic" },
              ]}
            >
              Now was the time to correct this thought to make it more rational.{" "}
            </Text>
          </View>
          <View>
            <CDATextBox
              customStyle={{ height: 180 }}
              textContent={
                "Even though Andy wasn’t nice to me (as he usually is) it’s a stretch to suggest that this may actually mean anything about me. \n\nAnd even if that reaction was related to me, that doesn’t make the “everyone hates me” scenario any more likely."
              }
            />
            <Text style={[styles.slideTextBodyLead, { fontSize: 16 }]}>
              She immediately realised how much more probable this is.
            </Text>
          </View>
        </View>
      ),
    },
    {
      id: 12,
      visualItems: (
        <View
          style={{ width: "100%", height: "100%" }}
          className="h-full items-center justify-center"
        >
          <Image
            contentFit="contain"
            style={{
              width: 300,
              height: "100%",
              marginTop: SCREEN_HEIGHT * 0.05,
            }}
            source={tutorialImages.cda.example_finish}
          />
        </View>
      ),
      title: "Overview",
      text: "Cathy’s situation eventually resolved after a few hours — but this time, she was surprised at how well she kept her cool.\n\nCognitive Therapy exercises help improve well-being by challenging irrational beliefs and replacing them with more balanced, rational ones.\n\nRemember:\nTo create a lasting change, regular practice and consistency are essential.",
    },
  ];

  return (
    <React.Fragment>
      <InfoSlideScreen slideData={CDATutorialSlideData} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  slideTextHeader: {
    fontFamily: "Kodchasan",
    color: Colors.white,
    fontSize: 20,
    fontWeight: 800,
  },
  slideTextBodyInstruction: {
    color: Colors.white,
    marginTop: 24,
    fontSize: 14,
  },
  slideTextBodyLead: {
    color: Colors.white,
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
  },
});

export default CDA_Tutorial;
