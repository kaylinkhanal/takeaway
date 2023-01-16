import React,{useEffect, useState} from 'react'
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import  Card  from '../../components/card';
import Theme from '../../components/theme'
const Items = ()=> {
    const {role} = useSelector(state=> state.user)

    const [validItems, setValidItems] = useState([])
    const fetchAvailableItems= ()=>{
        axios.get("http://localhost:3005/items").then((response) => {
            setValidItems(response.data.validItemOptions)
          });
          
    }
    useEffect(()=>{
        fetchAvailableItems()
    }, [])

return (
    <div className='mainCard'id={role=="admin"?"adminThemeBackground":"userThemeBackground"}>
    {validItems.map((item)=>{
       return( <Card item={item} role={role}/>)
    })}
</div>
)
}
export default Items