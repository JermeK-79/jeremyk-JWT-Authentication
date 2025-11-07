import * as types from "./actionTypes";

export const login = async (email, password, dispatch) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/token`,
      options
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data.msg);
      dispatch({
        type: types.loginFailure,
        payload: {
          message: data.msg || "Bad username or password",
        },
      });
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }
    const data = await response.json();
    console.log(data.access_token);
    sessionStorage.setItem("token", data.access_token);
    dispatch({
      type: types.loginSuccess,
      payload: {
        token: data.access_token,
      },
    });
    return data;
  } catch (error) {
    console.error("Login error:", error);
    dispatch({
      type: types.loginFailure,
      payload: {
        message: "Network error. Please try again.",
      },
    });
    return {
      error: {
        message: error.message,
      },
    };
  }
};

export const signUp = async (email, password, dispatch) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
      options
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data.msg);
      dispatch({
        type: types.signupFailure,
        payload: {
          message: data.msg || "Error creating account",
        },
      });
      return {
        error: {
          status: response.status,
          statusText: response.statusText,
        },
      };
    }
    const data = await response.json();
    console.log(data);
    if (data.access_token) {
      sessionStorage.setItem("token", data.access_token);
    }
    dispatch({
      type: types.signupSuccess,
      payload: {
        message: data.message,
        token: data.access_token,
      },
    });
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    dispatch({
      type: types.signupFailure,
      payload: {
        message: "Network error. Please try again.",
      },
    });
    return {
      error: {
        message: error.message,
      },
    };
  }
};

export const logout = (dispatch) => {
  sessionStorage.removeItem("token");
  dispatch({
    type: types.logout,
    payload: {
      token: null,
      isLoggedIn: false,
      message: "",
    },
  });
};