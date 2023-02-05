import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  senderLocationLatLng: {},
  receiverLocationLatLng: {},
  distance: 0
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSenderLocationLatLng: (state, actions) => {
      state.senderLocationLatLng = actions.payload
    },
    setReceiverLocationLatLng: (state, actions) => {
      state.receiverLocationLatLng = actions.payload
    },
    setDistance: (state, actions) => {
      state.distance = actions.payload
    },
  }
});

export const { setSenderLocationLatLng,setDistance,setReceiverLocationLatLng } = locationSlice.actions;
export default locationSlice.reducer;