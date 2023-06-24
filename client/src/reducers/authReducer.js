// Import action types
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "../actions/authActions";

// Initial state
const initialState = {
  isAuthenticated: false,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
