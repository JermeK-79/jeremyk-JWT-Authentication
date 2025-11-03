export const initialStore = () => {
  return {
    token: sessionStorage.getItem("token") || null,
    isSuccessfulLogin: sessionStorage.getItem("token") ? true : false,
    errorMessage: ""
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
    
    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    
    case 'LOGIN_SUCCESS':
      return {
        ...store,
        token: action.payload.token,
        isSuccessfulLogin: true,
        errorMessage: ""
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...store,
        token: null,
        isSuccessfulLogin: false,
        errorMessage: action.payload.message
      };
    
    case 'LOGOUT':
      // Clear sessionStorage when logging out
      sessionStorage.removeItem("token");
      return {
        ...store,
        token: null,
        isSuccessfulLogin: false,
        errorMessage: ""
      };
    
    default:
      return store;
  }    
}