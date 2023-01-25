import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from "axios";
import OrdersBox from './ordersBox'
import { Pagination } from 'antd';
const AllOrdersList = ()=>{
    const {token, role} =useSelector(state=>state.user)
    const [orders, setOrders]= useState([])
    const [loading, setLoading]= useState(false)
    const [ordersCount, setTotalOrdersCount]= useState(0)


    const fetchAvailableItems= (page, size)=>{
        setLoading(true)
        const requestOptions = {
          headers: {
            'authorization': `Bearer ${token}`
          }
        }
        axios.get(`${process.env.REACT_APP_API_URL}/orders?page=${page || 1}&size=${size || 10}`, requestOptions).then((response) => {
            setOrders(response.data.orders)
            setTotalOrdersCount(response.data.totalOrdersCount)
          });
        setLoading(false)
     }
    useEffect(()=>{
        fetchAvailableItems()
    }, [])
    
return (
    <>
    {!loading &&  orders.length>0 ? (
    <>
    {orders.map((item, id)=>{
        console.log(item)
        return <OrdersBox item={item} key={id}/>
    })}
    <Pagination  total={ordersCount} onChange={(page,size)=>fetchAvailableItems(page,size)}/>
    </>
    ): 'loading'}


    </>
)
}
export default AllOrdersList
