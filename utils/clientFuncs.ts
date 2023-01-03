import { IAgeGenerator } from "@interface/utils/clientsFuncs-interface";
export const ageGenerator = ({ date }: IAgeGenerator) => {
  const todaysDate: number = Number(new Date()),
    birthDate: number = Number(new Date(date));

  Math.floor(Math.abs((birthDate - todaysDate) / (24 * 60 * 60 * 1000)) / 365);

  return;
};

import { IArrayRotate } from "@interface/utils/clientsFuncs-interface";
export const arrayRotate = ({ arr, reverse = false }: IArrayRotate) => {
  if (!arr.length) throw { message: "Array is empty" };

  if (reverse) {
    arr.push(arr.shift()!);
  } else {
    arr.unshift(arr.pop()!);
  }

  return arr;
};
