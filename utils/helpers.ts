import { Theme } from "interfaces/store/layout.interfaces";
import { IAgeGenerator, IArrayRotate } from "interfaces/utils/helpers.interface";

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

const getSuffix = (number: number): string => {
  // Handle special cases where the suffix is "th" (11th, 12th, 13th)
  if (number >= 11 && number <= 13) {
    return "th";
  }

  // Get the last digit of the number
  const lastDigit = number % 10;

  // Determine the suffix based on the last digit
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
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

export const setCssThemeVar = (theme: Theme) => {
  if (theme === "dark") {
    document.documentElement.style.setProperty("--primary-color", "#22272e");
    document.documentElement.style.setProperty("--secondary-color", "#30353C");
    document.documentElement.style.setProperty("--contrast-color", "#D8D8D8");
  } else {
    document.documentElement.style.setProperty("--primary-color", "#ffffff");
    document.documentElement.style.setProperty("--secondary-color", "#E9E9E9");
    document.documentElement.style.setProperty("--contrast-color", "#06051b");
  }
};

//