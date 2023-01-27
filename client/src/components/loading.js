import {Skeleton} from 'antd';
import React, { useState } from 'react';
const Loading = () => {
    const [active, setActive] = useState(true);
    return (
        <>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Input active style={{width: "500px",margin:"5px"}}/><br/>
            <Skeleton.Button active style={{margin:"5px"}}/>
            <Skeleton.Button active style={{margin:"5px"}}/>
            <Skeleton.Button active style={{margin:"5px"}}/>
        </>
    );
};
export default Loading;