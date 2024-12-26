import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DividerLine from "../DividerLine";

export type TimePickerReturnObj = {
  hour: string;
  minute: string;
  meridiem: "AM" | "PM" | undefined;
};

type TimePickerTypes = {
  onChange?: (time: TimePickerReturnObj) => void;
  disabled?: boolean;
};

const TimePicker = ({ onChange, disabled }: TimePickerTypes) => {
  // remember to exchange for the time saved in db
  const [hourInput, sethourInput] = useState("07");
  const [minuteInput, setminuteInput] = useState("30");
  const [meridiem, setMeridiem] = useState<"AM" | "PM" | undefined>("PM");

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
    sethourInput(numericValue);
  };

  const handlehourInputEndEditing = () => {
    if (Number(hourInput) > 12) {
      sethourInput(`12`);
    }
    if (hourInput.length === 1) {
      if (hourInput[0] === "0") {
        sethourInput(`01`);
      } else {
        sethourInput(`0${hourInput[0]}`);
      }
    }
  };

  const handleminuteInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (!hourInput) {
      sethourInput(`01`);
    }
    if (Number(numericValue[0]) > 5) {
      numericValue = `59`;
    }
    setminuteInput(numericValue);
  };

  const handleminuteInputEndEditing = () => {
    if (Number(minuteInput[0]) > 5) {
      setminuteInput(`59`);
    }
    if (minuteInput.length === 1) {
      setminuteInput(`0${minuteInput[0]}`);
    }
    if (minuteInput.length === 0) {
      setminuteInput(`00`);
    }
  };

  // init onChange
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
