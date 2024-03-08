// sleep function
export const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time * 60 * 60));

// make values in an array unique
export const uniqueArray = (arr) => arr.filter((value, index, self) => self.indexOf(value) === index);

// get random valuesbetween two numbers
export const range = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

// date diff
export const dateDiff = (date) => Math.round((new Date() - new Date(date)) / (1000 * 60 * 60 * 24)) - 1;

// ordinal suffix
export const ordinalSuffix = (n) => n + (n + 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "");

// add days to date
export const addDays = (date = new Date(), days = 7) => {
  date = new Date(date) || new Date();
  date.setDate(date.getDate() + days);
  return date.toDateString();
};

export const ageGenerator = (dob) => Math.floor(Math.abs((new Date(dob) - new Date()) / (24 * 60 * 60 * 1000)) / 365);

export const genericValue = (rating) => {
  return rating > 95
    ? 80
    : rating > 87
    ? 70
    : rating > 83
    ? 60
    : rating > 77
    ? 40
    : rating > 75
    ? 25
    : rating > 70
    ? 15
    : rating > 60
    ? 10
    : 5;
};

export const uniqueRoles = (roles) =>
  uniqueArray(
    roles.map((x) =>
      x === "CDM"
        ? "DM"
        : x === "ST"
        ? "CF"
        : x === "CAM"
        ? "AM"
        : x === "LWB"
        ? "LB"
        : x === "RWB"
        ? "RB"
        : x === "RW"
        ? "RF"
        : x === "LW"
        ? "LF"
        : x
    )
  );

export const valueGenerator = ({ rating, dob }) => Number(((rating / ageGenerator(dob)) * genericValue(rating - 10)).toFixed(2));

export const fetcher = (url, data) => {
  // http://localhost:3000/api/**** 400 (Invalid JSON)
  // VM50719:1 Uncaught (in promise) SyntaxError: Unexpected token I in JSON at position 0
  // If you don't want this error, ensure you wrap your data with JSON.stringify({data})

  return fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: data,
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .catch(() => null);
};

export const log = (message) => {
  // log errors only in development
  process.env.NODE_ENV !== "production" && console.log(message);
};
