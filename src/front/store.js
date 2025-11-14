export const initialStore=()=>{
  return{
    token: null,
    isLoggedIn: false,
    message: '',
    isSignUpSuccessful: false,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'fetchedToken':
      {
        const{token} = action.payload;
        return{
          ...store,
          token: token,
          isLoggedIn: true,
        }
      }
    case 'removedToken':
      {
        return{
          ...store,
          token: null,
          isLoggedIn: false,
        }
      }
    case 'successfulSignUp':
      {
        const {message, isSignUpSuccessful} = action.payload;
        return{
          ...store,
          message: message,
          isSignUpSuccessful: isSignUpSuccessful,
        }
      }
    default:
      throw Error('Unknown action.');
  }    
}