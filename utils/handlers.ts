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

export const capitalizeFirstLetter = (word: string) => word && word[0].toUpperCase() + word.slice(1);

// deobfuscate string
export const deObfuscate = (phrase: string) => {
  if (!phrase) return;
  let r = "";
  for (let i = 0; i < phrase.length / 2; i++) {
    r += String.fromCharCode(parseInt(phrase.substr(i * 2, 2), 16) ^ 0x7f);
  }
  return r;
};
