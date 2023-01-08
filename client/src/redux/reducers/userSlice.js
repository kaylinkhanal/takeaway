import  ADD_USER_DETAILS from "../actionTypes/actionTypes";

const initialState = {
  role: '',
  email: '',
  name: '',
  token: ''
};

const userSlice = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DETAILS:
       const { name,role, email} = action.payload
      return {
        ...state,
        name,
        role,
        email
      };
    default:
      return state;
  }
};

export default userSlice
