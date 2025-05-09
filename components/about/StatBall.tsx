import { useEffect, useRef, useState } from "react";
import { Animated, ColorValue, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

type StatBallType = {
  ballSize: number;
  statNumber: number;
  ballColor: ColorValue;
  indexNum?: number;
};

const StatBall = ({
  ballSize,
  statNumber,
  ballColor,
  indexNum,
}: StatBallType) => {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const animatedNumber = useRef(new Animated.Value(0)).current;
  const [displayedNumber, setDisplayedNumber] = useState(0);

  let delayTime = 0;
  if (indexNum) {
    delayTime = (indexNum + 1) * 500;
  }

  const animateBallScale = () => {
    Animated.sequence([
      Animated.delay(delayTime),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateNumberCountUp = () => {
    Animated.sequence([
      Animated.delay(delayTime),
      Animated.timing(animatedNumber, {
        toValue: statNumber,
        duration: 3000,
        useNativeDriver: false, // Numbers can't use native driver
      }),
    ]).start();

    // Everytime the animation value changes, change the displayed number
    const listener = animatedNumber.addListener(({ value }) => {
      setDisplayedNumber(Math.round(value)); // Round to avoid decimals
    });

    return () => {
      animatedNumber.removeListener(listener);
      // Clean up listener -- has to be here for it to work and to prevent memory leaks
    };
  };

  useEffect(() => {
    animateBallScale();
    animateNumberCountUp();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={{
          width: ballSize,
          height: ballSize,
          backgroundColor: ballColor,
          borderRadius: ballSize / 2,
          transform: [{ scale: animatedScale }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={{ color: Colors.white, fontSize: 26, fontWeight: "bold" }}
        >
          {displayedNumber}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default StatBall;
