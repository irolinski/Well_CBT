import Text from "@/components/global/Text";
import { setShowModal } from "@/state/features/tools/phoneSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions, Modal, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import topicList from "@/assets/text/conversation_topics.json";
import { Logo } from "@/components/Logo";
import handleShare from "@/utils/handleShare";
import DividerLine from "@/components/DividerLine";

const cardColors = [
  { front: "#801515", back: "#F59074" },
  { front: "#D73C11", back: "#F28E4E" },
  { front: "#F9A947", back: "#F2C122" },
  { front: "#305C32", back: "#81C784" },
  { front: "#337AF7", back: "#94DAFF" },
];

const ConversationModal = () => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

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
    const message = `Hey, I need to get my mind off things. Do you want to talk about something nice like ${topicList[topicNumber].name.toLowerCase()}?`;
    if (!isRefreshing) {
      handleShare(message);
    }
  };

  const refreshCard = async () => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      if (isFlipped) {
        flipCard();
      }

      // Slide out to the right
      Animated.timing(slideAnimation, {
        toValue: windowWidth, // Slide out completely to the right
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setTopicNumber((Math.random() * (topicList.length - 1)) | 0); //Redraw random topic
        setCardColorNum((Math.random() * (cardColors.length - 1)) | 0); //Redraw random color
        // Reset position to the left and slide in
        slideAnimation.setValue(-windowWidth); // Move to the left off-screen
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
          className={`px-6 ${windowHeight > 850 ? "py-20" : "py-12"}`}
          style={{
            height: windowHeight,
            width: windowWidth,
            backgroundColor: "#fbfbfb",
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(setShowModal(false));
            }}
          >
            <View className="flex-row justify-end">
              <Feather name="x" size={24} color="black" />
            </View>
          </Pressable>
          <View className="flex-row justify-center">
            <Text className="text-center text-xl">
              {"Draw a card to pick a \n" + "random coversation topic."}
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
                      <Logo sizePx={64} />
                    </View>
                    <View className="h-full">
                      <View
                        className="justify-center"
                        style={{ height: "65%" }}
                      >
                        <Text
                          className="mt-16 px-6 text-center text-2xl"
                          style={{
                            color: "#FBFBFB",
                            opacity: 0.95,
                            fontWeight: 500,
                          }}
                        >
                          {topicList[topicNumber].name}
                        </Text>
                      </View>
                      <View>
                        <Text
                          className="text-center text-xl font-bold"
                          style={{ color: "#FBFBFB", opacity: 0.35 }}
                        >
                          Tap to uncover
                        </Text>
                      </View>
                    </View>
                  </Animated.View>
                  <Animated.View
                    className="p-4"
                    style={[cardStyle.back, cardStyle.all]}
                  >
                    <View className="absolute right-7 top-4 opacity-20">
                      <Logo sizePx={64} />
                    </View>
                    <View className="mb-6">
                      <Text className="px-4 text-xl" style={{ color: "white" }}>
                        {topicList[topicNumber].description}
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
          <View className="mt-8 flex-row justify-center">
            <TouchableOpacity
              className="mx-2 h-14 w-24 items-center justify-center rounded-xl border"
              style={{
                backgroundColor: "#FBFBFB",
                opacity: isRefreshing ? 0.5 : 1,
              }}
              onPress={shareTopic}
              disabled={isRefreshing}
            >
              <View>
                <MaterialCommunityIcons
                  name="message-processing-outline"
                  size={24}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="mx-2 h-14 w-40 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "#4391BC",
                opacity: isRefreshing ? 0.5 : 1,
              }}
              onPress={refreshCard}
              disabled={isRefreshing}
            >
              <View>
                <Feather name="refresh-cw" size={28} color="#FBFBFB" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConversationModal;
