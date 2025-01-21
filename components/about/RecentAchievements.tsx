import React, { useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import CarouselBadge from "./CarouselBadge";
import CarouselDetails from "./CarouselDetails";

const fakeData = [
  {
    title: "Calm in Chaos",
    description:
      "You have discovered the serenity within. Keep pushing to uncover the layers of your strength. Can you reach 20 challenges?",
    image: require("@/assets/images/about/demo.png"),
  },
  {
    title: "Breaking the Storm",
    description: "Stay focused as you move forward to overcome new challenges.",
    image: require("@/assets/images/about/demo_1.png"),
  },
  {
    title: "Rising Above the Tide",
    description:
      "You’ve reached a new milestone in self-reflection. Continue your journey to achieve even greater clarity.",
    image: require("@/assets/images/about/demo.png"),
  },
  {
    title: "Balancing the Mind",
    description:
      "Your growth is evident with every challenge you face. What new insights will you uncover on the way to 20?",
    image: require("@/assets/images/about/demo_1.png"),
  },
  {
    title: "The Eye of the Storm",
    description:
      "You’ve found focus amidst the noise. Each challenge you conquer is a step toward mastery. Onward to 20!",
    image: require("@/assets/images/about/demo.png"),
  },
];

const RecentAchievements = () => {
  const windowHeight = Dimensions.get("window").height;
  const [selectedIndex, setSelectedIndex] = useState(1);

  const nextPosition = () => {
    if (selectedIndex < fakeData.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };

  const prevPosition = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  // Left swipe gesture
  const onFlingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      nextPosition();
    })
    .runOnJS(true);

  // Right swipe gesture
  const onFlingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      prevPosition();
    })
    .runOnJS(true);

  // Combine gestures
  const handleFlingHorizontal = Gesture.Simultaneous(onFlingLeft, onFlingRight);

  return (
    <GestureDetector gesture={handleFlingHorizontal}>
      <View
        className="overflow-hidden rounded-xl"
        style={{ backgroundColor: "#F5F5F5", height: 430 }}
      >
        {/* Top Section */}
        <View
          className="absolute top-0 w-full flex-row justify-center"
          style={{ height: "50%" }}
        >
          {fakeData.map((datum, indexNum) => (
            <CarouselBadge
              image={datum.image}
              index={indexNum}
              key={indexNum}
              selectedIndex={selectedIndex}
            />
          ))}
        </View>

        {/* Bottom Section */}
        <View
          className="w-full items-center justify-center"
          style={{ top: "40%" }}
        >
          <View
            className="absolute rounded-full"
            style={{
              width: 650,
              height: 650,
              backgroundColor: "#8DBED8",
              top: 0,
            }}
          ></View>

          {selectedIndex > 0 && (
            <TouchableOpacity
              className="absolute left-0 z-30 h-12 w-14 items-start justify-center"
              style={{ top: 0.095 * windowHeight }}
              onPress={() => prevPosition()}
            >
              <Feather name="chevron-left" size={36} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {selectedIndex < fakeData.length - 1 && (
            <TouchableOpacity
              className="absolute right-0 z-30 h-12 w-14 items-end justify-center"
              style={{ top: 0.095 * windowHeight }}
              onPress={() => nextPosition()}
            >
              <Feather name="chevron-right" size={36} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {fakeData.map((datum, indexNum) => (
            <CarouselDetails
              title={datum.title}
              description={datum.description}
              index={indexNum}
              selectedIndex={selectedIndex}
              key={indexNum}
            />
          ))}
        </View>
      </View>
    </GestureDetector>
  );
};

export default RecentAchievements;
