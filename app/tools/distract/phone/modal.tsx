import { Image } from "expo-image";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoImages } from "@/assets/images/global/logo";
import DividerLine from "@/components/global/DividerLine";
import Text from "@/components/global/Text";
import { phoneAFriend_tool } from "@/constants/models/tools/tools";
import { Colors } from "@/constants/styles/colorTheme";
import {
  REFERENCE_SMALL_DEVICE_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WINDOW_HEIGHT,
} from "@/constants/styles/values";
import { achievementHandlersObj } from "@/db/achievements/controllers";
import { setShowModal } from "@/state/features/tools/phoneSlice";
import { AppDispatch, RootState } from "@/state/store";
import handleShare from "@/utils/handleShare";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const TOOL_NAME = phoneAFriend_tool.name;

const topicList = [
  "dream_vacation",
  "favorite_food",
  "funny_animals",
  "science_facts",
  "favorite_weather",
  "would_you_rather",
  "dream_superpowers",
  "favorite_colors",
  "fictional_worlds",
  "favorite_tv_movies",
  "creative_hobbies",
  "outdoor_activity",
  "mysteries",
  "holiday_traditions",
  "space_exploration",
  "cozy_drinks",
  "dream_home",
  "favorite_plants",
  "comfort_foods",
  "night_sky",
  "board_games",
  "rainy_day",
  "cute_animals",
  "favorite_scents",
  "beaches_lakes",
  "clouds_weather",
  "fictional_friends",
  "seasonal_decor",
  "ways_to_relax",
  "nature_sounds",
  "ice_cream",
  "sunsets_sunrises",
  "fictional_creatures",
  "seasonal_activities",
  "cozy_things",
  "describe_surroundings",
  "relaxing_music",
  "movies_that_make_you_smile",
  "relaxing_video_games",
  "sports_outdoor",
  "favorite_soundscapes",
  "inspirational_books",
  "happy_memories",
  "sports_moments",
  "dream_room",
];

const cardColors = [
  { front: "#801515", back: "#F59074" },
  { front: "#D73C11", back: Colors.orange },
  { front: Colors.orange, back: "#F2C122" },
  { front: "#305C32", back: Colors.pastelGreen },
  { front: "#337AF7", back: "#94DAFF" },
];

const ConversationModal = () => {
  const { t } = useTranslation(["tools", "common"]);

  const dispatch = useDispatch<AppDispatch>();
  const phoneState = useSelector((state: RootState) => state.phone);

  // topic and color randomization state
  const [topicNumber, setTopicNumber] = useState(
    (Math.random() * (topicList.length - 1)) | 0,
  );
  const [cardColorNum, setCardColorNum] = useState(
    (Math.random() * (cardColors.length - 1)) | 0,
  );

  // card animation state
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // card rotation front
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  // card rotation back
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // card styling

  const cardStyle = StyleSheet.create({
    all: {
      width: 250,
      height: 400,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 30,
      backfaceVisibility: "hidden",
    },
    back: {
      position: "absolute",
      //for some reason, it only stays centered if the
      //first one is relative and the second one is absolute
      transform: [{ rotateY: backInterpolate }],
      backgroundColor: cardColors[cardColorNum].back,
    },
    front: {
      transform: [{ rotateY: frontInterpolate }],
      backgroundColor: cardColors[cardColorNum].front,
    },
  });

  // card flip animation
  const flipCard = () => {
    if (isFlipped) {
      // animate back to the front side
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      // animate to the back side
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const shareTopic = async () => {
    const message = `${t(`tools.${TOOL_NAME}.modal.message_boilerplate`)} ${t(`tools.${TOOL_NAME}.modal.conversation_topics.${topicList[topicNumber]}.name`)}?`;
    if (!isRefreshing) {
      handleShare(message);
    }
    // give an achievement
    achievementHandlersObj[3]();
  };

  const refreshCard = async () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      if (isFlipped) {
        flipCard();
      }

      // Slide out to the right
      Animated.timing(slideAnimation, {
        toValue: SCREEN_WIDTH, // Slide out completely to the right
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setTopicNumber((Math.random() * (topicList.length - 1)) | 0); //Redraw random topic
        setCardColorNum((Math.random() * (cardColors.length - 1)) | 0); //Redraw random color
        // Reset position to the left and slide in
        slideAnimation.setValue(-SCREEN_WIDTH); // Move to the left off-screen
        Animated.timing(slideAnimation, {
          toValue: 0, // Slide back to the center
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <Modal
      className="items-center justify-center"
      animationType="slide"
      transparent={true}
      visible={phoneState.showModal}
    >
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(20, 20, 20, 0.75)" }}
      >
        <View
          className={`px-6 ${SCREEN_HEIGHT > 850 ? "py-20" : "py-12"}`}
          style={{
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            backgroundColor: Colors.offWhite,
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(setShowModal(false));
            }}
          >
            <View className="flex-row justify-end">
              <Feather name="x" size={24} color={Colors.black} />
            </View>
          </Pressable>
          <View className="flex-row justify-center">
            <Text
              className={`text-center ${SCREEN_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT ? "text-xl" : "text-lg"}`}
            >
              {t(`tools.${TOOL_NAME}.modal.instruction`)}
            </Text>
          </View>
          <View className="h-3/4 justify-center">
            <Animated.View
              className="mt-6 items-center justify-start"
              style={{
                transform: [{ translateX: slideAnimation }],
              }}
            >
              <TouchableWithoutFeedback onPress={flipCard}>
                <View className="items-center">
                  <Animated.View style={[cardStyle.front, cardStyle.all]}>
                    <View className="absolute right-7 top-4 opacity-20">
                      <Image
                        source={logoImages.logo}
                        style={{ width: 80, height: 50 }}
                        contentFit="contain"
                      />
                    </View>
                    <View className="h-full">
                      <View
                        className="justify-center"
                        style={{ height: "65%" }}
                      >
                        <Text
                          className="mt-16 px-6 text-center text-2xl"
                          style={{
                            color: Colors.offWhite,
                            opacity: 0.95,
                            fontWeight: 500,
                          }}
                        >
                          {t(
                            `tools.${TOOL_NAME}.modal.conversation_topics.${topicList[topicNumber]}.name`,
                          )}
                        </Text>
                      </View>
                      <View>
                        <Text
                          className="text-center text-xl font-bold"
                          style={{ color: Colors.offWhite, opacity: 0.35 }}
                        >
                          {t(`tools.${TOOL_NAME}.modal.tap_to_uncover`)}
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                  <Animated.View
                    className="p-4"
                    style={[cardStyle.back, cardStyle.all]}
                  >
                    <View className="absolute right-7 top-4 opacity-20">
                      <Image
                        source={logoImages.logo}
                        style={{ width: 80, height: 50 }}
                        contentFit="contain"
                      />
                    </View>
                    <View className="mb-6">
                      <Text className="px-4 text-xl" style={{ color: "white" }}>
                        {t(
                          `tools.${TOOL_NAME}.modal.conversation_topics.${topicList[topicNumber]}.description`,
                        )}
                      </Text>
                    </View>
                    <View className="mt-4 flex-row opacity-50">
                      <DividerLine width={"50%"} weight={0.25} />
                    </View>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
          <View
            className={`${WINDOW_HEIGHT >= REFERENCE_SMALL_DEVICE_HEIGHT ? "mt-8 h-14" : "mt-6 h-12"} flex-row justify-center`}
          >
            <TouchableOpacity
              className="mx-2 h-full w-24 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: Colors.offWhite,
                opacity: isRefreshing ? 0.5 : 1,
              }}
              onPress={shareTopic}
              disabled={isRefreshing}
            >
              <View>
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  size={24}
                  color={Colors.black}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-2 h-full w-40 items-center justify-center rounded-xl"
              style={{
                backgroundColor: Colors.darkBlue,
                opacity: isRefreshing ? 0.5 : 1,
              }}
              onPress={refreshCard}
              disabled={isRefreshing}
            >
              <View>
                <Feather name="refresh-cw" size={28} color={Colors.offWhite} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConversationModal;
