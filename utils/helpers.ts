import stylesVariables from "styles/variables.module.scss";

import { AgeGenerator, ArrayRotate } from "interfaces/utils/helpers.interface";
import { Theme } from "interfaces/components/layouts.interface";

export const ageGenerator = ({ date }: AgeGenerator) => {
  const todaysDate: number = Number(new Date()),
    birthDate: number = Number(new Date(date));

  Math.floor(Math.abs((birthDate - todaysDate) / (24 * 60 * 60 * 1000)) / 365);

  return;
};

export const arrayRotate = ({ arr, reverse = false }: ArrayRotate) => {
  if (!arr.length) throw { message: "Array is empty" };

  if (reverse) {
    arr.push(arr.shift()!);
  } else {
    arr.unshift(arr.pop()!);
  }

  return arr;
};

export const sleep = async (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 60 * 60));

export const capitalize = (phrase: string) => {
  if (!phrase) throw { message: "Unable to capitalize phrase" };

  const words = phrase.split(" "),
    capitalized = words.map((word) => word[0].toUpperCase() + word.slice(1));

  return capitalized.join(" ");
};

export const stringToId = (phrase: string) => {
  if (!phrase) throw { message: "Unable to transform string" };

  return phrase
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};

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

export const getSystemTheme = (): Theme => {
  if (!window) throw { message: "Window Enviroment not accesible" };

  const darkMode = matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
  return darkMode ? "dark" : "light";
};

export const isSystemIOS = (): boolean => {
  if (!window) throw { message: "Window Enviroment not accesible" };

  const IOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return IOS;
};

export const setCssThemeVar = (theme: Theme) => {
  if (document) {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--theme", "dark");
      document.documentElement.style.setProperty("--primary-color", stylesVariables.darkThemePrimaryColor);
      document.documentElement.style.setProperty("--contrast-color", stylesVariables.darkThemeContrastColor);
      document.documentElement.style.setProperty("--secondary-color", stylesVariables.darkThemeSecondaryColor);
    } else {
      document.documentElement.style.setProperty("--theme", "light");
      document.documentElement.style.setProperty("--primary-color", stylesVariables.lightThemePrimaryColor);
      document.documentElement.style.setProperty("--contrast-color", stylesVariables.lightThemeContrastColor);
      document.documentElement.style.setProperty("--secondary-color", stylesVariables.lightThemeSecondaryColor);
    }
  }
};

type ValueOf<T> = T[keyof T];
type Entries<T> = [keyof T, ValueOf<T>][];

// Same as `Object.entries()` but with type inference
export function ObjectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export const timeToMS = (time: number, unit: "m" | "s" | "h") => {
  switch (unit) {
    case "h":
      return time * 60 * 60 * 1000;
    case "m":
      return time * 60 * 1000;
    default:
      return time * 1000;
  }
};
