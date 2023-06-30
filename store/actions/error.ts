import { AppDispatch } from "@store";

export const removeErrorAction = (data: string) => ({ type: "REMOVE_ERROR", data });

export const catchErr = async (dispatch: AppDispatch, err: any, data: string) => {
  process.env.NODE_ENV == "development" && console.log(err);
  return await dispatch({ type: "ADD_ERROR", data });
};
