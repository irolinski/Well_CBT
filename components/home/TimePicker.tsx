import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import DividerLine from "../DividerLine";
const TimePicker = () => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [meridiem, setMeridiem] = useState<"AM" | "PM" | undefined>("PM");

  const handleHoursInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (Number(numericValue[0]) > 1) {
      numericValue = `0${Number(numericValue[0])}`;
    }
    if (Number(numericValue) > 12) {
      numericValue = `12`;
    }
    setFirstInput(numericValue);
  };

  const handleHoursInputEndEditing = () => {
    if (Number(firstInput) > 12) {
      setFirstInput(`12`);
    }
    if (firstInput.length === 1) {
      if (firstInput[0] === "0") {
        setFirstInput(`01`);
      } else {
        setFirstInput(`0${firstInput[0]}`);
      }
    }
  };

  const handleMinutesInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (!firstInput) {
      setFirstInput(`01`);
    }
    if (Number(numericValue[0]) > 5) {
      numericValue = `59`;
    }
    setSecondInput(numericValue);
  };

  const handleMinutesInputEndEditing = () => {
    if (Number(secondInput[0]) > 5) {
      setSecondInput(`59`);
    }
    if (secondInput.length === 1) {
      setSecondInput(`0${secondInput[0]}`);
    }
    if (secondInput.length === 0) {
      setSecondInput(`00`);
    }
  };
  return (
    <View className="my-2 flex-row items-center justify-center py-4">
      <View className="flex-row items-center">
        <TextInput
          className="my-2 rounded-md border text-center text-2xl"
          style={{
            height: 56,
            width: 56,
            borderColor: "#d9d9d9",
            backgroundColor: "#FBFBFB",
            textAlignVertical: "top",
          }}
          value={firstInput}
          onChangeText={(val) => {
            handleHoursInputTextChange(val);
          }}
          onEndEditing={() => handleHoursInputEndEditing()}
          placeholder="07"
          editable
          keyboardType="numeric"
          numberOfLines={1}
          maxLength={2}
          returnKeyType="done"
        />
        <Text className="mx-2 text-2xl">:</Text>
        <TextInput
          className="my-2 rounded-md border text-center text-2xl"
          style={{
            height: 56,
            width: 56,
            borderColor: "#d9d9d9",
            backgroundColor: "#FBFBFB",
            textAlignVertical: "top",
          }}
          value={secondInput}
          onChangeText={(val) => {
            handleMinutesInputTextChange(val);
          }}
          onEndEditing={(val) => {
            handleMinutesInputEndEditing();
          }}
          placeholder="30"
          editable
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
          className="px-4 py-1.5"
          onPress={() => {
            setMeridiem("AM");
          }}
          style={{ backgroundColor: meridiem === "AM" ? "#4391BC" : "#FFFFFF" }}
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
          className="px-4 py-1.5"
          onPress={() => {
            setMeridiem("PM");
          }}
          style={{ backgroundColor: meridiem === "PM" ? "#4391BC" : "#FFFFFF" }}
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
