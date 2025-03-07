import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";

export type DatePickerReturnObj = {
  day: string;
  month: string;
  year: string;
};

type DatePickerPropTypes = {
  initialTime?: DatePickerReturnObj;
  onChange?: (time: DatePickerReturnObj) => void;
  showInputTitles?: boolean;
  dateFormat?: "YMD" | "DMY";
  disabled?: boolean;
};

const defaultInitialDate: DatePickerReturnObj = {
  day: "",
  month: "",
  year: "",
};

type DatePickerInputPropTypes = {
  value: string;
  onChangeText: (value: string) => void;
  onEndEditing?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  showInputTitle?: boolean;
};

const DayTextInput = ({
  value,
  onChangeText,
  onEndEditing,
  onBlur,
  disabled = false,
  showInputTitle = true,
}: DatePickerInputPropTypes) => {
  return (
    <View className="items-center">
      <TextInput
        className="my-2 rounded-md border text-center text-2xl"
        style={{
          height: 56,
          width: 68,
          color: disabled ? Colors.mainGray : "",
          borderColor: Colors.lightGray,
          backgroundColor: Colors.offWhite,
          textAlignVertical: "top",
        }}
        value={value}
        onChangeText={(val) => {
          onChangeText && onChangeText(val);
        }}
        onEndEditing={() => {
          onEndEditing && onEndEditing();
        }}
        onBlur={() => {
          onBlur && onBlur();
        }}
        placeholder="DD"
        editable={!disabled}
        keyboardType="numeric"
        numberOfLines={1}
        maxLength={2}
        returnKeyType="done"
      />
      <View className="h-4">{showInputTitle ? <Text>Day</Text> : null}</View>
    </View>
  );
};

const MonthTextInput = ({
  value,
  onChangeText,
  onEndEditing,
  onBlur,
  disabled = false,
  showInputTitle = true,
}: DatePickerInputPropTypes) => {
  return (
    <View className="items-center">
      <TextInput
        className="my-2 rounded-md border text-center text-2xl"
        style={{
          height: 56,
          width: 68,
          color: disabled ? Colors.mainGray : "",
          borderColor: Colors.lightGray,
          backgroundColor: Colors.offWhite,
          textAlignVertical: "top",
        }}
        value={value}
        onChangeText={(val) => {
          onChangeText(val);
        }}
        onEndEditing={() => {
          onEndEditing && onEndEditing();
        }}
        onBlur={() => {
          onBlur && onBlur();
        }}
        placeholder="MM"
        editable={!disabled}
        keyboardType="numeric"
        numberOfLines={1}
        maxLength={2}
        returnKeyType="done"
      />
      <View className="h-4">{showInputTitle ? <Text>Month</Text> : null}</View>
    </View>
  );
};

const YearTextInput = ({
  value,
  onChangeText,
  onEndEditing,
  onBlur,
  disabled = false,
  showInputTitle = true,
}: DatePickerInputPropTypes) => {
  return (
    <View className="items-center">
      <TextInput
        className="my-2 rounded-md border text-center text-2xl"
        style={{
          height: 56,
          width: 100,
          color: disabled ? Colors.mainGray : "",
          borderColor: Colors.lightGray,
          backgroundColor: Colors.offWhite,
          textAlignVertical: "top",
        }}
        value={value}
        onChangeText={(val) => {
          onChangeText && onChangeText(val);
        }}
        placeholder="YYYY"
        editable={!disabled}
        keyboardType="numeric"
        numberOfLines={1}
        maxLength={4}
        returnKeyType="done"
      />
      <View className="h-4">{showInputTitle ? <Text>Year</Text> : null}</View>
    </View>
  );
};

const DatePicker = ({
  initialTime,
  onChange,
  showInputTitles = true,
  dateFormat = "DMY",
  disabled,
}: DatePickerPropTypes) => {
  const [dayInput, setDayInput] = useState(
    initialTime?.day ?? defaultInitialDate.day,
  );
  const [monthInput, setMonthInput] = useState(
    initialTime?.month ?? defaultInitialDate.month,
  );
  const [yearInput, setYearInput] = useState(
    initialTime?.year ?? defaultInitialDate.year,
  );

  const handleDayInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    if (Number(numericValue[0]) > 3) {
      numericValue = `0${Number(numericValue[0])}`;
    }
    if (Number(numericValue) > 31) {
      numericValue = `31`;
    }
    if (numericValue === "00") {
      numericValue = "01";
    }
    setDayInput(numericValue);
  };

  const handleDayInputEndEditing = () => {
    if (dayInput.length === 1) {
      if (dayInput[0] === "0") {
        setDayInput(`01`);
      } else {
        setDayInput(`0${dayInput[0]}`);
      }
    }
  };

  const handleMonthInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");

    if (Number(numericValue[0]) > 1) {
      numericValue = `0${numericValue[0]}`;
    }

    if (Number(numericValue) > 12) {
      numericValue = `12`;
    }
    setMonthInput(numericValue);
  };

  const handleMonthInputEndEditing = () => {
    if (Number(monthInput[0]) > 1) {
      setMonthInput(`12`);
    }
    if (monthInput.length === 1) {
      setMonthInput(`0${monthInput[0]}`);
    }
    if (Number(monthInput) === 0 && monthInput !== "") {
      setMonthInput("01");
    }
  };

  const handleYearInputTextChange = (val: string) => {
    let numericValue = val.replace(/[^0-9]/g, "");
    setYearInput(numericValue);
  };

  // format inital time
  useEffect(() => {
    if (initialTime?.day && initialTime.month) {
      handleDayInputEndEditing();
      handleMonthInputEndEditing();
    }
  }, []);

  // init onChange functionality
  useEffect(() => {
    if (onChange) {
      onChange({
        day: dayInput,
        month: monthInput,
        year: yearInput,
      });
    }
  }, [dayInput, monthInput, yearInput]);

  return (
    <View className="my-2 flex-row items-center justify-center py-4">
      <View className="mt-2 flex-row items-center">
        {dateFormat === "DMY" ? (
          <React.Fragment>
            <DayTextInput
              value={dayInput}
              onChangeText={(val) => {
                handleDayInputTextChange(val);
              }}
              onEndEditing={() => handleDayInputEndEditing()}
              onBlur={() => {
                handleDayInputEndEditing();
              }}
            />
            <Text
              className="mx-2 mb-4 text-2xl"
              style={{ color: disabled ? Colors.mainGray : "" }}
            >
              -
            </Text>
            <MonthTextInput
              value={monthInput}
              onChangeText={(val) => {
                handleMonthInputTextChange(val);
              }}
              onEndEditing={() => {
                handleMonthInputEndEditing();
              }}
              onBlur={() => {
                handleMonthInputEndEditing();
              }}
              showInputTitle={true}
              disabled={disabled ? disabled : false}
            />
            <Text
              className="mx-2 mb-4 text-2xl"
              style={{ color: disabled ? Colors.mainGray : "" }}
            >
              -
            </Text>
            <YearTextInput
              value={yearInput}
              onChangeText={(val) => {
                handleYearInputTextChange(val);
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <YearTextInput
              value={yearInput}
              onChangeText={(val) => {
                handleYearInputTextChange(val);
              }}
            />
            <Text
              className="mx-2 mb-4 text-2xl"
              style={{ color: disabled ? Colors.mainGray : "" }}
            >
              -
            </Text>
            <MonthTextInput
              value={monthInput}
              onChangeText={(val) => {
                handleMonthInputTextChange(val);
              }}
              onEndEditing={() => {
                handleMonthInputEndEditing();
              }}
              onBlur={() => {
                handleMonthInputEndEditing();
              }}
              showInputTitle={true}
              disabled={disabled ? disabled : false}
            />
            <Text
              className="mx-2 mb-4 text-2xl"
              style={{ color: disabled ? Colors.mainGray : "" }}
            >
              -
            </Text>
            <DayTextInput
              value={dayInput}
              onChangeText={(val) => {
                handleDayInputTextChange(val);
              }}
              onEndEditing={() => handleDayInputEndEditing()}
              onBlur={() => {
                handleDayInputEndEditing();
              }}
            />
          </React.Fragment>
        )}
      </View>
    </View>
  );
};
export default DatePicker;
