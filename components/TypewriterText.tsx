import { useEffect, useState } from "react";
import { Animated, Text, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

const speedValues = {
  slow: 150,
  medium: 125,
  fast: 100,
  very_fast: 75,
  fastest: 50,
};

interface TypewriterTextProps {
  text: string;
  speed?: keyof typeof speedValues;
  size?: number;
  color?: string;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: 1.25 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
  hideCursorOnFinish?: boolean;
  showOverflow?: boolean;
  isActive?: boolean;
  delaySeconds?: number;
}

const TypewriterText = ({
  text = "",
  speed = "fast",
  size = 24,
  color = Colors.offBlack,
  fontFamily = "",
  letterSpacing = 1.5,
  lineHeight = 1.5,
  hideCursorOnFinish = true,
  showOverflow = false, //true prevents visial glitches in some usecases
  isActive = true,
  delaySeconds,
}: TypewriterTextProps) => {
  // state
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  // Cursor Animation
  const cursorOpacity = useState(new Animated.Value(1))[0];

  const startCursorAnimation = () => {
    cursorOpacity.setValue(1);
    cursorAnimation();
  };

  const cursorAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // Run cursor blinking
  useEffect(() => {
    startCursorAnimation();
  }, []);

  // Hide/Leave cursor onFinish
  useEffect(() => {
    if (hideCursorOnFinish) {
      if (displayedText.length === text.length - 1) {
        setTimeout(() => {
          cursorOpacity.stopAnimation();
          cursorOpacity.setValue(0);
        }, 1500);
      }
    }
  }, [charIndex]);

  // Delay run if needed
  useEffect(() => {
    if (delaySeconds) {
      setIsWaiting(true);

      const delayTimeout = setTimeout(() => {
        setIsWaiting(false);
      }, delaySeconds * 1000);

      return () => clearTimeout(delayTimeout); // Cleanup timeout
    } else {
      setIsWaiting(false);
    }
  }, [isActive]);

  // Run typing Animation
  useEffect(() => {
    if (isActive && !isWaiting) {
      let typingSpeed =
        Math.floor(
          Math.random() * (speedValues[speed] - (speedValues[speed] - 100) + 1),
        ) +
        (speedValues[speed] - 100); // make the timeOut time time a bit random for the sake of realism

      const typingTimeOut = setTimeout(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }
      }, typingSpeed);

      return () => clearTimeout(typingTimeOut);
    }
  }, [charIndex, isActive, isWaiting]);

  return (
    <View
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        overflow: showOverflow ? "visible" : "hidden",
      }}
    >
      {/* Placeholder Text Component
       - it's here to make space for the actual text so that the
       View component doesn't grow when the animation runs */}
      <Text
        style={{
          fontFamily: fontFamily,
          fontSize: size,
          opacity: 0,
          letterSpacing: letterSpacing,
          lineHeight: size * lineHeight,
        }}
      >
        {text}
      </Text>
      <View className="absolute h-full w-full">
        {/* Actual Text Component */}
        <Text
          style={{
            fontFamily: fontFamily,
            color: color,
            fontSize: size,
            letterSpacing: letterSpacing,
            lineHeight: size * lineHeight,
          }}
        >
          {displayedText}
          {/* Cursor Animation */}
          <Animated.View
            style={{
              width: size / 4,
              height: size,
              transform: [{ translateX: size / 2 }],
              marginBottom: lineHeight * 2.25 * lineHeight - lineHeight,
              opacity: cursorOpacity,
              backgroundColor: color,
            }}
          />
        </Text>
      </View>
    </View>
  );
};

export default TypewriterText;
