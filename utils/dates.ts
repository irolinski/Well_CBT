import { monthNamesShort } from "@/constants/models/dates";

export const getOrdinalSuffix = (number: number) => {
  const lastDigit = Number(number.toString().slice(-1));
  const lastTwoDigits = Number(number.toString().slice(-2));

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }
  if (lastDigit >= 1 && lastDigit <= 3) {
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
    }
  } else {
    return "th";
  }
};

export const numToString_addZero = (number: number) => {
  let numString: string = String(number);
  if (numString.length === 1) {
    if (numString[0] !== "0") {
      numString = `0${numString[0]}`;
    }
  }
  return numString;
};

export const formatDateToDDMM = (datetime: Date): string => {
  const date = new Date(datetime);
  const day = numToString_addZero(date.getDate());
  const month = numToString_addZero(date.getMonth() + 1);
  return `${day}/${month}`; // Combine the day and month
};

export const dateDaysAgo = (datetime: Date): number => {
  const dateToDisplayInMs = new Date(datetime).getTime();
  const currentDateInMs = new Date().getTime();
  const oneDayInMs = 86400000;

  const numOfDaysAgo = Math.floor(
    (currentDateInMs - dateToDisplayInMs) / oneDayInMs,
  );

  return numOfDaysAgo;
};

export const formatDateToMonthAndDay = (timestamp: Date): string => {
  const date = new Date(timestamp); // Parse the timestamp
  const day = date.getDate(); // Get the day of the month
  const month = monthNamesShort[date.getMonth()];
  return `${day} ${month}`; // Combine the day and month
};

export const returnDaysAgoString = (
  datetime: Date,
  maxDays: number,
  returnAfterLimit?: string,
): string => {
  const daysAgo = dateDaysAgo(datetime);
  if (daysAgo <= maxDays) {
    if (daysAgo < 1) {
      return "today";
    } else if (daysAgo === 1) {
      return "yesterday";
    } else {
      return `${dateDaysAgo(datetime)} days ago`;
    }
  } else {
    if (returnAfterLimit) {
      return returnAfterLimit;
    } else {
      return String(datetime);
    }
  }
};
