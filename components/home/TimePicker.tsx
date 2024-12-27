import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DividerLine from "../DividerLine";

export type TimePickerReturnObj = {
  hour: string;
  minute: string;
  meridiem: "AM" | "PM";
};

type TimePickerTypes = {
  initialTime?: TimePickerReturnObj;
  onChange?: (time: TimePickerReturnObj) => void;
  disabled?: boolean;
};

const defaultInitialTime: TimePickerReturnObj = {
  hour: "07",
  minute: "30",
  meridiem: "PM",
};

const TimePicker = ({ initialTime, onChange, disabled }: TimePickerTypes) => {
  const [hourInput, setHourInput] = useState(
    initialTime?.hour ?? defaultInitialTime.hour,
  );
  const [minuteInput, setMinuteInput] = useState(
    initialTime?.minute ?? defaultInitialTime.minute,
  );
  const [meridiem, setMeridiem] = useState<"AM" | "PM">(
    initialTime?.meridiem ?? defaultInitialTime.meridiem,
  );

  const handlehourInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (Number(numericValue[0]) >= 2) {
      numericValue = `0${Number(numericValue[0])}`;
    }
    if (Number(numericValue) > 12) {
      numericValue = `12`;
    }
    if (numericValue === "00") {
      numericValue = "01";
    }
    setHourInput(numericValue);
  };

  const handlehourInputEndEditing = () => {
    if (Number(hourInput) > 12) {
      setHourInput(`12`);
    }
    if (hourInput.length === 1) {
      if (hourInput[0] === "0") {
        setHourInput(`01`);
      } else {
        setHourInput(`0${hourInput[0]}`);
      }
    }
  };

  const handleminuteInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (!hourInput) {
      setHourInput(`01`);
    }
    if (Number(numericValue[0]) > 5) {
      numericValue = `59`;
    }
    setMinuteInput(numericValue);
  };

  const handleminuteInputEndEditing = () => {
    if (Number(minuteInput[0]) > 5) {
      setMinuteInput(`59`);
    }
    if (minuteInput.length === 1) {
      setMinuteInput(`0${minuteInput[0]}`);
    }
    if (minuteInput.length === 0) {
      setMinuteInput(`00`);
    }
  };

  // format inital time
  useEffect(() => {
    if (initialTime?.hour && initialTime.minute) {
      handlehourInputEndEditing();
      handleminuteInputEndEditing();
    }
  }, []);

  // init onChange functionality
  useEffect(() => {
    if (onChange) {
      onChange({ hour: hourInput, minute: minuteInput, meridiem });
    }
  }, [hourInput, minuteInput, meridiem]);

  return (
    <View className="my-2 flex-row items-center justify-center py-4">
      <View className="flex-row items-center">
        <TextInput
          className="my-2 rounded-md border text-center text-2xl"
          style={{
            height: 56,
            width: 56,
            color: disabled ? "#B8B8B8" : "",
            borderColor: "#d9d9d9",
            backgroundColor: "#FBFBFB",
            textAlignVertical: "top",
          }}
          value={hourInput}
          onChangeText={(val) => {
            handlehourInputTextChange(val);
          }}
          onEndEditing={() => handlehourInputEndEditing()}
          onBlur={() => {
            handlehourInputEndEditing();
          }}
          placeholder="07"
          editable={!disabled}
          keyboardType="numeric"
          numberOfLines={1}
          maxLength={2}
          returnKeyType="done"
        />
        <Text
          className="mx-2 text-2xl"
          style={{ color: disabled ? "#B8B8B8" : "" }}
        >
          :
        </Text>
        <TextInput
          className="my-2 rounded-md border text-center text-2xl"
          style={{
            height: 56,
            width: 56,
            color: disabled ? "#B8B8B8" : "",
            borderColor: "#d9d9d9",
            backgroundColor: "#FBFBFB",
            textAlignVertical: "top",
          }}
          value={minuteInput}
          onChangeText={(val) => {
            handleminuteInputTextChange(val);
          }}
          onEndEditing={(val) => {
            handleminuteInputEndEditing();
          }}
          onBlur={() => {
            handleminuteInputEndEditing();
          }}
          placeholder="30"
          editable={!disabled}
          keyboardType="numeric"
          numberOfLines={1}
          maxLength={2}
          returnKeyType="done"
        />
      </View>
      <View className="mx-2"></View>
      <View
        className="rounded-lg border"
        style={{
          width: 64,
          borderColor: "#d9d9d9",
          backgroundColor: "#FBFBFB",
        }}
      >
        <TouchableOpacity
          className="rounded-t-lg px-4 py-1.5"
          onPress={() => {
            setMeridiem("AM");
          }}
          style={{
            backgroundColor:
              meridiem === "AM"
                ? disabled
                  ? "#B8B8B8"
                  : "#4391BC"
                : "#FFFFFF",
          }}
          disabled={disabled}
        >
          <Text
            className="text-center"
            style={{ color: meridiem === "AM" ? "#FFFFFF" : "#757575" }}
          >
            AM
          </Text>
        </TouchableOpacity>
        <DividerLine width={"100%"} />
        <TouchableOpacity
          className="rounded-b-lg px-4 py-1.5"
          onPress={() => {
            setMeridiem("PM");
          }}
          style={{
            backgroundColor:
              meridiem === "PM"
                ? disabled
                  ? "#B8B8B8"
                  : "#4391BC"
                : "#FFFFFF",
          }}
          disabled={disabled}
        >
          <Text
            className="text-center"
            style={{ color: meridiem === "PM" ? "#FFFFFF" : "#757575" }}
          >
            PM
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default TimePicker;
