import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import { Feather } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";
import { router } from "expo-router";

const Breathe = () => {
  //UI STATE
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const innerCircleSize = windowWidth / 2.5;
  const [showModal, setShowModal] = useState(false);

  // COUNTDOWN STATE
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownVal, setCountdownVal] = useState(3);
  const [countdownActive, setCountdownActive] = useState(false);

  // MAIN TIMER STATE
  const [holdTime, setHoldTime] = useState(7);
  const [breatheInTime, setBreatheInTime] = useState(4);
  const [breatheOutTime, setBreatheOutTime] = useState(8);
  const [breatheInOut, setBreathInOut] = useState(true);
  const [showHold, setShowHold] = useState(false);
  const [counterOn, setCounterOn] = useState(false);
  const [counterVal, setCounterVal] = useState(breatheInTime);
  const [pause, setPause] = useState(false);
  const [numOfSets, setNumOfSets] = useState(1);
  const repsToDo = 5 * numOfSets;
  const [repsDone, setRepsDone] = useState(0);
  const [doubleHold, setDoubleHold] = useState(false);

  //SETTINGS
  const [mode, setMode] = useState<"box" | "4-7-8">("4-7-8");
  const [boxTime, setBoxTime] = useState(4);
  let ellapsedTime = repsToDo * (holdTime + breatheInTime + breatheOutTime);
  if (mode === "box") {
    ellapsedTime = ellapsedTime + (repsToDo - 1) * holdTime; // add time from double hold
  }

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
    animateProgressBar(breatheInTime * 1000);
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
    animateProgressBar(breatheOutTime * 1000);
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
    animateProgressBar(holdTime * 1000);
  };

  // progress bar
  const barLength = (3 / 4) * windowWidth;
  const progressBarAnim = useRef(new Animated.Value(-barLength)).current;

  const stepsToDo = doubleHold ? 4 * repsToDo : 3 * repsToDo;
  const [stepsDone, setStepsDone] = useState(0);
  console.log(stepsDone + " / " + stepsToDo);

  const animateProgressBar = (duration: number) => {
    let stepsToAdd = doubleHold ? stepsDone + 2 : stepsDone + 1;
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
    setCounterVal(breatheInTime);
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
          counterVal === breatheInTime
        ) {
          animateOuterCircle(breatheInTime * 1000);
        }

        if (!doubleHold) {
          if (breatheInOut && showHold && counterVal === 1) {
            animateOuterCircle(breatheOutTime * 1000);
          }
        } else if (doubleHold) {
          if (showHold && counterVal === 1) {
            animateOuterCircle(breatheInTime * 1000);
          }
        }

        // when the counter reaches 1
        if (counterVal === 1) {
          // if not currently on HOLD - taking a breath in or out
          if (!showHold) {
            // if double hold mode is on (i.e. 'box' mode)
            if (doubleHold) {
              // add only 0.5 so only after two holds a full rep is present inside state
              setRepsDone(repsDone + 0.5);
              // stop session before last HOLD so that the user doesn't suffocate
              if (repsDone !== repsToDo - 0.5) {
                setCounterVal(holdTime);
                handleHold();
              }
              // if double hold mode is off (i.e. "4-7-8" mode)
            } else if (!doubleHold) {
              // if the last breath was a breath in, show "hold"
              if (breatheInOut) {
                setCounterVal(holdTime);
                handleHold();
                // if the last breath was a breath out, add a rep and show "breathe-in"
              } else if (!breatheInOut) {
                setRepsDone(repsDone + 1);
                if (repsDone < repsToDo - 1) {
                  setBreathInOut(true);
                  setCounterVal(breatheInTime);
                  //Trigger breathe-in animation only after the the state changes are handled
                  animateOuterCircle(breatheInTime * 1000);
                }
              }
            }
            // if currently holding breath
          } else if (showHold) {
            setShowHold(false);
            // if last breath was taken in, set the next one to be out
            if (breatheInOut) {
              setCounterVal(breatheOutTime);
              setBreathInOut(false);

              // if last breath was out, set the next one to be in
            } else if (!breatheInOut) {
              setCounterVal(breatheInTime);
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
        <Pressable
          className="absolute right-8 top-8"
          onPress={() => {
            // show modal
            setShowModal(true);
            //reset timer
            resetExercise();
          }}
        >
          <View>
            <Feather name="settings" size={24} color="black" />
          </View>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          className="absolute left-8 top-8"
        >
          <View>
            <View>
              <Feather name="x" size={24} color="black" />
            </View>
          </View>
        </Pressable>
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
          {/* <AdvanceButton
            className="z-20"
            title="Animation test"
            onPress={() => {
              setTimeout(() => animateProgressBar(1000), 1000);
              resetProgressBar();
            }}
          /> */}
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
          if (showCountdown && (!counterOn || pause)) {
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

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View
          style={{
            top: windowHeight / 5,
            width: windowWidth,
            height: windowHeight / 1.1,
            backgroundColor: "grey",
            padding: 24,
          }}
        >
          <Pressable
            className="absolute right-0"
            onPress={() => {
              setShowModal(false);
              setCounterVal(breatheInTime);
            }}
          >
            <View>
              <Feather name="x" size={24} color="black" />
            </View>
          </Pressable>
          <View className="m-8 mx-auto">
            <Text>Settings:</Text>
            <View className="flex-row">
              <View className="mx-6 flex-row">
                <Pressable
                  onPress={() => {
                    setMode("box");
                    setDoubleHold(true);
                    setBreatheInTime(boxTime);
                    setHoldTime(boxTime);
                    setBreatheOutTime(boxTime);
                  }}
                >
                  <View
                    className="h-10 w-10 rounded-lg border"
                    style={{ borderColor: "white" }}
                  >
                    {mode === "box" && (
                      <View className="mx-auto">
                        <Feather name="check" size={22} color="#F7F7F7" />
                      </View>
                    )}
                  </View>
                </Pressable>
                <Text>Box breathing</Text>
              </View>
              <View className="mx-6 flex-row">
                <Pressable
                  onPress={() => {
                    setMode("4-7-8");
                    setDoubleHold(false);
                    setBreatheInTime(4);
                    setHoldTime(7);
                    setBreatheOutTime(8);
                  }}
                >
                  <View
                    className="h-10 w-10 rounded-lg border"
                    style={{ borderColor: "white" }}
                  >
                    {mode === "4-7-8" && (
                      <View className="mx-auto">
                        <Feather name="check" size={22} color="#F7F7F7" />
                      </View>
                    )}
                  </View>
                </Pressable>
                <Text>4-7-8</Text>
              </View>
            </View>
            {mode === "box" && (
              <View className="mx-8 flex-row">
                <Text>Box breath length(s):</Text>
                <View className="h-10 w-20 flex-row rounded-lg border">
                  <Pressable
                    className="w-1/3 border"
                    onPress={() => {
                      if (boxTime > 4) {
                        setBoxTime(boxTime - 1);
                        setBreatheInTime(boxTime - 1);
                        setBreatheOutTime(boxTime - 1);
                        setHoldTime(boxTime - 1);
                      }
                    }}
                  >
                    <Text>-</Text>
                  </Pressable>
                  <View className="w-1/3 border">
                    <Text>{boxTime}</Text>
                  </View>
                  <Pressable
                    className="w-1/3 border"
                    onPress={() => {
                      if (boxTime < 7) {
                        setBoxTime(boxTime + 1);
                        setBreatheInTime(boxTime + 1);
                        setBreatheOutTime(boxTime + 1);
                        setHoldTime(boxTime + 1);
                      }
                    }}
                  >
                    <Text>+</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
          <View className="m-8">
            <Text>Light/dark mode:</Text>
          </View>
          <View className="mx-8 flex-row">
            <Pressable
              onPress={() => {
                setShowCountdown((prev) => !prev);
              }}
            >
              <View
                className="h-10 w-10 rounded-lg border"
                style={{ borderColor: "white" }}
              >
                {showCountdown && (
                  <View className="mx-auto">
                    <Feather name="check" size={22} color="#F7F7F7" />
                  </View>
                )}
              </View>
            </Pressable>
            <Text>Show countdown</Text>
          </View>
          <View className="m-8">
            <Text>Method:</Text>
          </View>
          <View className="m-8">
            <Text>Session time:</Text>
            <View>
              <Slider
                minimumValue={0}
                maximumValue={0.6}
                value={(numOfSets - 1) / 10}
                onValueChange={(evt) =>
                  setNumOfSets(Math.floor(Number(evt) * 10 + 1))
                }
              />
              <Text>
                {numOfSets} sets ({(ellapsedTime - (ellapsedTime % 60)) / 60}m{" "}
                {ellapsedTime % 60}s)
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};
export default Breathe;
