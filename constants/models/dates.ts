export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthNamesShort = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

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
