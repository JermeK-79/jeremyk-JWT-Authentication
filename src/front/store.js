export const initialStore = () => {
  return {
    token: sessionStorage.getItem("token") || null,
    isLoginSuccessful: sessionStorage.getItem("token") ? true : false,
    message: "",
    isSignUpSuccessful: false,
    errorMessage: "",
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...store,
        token: action.payload.token,
        isLoginSuccessful: true,
        errorMessage: ""
      };

    case ' successfulSignUp':
      {
        const { message, isSignUpSuccessful } = action.payload;
        return {
          ...store,
          message: message,
          isSignUpSuccessful: isSignUpSuccessful,
        }
      }
    default:
      throw Error('Unknown action.')

    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...store,
        token: null,
        isLoginSuccessful: false,
        errorMessage: action.payload.message
      };
    
    case 'LOGOUT':
      sessionStorage.removeItem("token");
      return {
        ...store,
        token: null,
        isLoginSuccessful: false,
        errorMessage: ""
      };
    
    default:
      return store;
  }    
}