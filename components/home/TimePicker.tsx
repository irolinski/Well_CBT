import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DividerLine from "../DividerLine";

export type TimePickerReturnObj = {
  hours: string;
  minutes: string;
  meridiem: "AM" | "PM" | undefined;
};

type TimePickerTypes = {
  onChange?: (time: TimePickerReturnObj) => void;
  disabled?: boolean;
};

const TimePicker = ({ onChange, disabled }: TimePickerTypes) => {
  // remember to exchange for the time saved in db
  const [hoursInput, setHoursInput] = useState("07");
  const [minutesInput, setMinutesInput] = useState("30");
  const [meridiem, setMeridiem] = useState<"AM" | "PM" | undefined>("PM");

  const handleHoursInputTextChange = (val: string) => {
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
    setHoursInput(numericValue);
  };

  const handleHoursInputEndEditing = () => {
    if (Number(hoursInput) > 12) {
      setHoursInput(`12`);
    }
    if (hoursInput.length === 1) {
      if (hoursInput[0] === "0") {
        setHoursInput(`01`);
      } else {
        setHoursInput(`0${hoursInput[0]}`);
      }
    }
  };

  const handleMinutesInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (!hoursInput) {
      setHoursInput(`01`);
    }
    if (Number(numericValue[0]) > 5) {
      numericValue = `59`;
    }
    setMinutesInput(numericValue);
  };

  const handleMinutesInputEndEditing = () => {
    if (Number(minutesInput[0]) > 5) {
      setMinutesInput(`59`);
    }
    if (minutesInput.length === 1) {
      setMinutesInput(`0${minutesInput[0]}`);
    }
    if (minutesInput.length === 0) {
      setMinutesInput(`00`);
    }
  };

  // init onChange
  useEffect(() => {
    if (onChange) {
      onChange({ hours: hoursInput, minutes: minutesInput, meridiem });
    }
  }, [hoursInput, minutesInput, meridiem]);

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
          value={hoursInput}
          onChangeText={(val) => {
            handleHoursInputTextChange(val);
          }}
          onEndEditing={() => handleHoursInputEndEditing()}
          onBlur={() => {
            handleHoursInputEndEditing();
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
          value={minutesInput}
          onChangeText={(val) => {
            handleMinutesInputTextChange(val);
          }}
          onEndEditing={(val) => {
            handleMinutesInputEndEditing();
          }}
          onBlur={() => {
            handleMinutesInputEndEditing();
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
