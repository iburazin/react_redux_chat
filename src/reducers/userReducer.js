import { userConstants } from "../actions/constants";

const initState = {
  users: [],
  conversations: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_REALTIME_USERS_REQUEST:
      state = {};
      break;
    case userConstants.GET_REALTIME_USERS_SUCCESS:
      state = {
        ...state,
        users: action.payload.users
      };
      break;
    case userConstants.GET_REALTIME_USERS_FAILURE:
      state = {
        ...state
      };
      break;
    case userConstants.GET_REALTIME_MESSAGES_SUCCESS:
      state = {
        ...state,
        conversations: action.payload.conversations
      };
      break;
    case userConstants.GET_REALTIME_MESSAGES_FAILURE:
      state = {
        ...state,
        conversations: []
      };
      break;
    default:
      return state;
  }
  return state;
};
