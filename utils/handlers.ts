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

export const sleep = async (seconds: number) => {
  const duration = seconds * 60 * 60;

  console.log(duration);

  return new Promise((resolve) => setTimeout(resolve, duration));
};

export const fetcher = ({ endpoint, method = "GET", payload }: any) => {
  const API = `${process.env.SERVER_URL}/api${endpoint}`;
  const apiCall = ["POST"].includes(method)
    ? fetch(API, { method, body: JSON.stringify(payload), headers: new Headers({ "Content-Type": "application/json", Authorization: `Basic ${basicAuth}` }) })
    : fetch(API, { method, headers: new Headers({ "Content-Type": "application/json", Authorization: `Basic ${basicAuth}` }) });
  return apiCall
    .then(async (response) => {
      if (!response.ok) throw await response.json();
      return response.json();
    })
    .catch((err) => {
      throw err;
    });
};
