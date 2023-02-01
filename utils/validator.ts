interface IValidator {
  value: any;
  type: "email" | "password" | "handle" | "fullName";
  label: string;
}

const validator = ({ value, type, label }: IValidator) => {
  if (!value) throw { message: "value not defined" };

  switch (type) {
    case "email": {
      const reg = /^[\w\d]+[\w\.-]+@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
      if (!reg.test(value)) throw { message: `Invalid ${label}`, description: "email address that starts with a letter or number" };
      break;
    }
    case "password": {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (!reg.test(value))
        throw {
          message: `Invalid ${label}`,
          description: `${label} must be between 8 to 15 characters which contain at least one lowercase/uppercase, numeric digit, and special character`,
        };
      break;
    }
    case "handle": {
      const reg = /^[a-zA-Z0-9]+(_[a-zA-Z0-9]+)?$/;
      if (!reg.test(value))
        throw {
          message: `Invalid ${label}`,
          description: `${label} must start with a letter or number and can only have underscore in between letters or numbers`,
        };
      break;
    }
    case "fullName": {
      const reg = /^[a-zA-Z]+([\ \'\.\-][a-zA-Z]+)*$/;
      if (!reg.test(value))
        throw {
          message: `Invalid ${label}`,
          description: `${label} can have one or more letters, and zero or more occurrences of a dash, dot, space, or hyphen followed by one or more letters.`,
        };
      break;
    }

    default:
      throw { message: "value not validated" };
  }
  // return true
};

export default validator;
