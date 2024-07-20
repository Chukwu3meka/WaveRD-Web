import stylesVariables from "styles/variables.module.scss";

import { Theme } from "interfaces/components/others/layouts.interface";
import { AgeGenerator, ArrayRotate } from "interfaces/utils/helpers.interface";

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

export const sleep = async (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const capitalize = (phrase: string) => {
  if (!phrase) throw { message: "Unable to capitalize phrase" };

  const words = phrase.split(" "),
    capitalized = words.map((word) => word[0].toUpperCase() + word.slice(1));

  return capitalized.join(" ");
};

export const textToId = (phrase: string) => {
  if (!phrase) throw { message: "Unable to transform string" };

  // return phrase
  //   .split(" ")
  //   .map((word) => word.toLowerCase())
  //   .join("-");

  return phrase.replace(/\s+/g, "-").toLowerCase();
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

export const shortNumber = (x: number) => {
  const num = Math.round(x);
  if (!Number.isInteger(num)) return 0;

  const numLen = num.toString().length;
  if (numLen <= 3) return num;

  const notation = numLen >= 4 && numLen <= 6 ? "K" : numLen >= 7 && numLen <= 9 ? "M" : "B";

  const denoted = (no: number) =>
    `${num.toString().substring(0, no)}${
      Number(num.toString().substring(no, no + 1)) >= 1 ? `.${num.toString().substring(no, no + 1)}` : ""
    }${notation}`;

  return [4, 7, 10].includes(numLen) ? denoted(1) : [5, 8, 11].includes(numLen) ? denoted(2) : denoted(3);
};

export const copyToCLipboard = async (text: string) => {
  // first time a user runs this function, a confirmation dialog is sent to confirm action
  if (!navigator) throw { message: "Navigator is not defined" };
  if (!navigator.clipboard) throw { message: "Navigator Clipboard is not available" };

  // copy codeSnippet to clipboard
  await navigator.clipboard.writeText(text);
};

export const verifyImageFile = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target?.result as string;

      image.onload = () => {
        resolve(true); // File is a valid image
      };

      image.onerror = () => {
        resolve(false); // File is not an image
      };
    };

    reader.readAsDataURL(file);
  });
};

export const verifyFileAsPDF = (file: File): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const uint = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
      let header = "";

      for (let i = 0; i < uint.length; i++) {
        header += uint[i].toString(16);
      }

      // Check if the file's header matches the PDF magic number "25504446" (hex for "%PDF")
      const isPDF = header === "25504446";
      resolve(isPDF);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const transformDivision = (source: "ref" | "tournament", key: string) => {
  const tournaments = [
    { ref: "tour001_one", code: "division", clubs: 20, tournament: "Premier League" },
    { ref: "tour001_two", code: "division", clubs: 24, tournament: "EFL Championship" },
    { ref: "tour002_one", code: "division", clubs: 20, tournament: "La Liga" },
    { ref: "tour002_two", code: "division", clubs: 22, tournament: "Segunda División" },
    { ref: "tour003_one", code: "division", clubs: 18, tournament: "Bundesliga" },
    { ref: "tour003_two", code: "division", clubs: 18, tournament: "2. Bundesliga" },
    { ref: "tour004_one", code: "division", clubs: 20, tournament: "Serie A" },
    { ref: "tour004_two", code: "division", clubs: 20, tournament: "Serie B" },
    { ref: "tour005_one", code: "division", clubs: 18, tournament: "Ligue 1" },
    { ref: "tour005_two", code: "division", clubs: 20, tournament: "Ligue 2" },
    { ref: "tour006_one", code: "division", clubs: 20, tournament: "Copa Libertadores" },
    { ref: "tour007_one", code: "division", clubs: 18, tournament: "Primeira Lig_one" },
    { ref: "tour008_one", code: "division", clubs: 18, tournament: "Eredivisie" },
    { ref: "tour009_one", code: "division", clubs: 18, tournament: "Saudi Pro League" },
    { ref: "tour010_one", code: "division", clubs: 12, tournament: "Scottish Premiership" },
    { ref: "tour011_one", code: "division", clubs: 20, tournament: "Süper Lig" },
    { ref: "tour001_cup", code: "cup", clubs: 32, tournament: "FA Cup" },
    { ref: "tour002_cup", code: "cup", clubs: 32, tournament: "Copa del Rey" },
    { ref: "tour003_cup", code: "cup", clubs: 32, tournament: "DFB-Pokal" },
    { ref: "tour004_cup", code: "cup", clubs: 32, tournament: "Coppa Italia" },
    { ref: "tour005_cup", code: "cup", clubs: 32, tournament: "Coupe de France" },
    { ref: "tour006_cup", code: "cup", clubs: 16, tournament: "Copa do Brasil" },
    { ref: "tour007_cup", code: "cup", clubs: 16, tournament: "Taça de Portugal" },
    { ref: "tour008_cup", code: "cup", clubs: 16, tournament: "KNVB Cup" },
    { ref: "tour009_cup", code: "cup", clubs: 16, tournament: "King Cup" },
    { ref: "tour010_cup", code: "cup", clubs: 8, tournament: "Scottish Cup" },
    { ref: "tour011_cup", code: "cup", clubs: 16, tournament: "Turkish Cup " },
  ];

  const tournament = tournaments.find((tournament) => tournament[source] === key);
  if (!!tournament) return tournament[source === "ref" ? "tournament" : "ref"];
};

// ordinal suffix
export const ordinalSuffix = (n: number) => n + (n + 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");
