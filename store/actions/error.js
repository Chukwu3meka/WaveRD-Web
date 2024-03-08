export const removeErrorAction = (payload) => ({
  type: "REMOVE_ERROR",
  payload,
});

export const catchErr = async (dispatch, err, payload) => {
  process.env.NODE_ENV !== "production" && console.log(err);
  return await dispatch({ type: "ADD_ERROR", payload });
};
