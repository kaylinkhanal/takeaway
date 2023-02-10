import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL);
const CustomTable = () => {

  useEffect(async()=>{
    await socket.on('rescueRequest',(rescueRequest)=>{
     console.log(rescueRequest)
    })
  })
 


  return (
    <>   
  hello
    </>
  );
};
export default CustomTable;
