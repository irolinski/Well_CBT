import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { numToString_addZero } from "@/utils/dates";

export type TimePicker_24hReturnObj = {
  hour: string;
  minute: string;
};

type TimePicker_24hTypes = {
  initialTime?: TimePicker_24hReturnObj;
  onChange?: (time: TimePicker_24hReturnObj) => void;
  disabled?: boolean;
};

const defaultInitialTime: TimePicker_24hReturnObj = {
  hour: "19",
  minute: "30",
};

const TimePicker_24h = ({
  initialTime,
  onChange,
  disabled,
}: TimePicker_24hTypes) => {
  const [hourInput, setHourInput] = useState(
    initialTime?.hour ?? defaultInitialTime.hour,
  );
  const [minuteInput, setMinuteInput] = useState(
    initialTime?.minute ?? defaultInitialTime.minute,
  );

  const handleHourInputChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (Number(numericValue) > 23) {
      numericValue = "23";
    } else if (Number(numericValue) === 24) {
      numericValue = "00";
    }
    setHourInput(numericValue);
  };

  const handleMinuteInputChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (Number(numericValue) > 59) {
      numericValue = "59";
    }
    setMinuteInput(numericValue);
  };

  const handleHourInputBlur = () => {
    if (hourInput.length === 1) {
      setHourInput(numToString_addZero(Number(hourInput)));
    }
  };

  const handleMinuteInputBlur = () => {
    if (minuteInput.length === 1) {
      setMinuteInput(numToString_addZero(Number(minuteInput)));
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange({ hour: hourInput, minute: minuteInput });
    }
  }, [hourInput, minuteInput]);

  return (
    <View className="my-2 flex-row items-center justify-center py-4">
      <View className="flex-row items-center">
        <TextInput
          className="my-2 rounded-md border text-center text-2xl"
          style={{
            height: 56,
            width: 56,
            color: disabled ? Colors.mainGray : "",
            borderColor: Colors.lightGray,
            backgroundColor: Colors.offWhite,
            textAlignVertical: "top",
          }}
          value={hourInput}
          onChangeText={handleHourInputChange}
          placeholder="07"
          editable={!disabled}
          keyboardType="numeric"
          maxLength={2}
          returnKeyType="done"
          onBlur={() => {
            handleHourInputBlur();
          }}
        />
        <Text
          className="mx-2 text-2xl"
          style={{ color: disabled ? Colors.mainGray : "" }}
        >
          :
        </Text>
        <TextInput
          className="my-2 rounded-md border text-center text-2xl"
          style={{
            height: 56,
            width: 56,
            color: disabled ? Colors.mainGray : "",
            borderColor: Colors.lightGray,
            backgroundColor: Colors.offWhite,
            textAlignVertical: "top",
          }}
          value={minuteInput}
          onChangeText={handleMinuteInputChange}
          placeholder="30"
          editable={!disabled}
          keyboardType="numeric"
          maxLength={2}
          returnKeyType="done"
          onBlur={() => handleMinuteInputBlur()}
        />
      </View>
    </View>
  );
};

export default TimePicker_24h;
