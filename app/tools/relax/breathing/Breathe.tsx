import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import { toggleModal } from "@/state/features/tools/breatheSettingsSlice";
import { AppDispatch, RootState } from "@/state/store";
import { Feather } from "@expo/vector-icons";
import BreatheModal from "./modal";
import { LinearGradient } from "expo-linear-gradient";


const Breathe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breatheSettings = useSelector(
    (state: RootState) => state.breatheSettings,
  );

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const outerCircleSize = windowWidth / 1.25;

  // COUNTDOWN STATE
  const [countdownVal, setCountdownVal] = useState(3);
  const [countdownActive, setCountdownActive] = useState(false);

  // MAIN TIMER STATE
  const [breatheInOut, setBreathInOut] = useState(true);
  const [showHold, setShowHold] = useState(false);
  const [counterOn, setCounterOn] = useState(false);
  const [counterVal, setCounterVal] = useState(
    breatheSettings.mode.breatheInTime,
  );
  const [pause, setPause] = useState(false);
  const repsToDo = 5 * breatheSettings.numOfSets;
  const [repsDone, setRepsDone] = useState(0);

  // ANIMATIONS

  // outer circle
  const innerCircleAnim = useRef(new Animated.Value(0.65)).current;
  const [outerCircleExpanded, setOuterCircleExpanded] = useState(false);

  const expandOuterCircle = (duration: number) => {
    Animated.timing(innerCircleAnim, {
      toValue: 0.9,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setOuterCircleExpanded(true);
    // console.log("breathing in");
    setStepsDone((prev) => prev + 1);
    animateProgressBar(breatheSettings.mode.breatheInTime * 1000);
  };

  const shrinkOuterCircle = (duration: number) => {
    Animated.timing(innerCircleAnim, {
      toValue: 0.65,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    setOuterCircleExpanded(false);
    // console.log("breathing out");
    setStepsDone((prev) => prev + 1);
    animateProgressBar(breatheSettings.mode.breatheOutTime * 1000);
  };

  const animateOuterCircle = (duration: number) => {
    outerCircleExpanded
      ? shrinkOuterCircle(duration)
      : expandOuterCircle(duration);
  };

  // handle hold
  const holdCircleColorAnim = useRef(
    new Animated.Value(-outerCircleSize),
  ).current;

  const slideInHoldColor = () => {
    Animated.timing(holdCircleColorAnim, {
      toValue: 0,
      duration: breatheSettings.mode.holdTime * 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const slideOutHoldColor = () => {
    Animated.timing(holdCircleColorAnim, {
      toValue: -outerCircleSize,
      duration: breatheSettings.mode.holdTime * 1000,
      useNativeDriver: true,
    }).start();
  };

  const [holdColorIsActive, setHoldColorIsActive] = useState(false);

  const slideHoldColor = () => {
    setHoldColorIsActive((prev) => !prev);
    !holdColorIsActive ? slideInHoldColor() : slideOutHoldColor();
  };

  const handleHold = () => {
    setShowHold(true);
    // console.log("HOLD!");
    setStepsDone((prev) => prev + 1);
    slideHoldColor();
    animateProgressBar(breatheSettings.mode.holdTime * 1000);
  };

  const handleHoldEnd = () => {
    setShowHold(false);
    // slideOutHoldColor();
  };

  // progress bar
  const barLength = windowWidth * 0.85;
  const progressBarAnim = useRef(new Animated.Value(-barLength)).current;

  const stepsToDo = breatheSettings.mode.doubleHold
    ? 4 * repsToDo
    : 3 * repsToDo;
  const [stepsDone, setStepsDone] = useState(0);
  // console.log(stepsDone + " / " + stepsToDo);

  const animateProgressBar = (duration: number) => {
    let stepsToAdd = breatheSettings.mode.doubleHold
      ? stepsDone + 2
      : stepsDone + 1;
    let val = -barLength + (stepsToAdd / stepsToDo) * barLength;
    Animated.timing(progressBarAnim, {
      toValue: val,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const resetProgressBar = () => {
    Animated.timing(progressBarAnim, {
      toValue: -barLength,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // COUNTER INIT FUNCTIONS
  const resetExercise = () => {
    counterOn && setCounterOn(false);
    setRepsDone(0);
    // setShowHold(false);
    handleHoldEnd();
    setBreathInOut(true);
    setCounterVal(breatheSettings.mode.breatheInTime);
    setStepsDone(0);
    resetProgressBar();
    outerCircleExpanded && shrinkOuterCircle(1000);
  };

  const startExercise = () => {
    resetExercise();
    setCounterOn(true);
  };

  const startExerciseWithCountdown = () => {
    if (!counterOn) {
      resetExercise();
    }
    setCountdownVal(3); // Reset countdown to 3
    setCountdownActive(true); // Start countdown (it will auto-run exercise when it finishes)
  };

  const togglePause = () => {
    setPause((prev) => !prev);
    if (pause) {
      setCounterOn(true); // Resume when unpausing
    }
  };

  const handleStartButton = () => {
    // do nothing if countdown is happening
    if (countdownActive) {
      return;
    }
    // start with countdown if showCountdown is true and the counter is off or paused
    if (breatheSettings.showCountdown && (!counterOn || pause)) {
      startExerciseWithCountdown();
    } else {
      // else, if the counter is off, turn it on
      if (!counterOn) {
        startExercise();
        // if the counter is on, pause
      } else {
        togglePause();
      }
    }
  };

  // PRE-TIMER COUNTDOWN EFFECT
  useEffect(() => {
    if (countdownActive && countdownVal > 0) {
      const countdownInterval = setInterval(() => {
        setCountdownVal((prev) => prev - 1);
      }, 1000); // 1 second intervals for countdown

      return () => clearInterval(countdownInterval);
    } else if (countdownVal === 0) {
      setCountdownActive(false);
      setCounterOn(true);
      setPause(false); // Start the main timer after countdown
    }
  }, [countdownVal, countdownActive]);

  // MAIN TIMER EFFECT
  useEffect(() => {
    if (repsDone === repsToDo) {
      setCounterOn(false);
    }

    if (counterOn && !pause) {
      const counterInterval = setInterval(() => {
        // ANIMATION TRIGGERS

        // first animation
        if (
          !repsDone &&
          breatheInOut &&
          !showHold &&
          counterVal === breatheSettings.mode.breatheInTime
        ) {
          animateOuterCircle(breatheSettings.mode.breatheInTime * 1000);
        }

        if (!breatheSettings.mode.doubleHold) {
          if (breatheInOut && showHold && counterVal === 1) {
            animateOuterCircle(breatheSettings.mode.breatheOutTime * 1000);
          }
        } else if (breatheSettings.mode.doubleHold) {
          if (showHold && counterVal === 1) {
            animateOuterCircle(breatheSettings.mode.breatheInTime * 1000);
          }
        }

        // when the counter reaches 1
        if (counterVal === 1) {
          // if not currently on HOLD - taking a breath in or out
          if (!showHold) {
            // if double hold mode is on (i.e. 'box' mode)
            if (breatheSettings.mode.doubleHold) {
              // add only 0.5 to reps so only after two holds a full rep is present inside state
              setRepsDone(repsDone + 0.5);
              // stop session before last HOLD so that the user doesn't suffocate
              if (repsDone !== repsToDo - 0.5) {
                setCounterVal(breatheSettings.mode.holdTime);
                handleHold();
              }
              // if double hold mode is off (i.e. "4-7-8" mode)
            } else if (!breatheSettings.mode.doubleHold) {
              // if the last breath was a breath in, show "hold"
              if (breatheInOut) {
                setCounterVal(breatheSettings.mode.holdTime);
                handleHold();
                // if the last breath was a breath out, add a rep and show "breathe-in"
              } else if (!breatheInOut) {
                setRepsDone(repsDone + 1);
                if (repsDone < repsToDo - 1) {
                  setBreathInOut(true);
                  setCounterVal(breatheSettings.mode.breatheInTime);
                  //Trigger breathe-in animation only after the the state changes are handled
                  animateOuterCircle(breatheSettings.mode.breatheInTime * 1000);
                }
              }
            }
            // if currently holding breath
          } else if (showHold) {
            // setShowHold(false);
            handleHoldEnd();
            // if last breath was taken in, set the next one to be out
            if (breatheInOut) {
              setCounterVal(breatheSettings.mode.breatheOutTime);
              setBreathInOut(false);

              // if last breath was out, set the next one to be in
            } else if (!breatheInOut) {
              setCounterVal(breatheSettings.mode.breatheInTime);
              setBreathInOut(true);
            }
          }
        } else {
          setCounterVal(counterVal - 1);
        }
      }, 1000);
      return () => clearInterval(counterInterval);
    }
  }, [counterVal, counterOn, pause, repsDone]);

  return (
    <React.Fragment>
      <Image
        className="absolute z-0"
        source={require("@/assets/images/tools/breathe/canes.webp")}
        style={{ width: "100%", height: "100%" }}
        transition={600}
      />
      <LinearGradient
        colors={["#D9D9D9", "#FBFBFB"]} // Updated hex code
        start={[0, 0]}
        end={[0, 1]}
        style={{
          position: "absolute", // Ensures the gradient is on top
          height: "100%",
          width: "100%",
          borderRadius: 8, // Optional: adds rounded corners
          opacity: 0.5,
        }}
      ></LinearGradient>
      <View
        className="m-2 flex-1 items-center justify-center"
        style={{ height: windowHeight }}
      >
        <View
          className={`absolute flex-row justify-between px-8 ${windowHeight > 850 ? "top-20" : "top-12"}`}
          style={{ width: windowWidth, backgroundColor: "transparent" }}
        >
          <Pressable onPress={() => router.back()} className="">
            <View>
              <View>
                <Feather name="x" size={24} color="black" />
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              // show modal
              dispatch(toggleModal(true));
              resetExercise(); //reset timer
            }}
          >
            <View>
              <Feather name="settings" size={24} color="black" />
            </View>
          </Pressable>
        </View>
        <View
          className="relative"
          style={{
            width: windowWidth,
            height: windowHeight / 2,
            bottom: windowHeight * 0.05,
          }}
        >
          {/* Reps counter - for development purposes only */}

          {/* <Text>
            Reps done: {Math.floor(repsDone)}/{repsToDo} 
          </Text> */}

          {/* Outer circle */}
          {showHold && (
            <Text
              className="absolute -translate-y-8 text-center text-4xl"
              style={{ width: windowWidth }}
            >
              {counterVal}
            </Text>
          )}
          <View
            className="absolute justify-center overflow-hidden border"
            style={{
              alignSelf: "center",
              top: 0.04 * windowHeight,
              width: outerCircleSize,
              height: outerCircleSize,
              borderRadius: outerCircleSize,
              // transform: [{ scale: innerCircleAnim }],
              backgroundColor: "#D9D9D9",
              opacity: 0.7,
              borderColor: "#B8B8B8",
            }}
          >
            {/* Main circle */}
          </View>
          {/* Wrapper for the inner circle content */}
          <View
            className="absolute items-center justify-center overflow-hidden"
            style={{
              alignSelf: "center",
              width: outerCircleSize,
              height: outerCircleSize,
              borderColor: "black",
              backgroundColor: "transparent",
              top: 0.04 * windowHeight,
            }}
          >
            <Animated.View
              className="relative z-10 items-center justify-center overflow-hidden"
              style={{
                alignSelf: "center",
                width: outerCircleSize,
                height: outerCircleSize,
                borderRadius: outerCircleSize,
                transform: [{ scale: innerCircleAnim }],
                backgroundColor: "rgba(251, 251, 251, 0.65)",
              }}
            >
              <Animated.View
                className="absolute z-0 overflow-hidden"
                style={{
                  alignSelf: "center",
                  width: outerCircleSize,
                  height: outerCircleSize,
                  transform: [{ translateX: holdCircleColorAnim }],
                  backgroundColor: "rgba(141, 190, 216, 0.65)",
                }}
              />
            </Animated.View>
            <View className="absolute z-10 px-16">
              {/* Show countdown if active, otherwise show the main timer */}
              {countdownActive ? (
                <React.Fragment>
                  <Text className="text-center text-4xl">{countdownVal}</Text>
                </React.Fragment>
              ) : (
                <View className="px-2">
                  {showHold ? (
                    <Text
                      style={{
                        fontFamily: "KodchasanMedium",
                        color: "#27261F",
                      }}
                      className="text-center text-4xl"
                    >
                      HOLD IT!
                    </Text>
                  ) : breatheInOut ? (
                    <Text
                      style={{
                        fontFamily: "KodchasanMedium",
                        color: "#27261F",
                      }}
                      className="text-center text-4xl"
                    >
                      Breathe in!
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "KodchasanMedium",
                        color: "#27261F",
                      }}
                      className="text-center text-4xl"
                    >
                      Breathe out!
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
          {/* Progress bar */}
          <View
            className="absolute items-center justify-center"
            style={{
              width: windowWidth,
              transform: [{ translateY: outerCircleSize + 84 }],
            }}
          >
            <View
              className="overflow-hidden"
              style={{
                width: barLength,
                height: 6,
                backgroundColor: "#FBFBFB",
                borderRadius: 5,
              }}
            >
              <Animated.View
                style={{
                  width: barLength,
                  height: 6,
                  backgroundColor: "#757575",
                  transform: [
                    {
                      translateX: progressBarAnim,
                    },
                  ],
                  top: 0,
                }}
              ></Animated.View>
            </View>
            
            <AdvanceButton
              title={!counterOn || pause ? "Start" : "Pause"}
              disabled={countdownActive} // disable button when count-in is actiive for UI clarity
              onPress={() => handleStartButton()}
              btnStyle={{
                width: barLength,
                backgroundColor: "rgba(251, 251, 251, 0.95)",
                top: 40,
              }}
              textStyle={{ color: "#27261F", opacity: 0.65, fontSize: 17 }}
            />
          </View>
        </View>
      </View>
      <BreatheModal />
    </React.Fragment>
  );
};
export default Breathe;
