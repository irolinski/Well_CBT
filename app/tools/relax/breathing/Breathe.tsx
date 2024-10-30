import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { toggleModal } from "@/state/features/tools/breatheSettingsSlice";
import BreatheModal from "./modal";

const Breathe = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breatheSettings = useSelector(
    (state: RootState) => state.breatheSettings,
  );

  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const innerCircleSize = windowWidth / 2.5;

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
  const outerCircleAnim = useRef(new Animated.Value(1)).current;
  const [outerCircleExpanded, setOuterCircleExpanded] = useState(false);

  const expandOuterCircle = (duration: number) => {
    Animated.timing(outerCircleAnim, {
      toValue: 2,
      duration: duration,
      useNativeDriver: true,
    }).start();
    setOuterCircleExpanded(true);
    console.log("breathing in");
    setStepsDone((prev) => prev + 1);
    animateProgressBar(breatheSettings.mode.breatheInTime * 1000);
  };

  const shrinkOuterCircle = (duration: number) => {
    Animated.timing(outerCircleAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
    setOuterCircleExpanded(false);
    console.log("breathing out");
    setStepsDone((prev) => prev + 1);
    animateProgressBar(breatheSettings.mode.breatheOutTime * 1000);
  };

  const animateOuterCircle = (duration: number) => {
    outerCircleExpanded
      ? shrinkOuterCircle(duration)
      : expandOuterCircle(duration);
  };

  const handleHold = () => {
    setShowHold(true);
    console.log("HOLD!");
    setStepsDone((prev) => prev + 1);
    animateProgressBar(breatheSettings.mode.holdTime * 1000);
  };

  // progress bar
  const barLength = (3 / 4) * windowWidth;
  const progressBarAnim = useRef(new Animated.Value(-barLength)).current;

  const stepsToDo = breatheSettings.mode.doubleHold
    ? 4 * repsToDo
    : 3 * repsToDo;
  const [stepsDone, setStepsDone] = useState(0);
  console.log(stepsDone + " / " + stepsToDo);

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
    setShowHold(false);
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
              // add only 0.5 so only after two holds a full rep is present inside state
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
            setShowHold(false);
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
      <View
        className="m-2 flex-1 items-center justify-center"
        style={{ height: windowHeight }}
      >
        <View
          className={`absolute flex-row justify-between px-8 ${windowHeight > 850 ? "top-20" : "top-12"}`}
          style={{ width: windowWidth }}
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
              console.log(breatheSettings.showModal);
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
          }}
        >
          <Text>
            Reps done: {Math.floor(repsDone)}/{repsToDo}
          </Text>
          {/* Outer circle */}
          <Animated.View
            className="absolute top-1/3 justify-center bg-slate-200"
            style={{
              alignSelf: "center",
              width: innerCircleSize,
              height: innerCircleSize,
              borderRadius: innerCircleSize,
              transform: [{ scale: outerCircleAnim }],
            }}
          >
            {/* Main circle */}
          </Animated.View>
          <View
            className="absolute top-1/3 items-center justify-center overflow-hidden border bg-slate-400"
            style={{
              alignSelf: "center",
              width: innerCircleSize,
              height: innerCircleSize,
              borderRadius: innerCircleSize / 2,
              borderColor: "black",
            }}
          >
            {/* Show countdown if active, otherwise show the main timer */}
            {countdownActive ? (
              <React.Fragment>
                <Text className="text-4xl">{countdownVal}</Text>
                <Text>It's the final countdown!</Text>
              </React.Fragment>
            ) : (
              <>
                <Text className="text-4xl">{counterVal}</Text>
                {showHold ? (
                  <Text>HOLD IT!</Text>
                ) : breatheInOut ? (
                  <Text>Breathe in!</Text>
                ) : (
                  <Text>Breathe out!</Text>
                )}
              </>
            )}
          </View>
        </View>
        {/* Progress bar */}
        <View
          className="overflow-hidden p-1"
          style={{
            width: barLength,
            height: 20,
          }}
        >
          <Animated.View
            className="h-full w-full bg-red-400"
            style={{
              transform: [
                {
                  translateX: progressBarAnim,
                },
              ],
            }}
          ></Animated.View>
          <View
            className="absolute top-3/4 mx-1 w-full"
            style={{
              height: 1,
              backgroundColor: "grey",
            }}
          ></View>
        </View>
      </View>
      <AdvanceButton
        title={"start/stop"}
        onPress={() => {
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
        }}
      />
      <BreatheModal />
    </React.Fragment>
  );
};
export default Breathe;
