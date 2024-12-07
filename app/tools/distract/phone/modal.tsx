import Text from "@/components/global/Text";
import { setShowModal } from "@/state/features/tools/phoneSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions, Modal, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ConversationModal = () => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const dispatch = useDispatch<AppDispatch>();
  const phoneState = useSelector((state: RootState) => state.phone);

  const styles = StyleSheet.create({
    text: {
      color: "#FFFFDD",
      fontSize: 18,
    },
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;

  // front card rotation
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const flipToFrontStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  // back card rotation
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipToBackStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

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

  const refreshCard = async () => {
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
      // Reset position to the left and slide in
      slideAnimation.setValue(-windowWidth); // Move to the left off-screen
      Animated.timing(slideAnimation, {
        toValue: 0, // Slide back to the center
        duration: 400,
        useNativeDriver: true,
      }).start();
    });
    setTimeout(() => setIsRefreshing(false), 1000);
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
          className="p-6"
          style={{
            height: windowHeight * 0.75,
            width: windowWidth * 0.85,
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
            <Text className="text-2xl">Conversation</Text>
          </View>
          <Animated.View
            className="mt-6 items-center justify-start"
            style={{
              transform: [{ translateX: slideAnimation }],
            }}
          >
            <TouchableWithoutFeedback onPress={flipCard}>
              <View className="items-center">
                <Animated.View
                  style={[
                    flipToFrontStyle,
                    {
                      backgroundColor: "#092635",
                      width: windowWidth * 0.65,
                      height: windowHeight * 0.5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                      backfaceVisibility: "hidden",
                    },
                  ]}
                >
                  <Text style={styles.text}>Dream Vacation Spots</Text>
                </Animated.View>
                <Animated.View
                  className="p-4"
                  style={[
                    flipToBackStyle,
                    {
                      width: windowWidth * 0.65,
                      height: windowHeight * 0.5,
                      backgroundColor: "#5C8374",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 5,
                      position: "absolute",
                      //for some reason, it only stays centered if the
                      //first one is relative and the second one is absolute
                      backfaceVisibility: "hidden",
                    },
                  ]}
                >
                  <Text style={styles.text}>
                    Talk about fun places you'd like to visit and what makes
                    them exciting.
                  </Text>
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
          <View className="refresh-btn mt-8 flex-row justify-center">
            <TouchableOpacity
              className="h-16 w-32 items-center justify-center"
              style={{
                backgroundColor: "#4391BC",
                opacity: isRefreshing ? 0.5 : 1,
              }}
              onPress={refreshCard}
              disabled={isRefreshing}
            >
              <View>
                <Feather name="refresh-cw" size={28} color="#FBFBFB" />{" "}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConversationModal;
