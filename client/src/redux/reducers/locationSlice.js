import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationLatLng: {},
  receiverLocationLatLng: {}
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderLocationLatLng: (state, actions) => {
      state.senderLocationLatLng = actions.payload
    },
 
  }
});

export const { setSenderLocationLatLng } = locationSlice.actions;
export default locationSlice.reducer;