import  ADD_USER_DETAILS from '../actionTypes/actionTypes'
 const addUserDetails = (userDetails) => dispatch => {
    dispatch({
     type: ADD_USER_DETAILS,
      payload: userDetails
    })
   }
export default addUserDetails