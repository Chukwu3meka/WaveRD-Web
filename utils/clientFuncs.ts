export const ageGenerator = (dob: any) => {
  const todaysDate: number = Number(new Date()),
    birthDate: number = Number(new Date(dob));

  Math.floor(Math.abs((birthDate - todaysDate) / (24 * 60 * 60 * 1000)) / 365);

  return;
};

interface IArrayRotate {
  arr: (undefined | string)[];
  reverse?: boolean;
}

export const arrayRotate = ({ arr, reverse = false }: IArrayRotate) => {
  // export const arrayRotate = ({ arr, reverse = false }: any) => {
  // const popped: string = arr.pop();

  // if (reverse) arr.unshift(popped);

  if (reverse) arr.push(arr.shift());
  if (!reverse) arr.unshift(arr.pop());

  return arr;
};
