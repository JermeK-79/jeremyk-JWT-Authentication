import * as types from "./lib/actionTypes";

export const initialStore = () => {
  const token = sessionStorage.getItem("token");

  return {
    token: token || null,
    isLoggedIn: !!token,
    message: "",
    errorMessage: "",
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      return {
        ...store,
        token: action.payload.token,
        isLoggedIn: true,
        message: action.payload.message || "Success!",
        errorMessage: "",
      };

    case types.LOGIN_FAILURE:
    case types.SIGNUP_FAILURE:
      return {
        ...store,
        token: null,
        isLoggedIn: false,
        errorMessage: action.payload.message,
      };

    case types.LOGOUT:
      return {
        ...store,
        token: null,
        isLoggedIn: false,
        message: "",
        errorMessage: "",
      };

    case types.SET_ERROR:
      return {
        ...store,
        errorMessage: action.payload,
      };

    case types.CLEAR_ERROR:
      return {
        ...store,
        errorMessage: "",
      };

    case types.CLEAR_MESSAGE:
      return {
        ...store,
        message: "",
      };

    default:
      return store;
  }
}
