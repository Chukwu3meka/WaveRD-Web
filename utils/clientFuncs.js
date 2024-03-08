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

// deobfuscate string
export const deObfuscate = (s, c) => {
  if (!s) return;
  c = c || 0x7f;
  let r = "";
  for (let i = 0; i < s.length / 2; i++) {
    r += String.fromCharCode(parseInt(s.substr(i * 2, 2), 16) ^ c);
  }
  return r;
};

// // return mail with parts hidden
// export const hideMail = (mail) => {
//   if (!mail.includes("@")) return "contactus@viewcrunch.com";

//   const emailServerDomain = mail.split("@")[1],
//     emailUserName = mail.split("@")[0].substr(0, 3);

//   return `${emailUserName}***${emailServerDomain}`;
// };

export const fetcher = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: data,
    credentials: "same-origin",
  }).then((res) => res.json());
};

export const varReplacer = (str = "") => {
  const massStore = require("@source/massStore").default,
    playerStore = require("@source/playerStore").default,
    clubStore = require("@source/clubStore.js").default;

  // while (string.match(/@\((.*?)\)/)) {
  //   // console.log(string.match(/@\((.*?)\)/));
  //   const [store, value, property] = string.match(/@\((.*?)\)/)[1].split(",");
  //   // console.log(store, value, property, string.match(/@\((.*?)\)/));
  //   switch (store) {
  //     case "club":
  //       return (string = string.replace(/@\((.+?)\)/g, clubStore(value)[property]));
  //     case "player":
  //       return (string = string.replace(/@\((.+?)\)/g, playerStore(value)[property]));
  //     default:
  //       return (string = string.replace(/@\((.+?)\)/g, massStore(value)));
  //   }
  // }

  // let str = `@(club,${club},title) has decleared interest in signing @(player,${"player000000001"},name). Only time will tell how commited @(club,${club},nickname) are in signing him`;
  // const regexp = new RegExp('foo[a-z]*','g');
  const regexp = new RegExp(/@\((.*?)\)/, "g");
  const matches = str.matchAll(regexp);

  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }

  // // var unique = a.filter(onlyUnique);

  for (const x of matches) {
    const [store, value, property] = x[0].match(/@\((.*?)\)/)[1].split(",");

    // console.log(x[0], store, value, property);

    switch (store) {
      case "club":
        // console.log(matches);
        str = str.split(x[0]).join(clubStore(value)[property]);
        break;
      case "player":
        str = str.split(x[0]).join(playerStore(value)[property]);
        break;
      default:
        str = str.split(x[0]).join(massStore(value));
        break;
    }
  }

  return str;
};

export const addDays = (date = new Date(), days = 7) => {
  date = new Date(date) || new Date();
  date.setDate(date.getDate() + days);
  return date.toDateString();
};
