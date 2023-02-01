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
      if (!reg.test(value)) throw { message: `Invalid ${label}`, description: "email address that starts with a word or number" };
      break;
    }
    case "password": {
      // ? <= To check a password between 8 to 15 characters which contain at least one lowercase/uppercase, numeric digit, and special character
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (!reg.test(value)) throw { message: `Invalid ${label}` };
      break;
    }
    case "handle": {
      // ? <= start with a letter or number and only contain letters, numbers, or underscores
      const reg = /^[a-zA-Z0-9_]+$/;
      if (!reg.test(value)) throw { message: `Invalid ${label}` };
      break;
    }
    case "fullName": {
      const reg = /^[a-zA-Z]+([\ \'\.\-][a-zA-Z]+)*$/;
      if (!reg.test(value)) throw { message: `Invalid ${label}` };
      break;
    }

    default:
      throw { message: "value not validated" };
  }
  // return true
};

export default validator;
