import { IAgeGenerator, IArrayRotate } from "@interface/utils/clientsFuncs-interface";

export const ageGenerator = ({ date }: IAgeGenerator) => {
  const todaysDate: number = Number(new Date()),
    birthDate: number = Number(new Date(date));

  Math.floor(Math.abs((birthDate - todaysDate) / (24 * 60 * 60 * 1000)) / 365);

  return;
};

export const arrayRotate = ({ arr, reverse = false }: IArrayRotate) => {
  if (!arr.length) throw { message: "Array is empty" };

  if (reverse) {
    arr.push(arr.shift()!);
  } else {
    arr.unshift(arr.pop()!);
  }

  return arr;
};

export const sleep = async (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 60 * 60));

export const capitalize = (word: string) => word && word[0].toUpperCase() + word.slice(1);

// deobfuscate string
export const deObfuscate = (phrase: string) => {
  if (!phrase) return;
  let r = "";
  for (let i = 0; i < phrase.length / 2; i++) {
    r += String.fromCharCode(parseInt(phrase.substr(i * 2, 2), 16) ^ 0x7f);
  }
  return r;
};

const getSuffix = (dayOfMonth: number): string => {
  const suffixes: Record<number, string> = { 1: "st", 2: "nd", 3: "rd", 11: "th", 21: "st", 22: "nd", 23: "rd", 31: "st" };
  const lastTwoDigits: number = dayOfMonth % 100;
  const lastDigit: number = dayOfMonth % 10;
  return suffixes[lastTwoDigits] || suffixes[lastDigit] || suffixes[0];
};

export const fullDateFn = (dateString: Date) => {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthOfYear = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();

  const suffix = getSuffix(dayOfMonth); // get the suffix for the day of the month, e.g. "st", "nd", "rd", or "th"

  const formattedDate = `${dayOfWeek}, ${dayOfMonth}${suffix} ${monthOfYear} ${year}`;

  return formattedDate; // Output: "Sunday, 23rd May 2023"
};
