import {
  ADD_USER_DETAILS,
  REMOVE_USER_DETAILS_LOGOUT,
} from "../actionTypes/actionTypes";

const initialState = {
  role: "",
  email: "",
  name: "",
  token: "",
  _id: ""
};

const userSlice = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
      const { name, role, email, _id } = action.payload;
      return {
        ...state,
        name,
        role,
        email,
        _id
      };
    case REMOVE_USER_DETAILS_LOGOUT:
      return {
        ...state,
        name: "",
        role: "",
        email: "",
        _id: ""
      };
    default:
      return state;
  }
};

export default userSlice;
