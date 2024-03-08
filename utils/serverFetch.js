import API from "@utils/api";

const catchErr = (err) => {
  console.log(err);
  return false;
};

export const errorProp = (errCode = 404, errTitle = "Page not found") => ({ props: { err: { errCode, errTitle } } });

export const fetchMasses = async () => {
  try {
    const payload = (await API.noAuthCall("post", `mass/fetchMasses`)) || null;
    return payload;
  } catch (err) {
    return catchErr(err);
  }
};

// export const resendEmailVailidation = async (email) => {
//   try {
//     await API.noAuthCall("post", `profile/resendVerification`, { email });
//   } catch (err) {
//     return catchErr(err);
//   }
// };

export const isEmailTaken = async (email) => {
  try {
    return await API.noAuthCall("post", `profile/emailtaken`, { email });
  } catch (err) {
    return catchErr(err);
  }
};

export const verifyAccount = async (data) => {
  try {
    return await API.noAuthCall("post", `profile/verifyAccount`, data);
  } catch (err) {
    return catchErr(err);
  }
};

export const resetPassword = async (data) => {
  try {
    return await API.noAuthCall("post", `profile/resetPassword`, data);
  } catch (err) {
    return catchErr(err);
  }
};
