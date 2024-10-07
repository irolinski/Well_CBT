import React, { useEffect, useState } from "react";
import { Button, Dimensions, Modal, Pressable, View } from "react-native";
import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import { Feather } from "@expo/vector-icons";
import { Slider } from "@miblanchard/react-native-slider";

const Breathe = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  //UI state
  const circleSize = windowWidth / 1.5;
  const [showModal, setShowModal] = useState(false);

  const [holdTime, setHoldTime] = useState(7);
  const [breatheInTime, setBreatheInTime] = useState(4);
  const [breatheOutTime, setBreatheOutTime] = useState(8);

  const [numOfSets, setNumOfSets] = useState(1);
  const repsToDo = 5 * numOfSets;
  const [repsDone, setRepsDone] = useState(0);
  const [doubleHold, setDoubleHold] = useState(false);

  //settings state
  const [mode, setMode] = useState<"box" | "4-7-8">("4-7-8");
  const [boxTime, setBoxTime] = useState(4);
  let ellapsedTime = repsToDo * (holdTime + breatheInTime + breatheOutTime);
  if (mode === "box") {
    ellapsedTime = ellapsedTime + (repsToDo - 1) * holdTime;
  }

  // Timer state
  const [breatheInOut, setBreathInOut] = useState(true);
  const [showHold, setShowHold] = useState(false);
  const [counterOn, setCounterOn] = useState(false);
  const [counterVal, setCounterVal] = useState(breatheInTime);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (repsDone === repsToDo) {
      setCounterOn(false);
    }

    if (counterOn && !pause) {
      const counterInterval = setInterval(() => {
        if (counterVal === 1) {
          if (!showHold) {
            if (doubleHold) {
              setRepsDone(repsDone + 0.5);
              if (repsDone !== repsToDo - 0.5) {
                setCounterVal(holdTime);
                setShowHold(true);
              } else {
                setBreathInOut(true);
                setCounterVal(breatheInTime);
              }
            } else {
              if (breatheInOut === true) {
                setCounterVal(holdTime);
                setShowHold(true);
              } else {
                setRepsDone(repsDone + 1);
                setCounterVal(breatheInTime);
                setBreathInOut(true);
              }
            }
          } else {
            setShowHold(false);
            if (breatheInOut) {
              setCounterVal(breatheOutTime);
              setBreathInOut(false);
            } else {
              setCounterVal(breatheInTime);
              setBreathInOut(true);
            }
          }
        } else {
          setCounterVal(counterVal - 1);
        }
      }, 1000); // 1-second interval
      return () => clearInterval(counterInterval);
    }
  }, [counterVal, counterOn, pause, repsDone]);

  const resetExercise = () => {
    counterOn && setCounterOn(false);
    setRepsDone(0);
    setShowHold(false);
    setBreathInOut(true);
    setCounterVal(breatheInTime);
  };

  const startExercise = () => {
    resetExercise();
    setCounterOn(true);
  };

  const togglePause = () => {
    setPause((prev) => !prev);
    if (pause) {
      setCounterOn(true); // Resume when unpausing
    }
  };

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
        <View
          className="relative"
          style={{
            width: windowWidth,
            height: windowHeight / 2,
            borderColor: "grey",
          }}
        >
          <Text>
            Reps done: {Math.floor(repsDone)}/{repsToDo}
          </Text>
          <View
            className="absolute top-[12.5%] justify-center bg-slate-200"
            style={{
              alignSelf: "center",
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
            }}
          >
            <View
              className="items-center justify-center overflow-hidden bg-slate-400"
              style={{
                alignSelf: "center",
                width: circleSize * 0.66,
                height: circleSize * 0.66,
                borderRadius: circleSize / 2,
              }}
            >
              <Text className="text-4xl">{counterVal}</Text>
              {showHold ? (
                <Text>HOLD IT!</Text>
              ) : breatheInOut ? (
                <Text>Breathe in!</Text>
              ) : (
                <Text>Breathe out!</Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <AdvanceButton
        title={"start/stop"}
        onPress={() => {
          !counterOn ? startExercise() : togglePause();
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
            <View className="m-8 flex-row">
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
          </View>
          <View className="m-8">
            <Text>Light/dark mode:</Text>
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
