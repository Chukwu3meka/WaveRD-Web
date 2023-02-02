interface IValidator {
  value: any;
  type: "email" | "password" | "handle" | "fullName";
  label?: string | null;
}

const validator = ({ value, type, label }: IValidator) => {
  if (!label) label = type.charAt(0).toUpperCase() + type.slice(1);

  if (value === "" || value === undefined) throw { message: `${label} cannot be empty` };

  const charLengthLimit = (min: number, max: number) => {
    if (`${value}`.length < min || `${value}`.length > max) throw { message: `${label} must be between ${min} to ${max} characters` };
  };

  switch (type) {
    case "email": {
      charLengthLimit(6, 254);

      //  The minimum length of an email address is typically 6 characters (e.g. a@b.com) and can be up to 254 characters.
      // Limiting the total characters would result in an invalid email address and not meet the standards set by the Internet Assigned Numbers Authority (IANA).
      const reg = /^[\w\d]+(\.[\w\d]+|-[\w\d]+)*@\w+([-]?\w+)*(\.\w{2,3})$/g;

      if (!reg.test(value))
        throw {
          message: `${label} must start with alphanumeric and can only contain dot or dash in between alphanumeric, followed by an '@' symbol, then domain name followed by 2-3 characters as top-level domain (TLD); Sub domains are not allowed`,
        };
      break;
    }
    case "password": {
      charLengthLimit(8, 16);

      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (!reg.test(value))
        throw {
          message: `${label} must be between 8 to 15 characters which contain at least one lowercase/uppercase, numeric digit, and special character`,
        };
      break;
    }
    case "handle": {
      charLengthLimit(3, 16);

      const reg = /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/;
      if (!reg.test(value))
        throw {
          message: `${label} must start with a letter or number and can only have underscore in between letters or numbers`,
        };
      break;
    }

    case "fullName": {
      charLengthLimit(3, 64);
      const reg = /^[a-zA-Z]+([\ \'\.\-][a-zA-Z]+)*$/;
      if (!reg.test(value))
        throw {
          message: `${label} can have one or more letters, and zero or more occurrences of a dash, dot, space, or hyphen followed by one or more letters.`,
        };
      break;
    }

    default:
      throw { message: "value not validated" };
  }
  // return true
};

export default validator;
