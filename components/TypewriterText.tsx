import { Animated, Text, View } from "react-native";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: "slow" | "medium" | "fast";
  size?: number;
  color?: string;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
  hideCursorOnFinish?: boolean;
}

const speedValues = {
  slow: 300,
  medium: 200,
  fast: 100,
};

const TypewriterText = ({
  text = "",
  speed = "fast",
  size = 24,
  color = "black",
  fontFamily = "",
  letterSpacing = 1.5,
  lineHeight = 1.5,
  hideCursorOnFinish = true,
}: TypewriterTextProps) => {
  // state
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

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

  useEffect(() => {
    startCursorAnimation();
  }, []);

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

  // Typing Animation
  useEffect(() => {
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
  }, [charIndex]);

  return (
    <View
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
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
