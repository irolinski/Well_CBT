import AdvanceButton from "@/components/AdvanceButton";
import Text from "@/components/global/Text";
import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";

const Breathe = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const circleSize = windowWidth / 1.5;

  //settings states
  const holdTime = 2;
  const breatheInTime = 4;
  const breatheOutTime = 4;
  const [repsToDo, setRepsToDo] = useState(3);
  const [repsDone, setRepsDone] = useState(0);
  const [doubleHold, setDoubleHold] = useState(true);

  //circle states
  const [breatheInOut, setBreathInOut] = useState(true);
  const [showHold, setShowHold] = useState(false);
  const [counterOn, setCounterOn] = useState(false);
  const [counterVal, setCounterVal] = useState(breatheInTime);

  useEffect(() => {
    if (repsDone === repsToDo) {
      setCounterOn(false);
    }

    // it's ok now, just need to add custom times for in-out

    if (counterOn) {
      const counterInterval = setInterval(() => {
        //when counter reaches bottom
        if (counterVal === 1) {
          // if HOLD is not active
          if (!showHold) {
            // if selected mode instructs to HOLD between reps (box breathing)
            if (doubleHold) {
              // add one rep per two HOLDs (half rep per one)
              setRepsDone(repsDone + 0.5);
              // if the counter does not end upon the next function run
              if (repsDone !== repsToDo - 0.5) {
                setCounterVal(holdTime);
                setShowHold(true);
                //  if the counter ends, reset state
              } else {
                setBreathInOut(true);
                setCounterVal(breatheInTime);
              }
              // if selected mode doesn't HOLD between reps
            } else {
              // after breath-in show HOLD
              if (breatheInOut === true) {
                setCounterVal(holdTime);
                setShowHold(true);
              } else {
                //after breath-out show breath-in again
                setRepsDone(repsDone + 1);
                setCounterVal(breatheInTime);
                setBreathInOut(true);
              }
            }
            // setCounterVal(holdTime);
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
      }, 500);
      return () => clearInterval(counterInterval);
    }
  }, [counterVal, counterOn]);

  const startExercise = () => {
    setRepsDone(0);
    setShowHold(false);
    setBreathInOut(true);
    setCounterVal(breatheInTime);
    setCounterOn(!counterOn);
  };

  return (
    <React.Fragment>
      <View
        className="m-2 flex-1 items-center justify-center"
        style={{ height: windowHeight }}
      >
        <View
          className="relative border"
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
      <AdvanceButton title={"start/stop"} onPress={() => startExercise()} />
    </React.Fragment>
  );
};
export default Breathe;
