interface IValidator {
  value: any;
  type: "email" | "password";
  label: string;
}

const validator = ({ value, type, label }: IValidator) => {
  if (!value) throw { message: "value not defined" };

  switch (type) {
    case "email": {
      const reg = /^[a-z0-9_.-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(zenithbank)\.com$/g;
      if (reg.test(value)) return value;
      // return (reg.test(value) && value.split("@")[0].length >= 5 && value.split("@")[0].length <= 40) || null;
      throw { message: `${label} is not valid` };
    }

    case "password": {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~`!@#$%^&*()_+-=|/ ]{7,}$/;
      return reg.test(value) === true ? value : false;
    }

    default:
      throw { message: "value not validated" };
  }
};

export default validator;
