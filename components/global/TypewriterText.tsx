import { useEffect, useRef, useState } from 'react';
import { Animated, ColorValue, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Colors } from '@/constants/styles/colorTheme';

const CURSOR_BLINK_VALUE = 200;

const speedValues = {
  slow: 150,
  medium: 125,
  fast: 100,
  very_fast: 75,
  fastest: 55,
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  speed?: keyof typeof speedValues;
  size?: number;
  textColor?: ColorValue;
  cursorColor?: ColorValue;
  fontFamily?: string;
  letterSpacing?: number;
  lineHeight?: 1.25 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
  hideCursorOnFinish?: boolean;
  showOverflow?: boolean;
  isActive?: boolean;
  delaySeconds?: number;
  cursorDisappearDelay?: number; // New: Controls how long cursor stays after text finishes
  onFinish?: () => void;
}

const TypewriterText = ({
  text = "",
  className = "",
  style,
  speed = "fast",
  size = 24,
  textColor = Colors.offBlack,
  cursorColor,
  fontFamily = "",
  letterSpacing = 1.5,
  lineHeight = 1.5,
  hideCursorOnFinish = true,
  showOverflow = false,
  isActive = true,
  delaySeconds,
  cursorDisappearDelay = 2000, // Default: cursor disappears after 2 seconds
  onFinish,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const cursorOpacity = useState(new Animated.Value(1))[0];

  const startCursorAnimation = () => {
    cursorBlinkAnimation.current = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: CURSOR_BLINK_VALUE,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: CURSOR_BLINK_VALUE,
          useNativeDriver: true,
        }),
      ]),
    );
    cursorBlinkAnimation.current.start();
  };

  const cursorBlinkAnimation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (!typingFinished) {
      startCursorAnimation();
    }
  }, [typingFinished]);

  useEffect(() => {
    if (typingFinished && hideCursorOnFinish) {
      const fadeOut = () => {
        if (cursorBlinkAnimation.current) {
          cursorBlinkAnimation.current.stop();
        }
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: CURSOR_BLINK_VALUE,
          useNativeDriver: true,
        }).start();
      };

      const timeout = setTimeout(fadeOut, cursorDisappearDelay);
      return () => clearTimeout(timeout); // Clean up if unmounts
    }
  }, [typingFinished]);

  useEffect(() => {
    if (delaySeconds) {
      setIsWaiting(true);
      const delayTimeout = setTimeout(() => {
        setIsWaiting(false);
      }, delaySeconds * 1000);
      return () => clearTimeout(delayTimeout);
    }
  }, [delaySeconds]);

  useEffect(() => {
    if (isActive && !isWaiting && charIndex < text.length) {
      const typingSpeed =
        Math.floor(
          Math.random() * (speedValues[speed] - (speedValues[speed] - 100) + 1),
        ) +
        (speedValues[speed] - 100);

      const typingTimeout = setTimeout(() => {
        setDisplayedText(text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(typingTimeout);
    } else if (charIndex === text.length && !typingFinished) {
      setTypingFinished(true);
      if (onFinish) onFinish();
    }
  }, [charIndex, isActive, isWaiting]);

  return (
    <View
      className={className}
      style={[
        {
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          overflow: showOverflow ? "visible" : "hidden",
        },
        style,
      ]}
    >
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
        <Text
          style={{
            fontFamily: fontFamily,
            color: textColor,
            fontSize: size,
            letterSpacing: letterSpacing,
            lineHeight: size * lineHeight,
          }}
        >
          {displayedText}
          {!typingFinished || hideCursorOnFinish ? (
            <Animated.View
              style={{
                width: size / 4,
                height: size,
                transform: [{ translateX: size / 2 }],
                marginBottom: lineHeight * 2.25 * lineHeight - lineHeight,
                opacity: cursorOpacity,
                backgroundColor: cursorColor || textColor,
              }}
            />
          ) : null}
        </Text>
      </View>
    </View>
  );
};

export default TypewriterText;
