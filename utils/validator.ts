interface IValidator {
  value: any;
  type: "email" | "password";
  label: string;
}

const validator = ({ value, type, label }: IValidator) => {
  if (!value) throw { message: "value not defined" };

  switch (type) {
    case "email": {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
      if (!reg.test(value)) throw { message: `Invalid ${label}` };
      break;
    }

    case "password": {
      // To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (!reg.test(value)) throw { message: `Invalid ${label}` };
      break;
    }

    default:
      throw { message: "value not validated" };
  }
  // return true
};

export default validator;
