const sanitize = (value) => {
  const maps = { "&": "&amp", "<": "&lt", ">": "&gt", '"': "&quot", "'": "&#x27", "/": "&#x2F" };
  const sanitizeReg = /[&<>"'/"]/gi;
  const sanitized = value.replace(sanitizeReg, (match) => maps[match]);
  return sanitized;
};

const validate = (valueType, value) => {
  switch (valueType) {
    case "handle": {
      const newValue = value;
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s@!~#^$*']{2,14}$/gim;
      let status = reg.test(newValue);
      if (status === true) return newValue;
      return false;
    }
    case "dob": {
      value = new Date(value);
      const status = value instanceof Date && !isNaN(value);
      if (status === true) {
        const newDateYear = value.getFullYear();
        const currentYear = new Date().getFullYear();
        const yearDiff = currentYear - newDateYear;
        if (yearDiff > 12 && yearDiff < 121) return value;
      }
      return false;
    }
    case "email": {
      if (!value) return null;
      value = value.toLowerCase();
      const reg =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      return (reg.test(value) && value.split("@")[0].length >= 5 && value.split("@")[0].length <= 30) || null;
    }
    case "password": {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!@#$%^&*()_+-=|/ ]{7,}$/;
      return reg.test(value) === true ? value : null;
    }
    case "text": {
      const newValue = value;
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{2,39}$/gim;
      let status = reg.test(newValue);
      if (status === true) return newValue;
      return false;
    }
    case "otp":
    case "number": {
      const newValue = value;
      const reg = /^[\d]*$/;
      let status = reg.test(newValue) && newValue.length >= 1;
      if (status === true) return newValue;
      return false;
    }
    case "string": {
      const newValue = value;
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w\W]{2,999}$/gim;
      let status = reg.test(newValue) && newValue.length > 0;
      if (status === true) return newValue;
      return false;
    }
    default:
      return false;
  }
};

export default validate;
