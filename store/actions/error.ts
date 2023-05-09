import { AppDispatch } from "@store";

export const removeErrorAction = (payload: string) => ({ type: "REMOVE_ERROR", payload });

export const catchErr = async (dispatch: AppDispatch, err: any, payload: string) => {
  process.env.NODE_ENV !== "production" && console.log(err);
  return await dispatch({ type: "ADD_ERROR", payload });
};
