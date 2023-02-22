import '../App.css'
import { Skeleton } from 'antd';
import React, { useState } from 'react';
const Loading = () => {
    const [active, setActive] = useState(true);
    return (
        <>
            <div className='skeleton'>
                <div>
                    <Skeleton.Input active style={{ width: "500px", margin: "5px" }} /><br />
                    <Skeleton.Button active style={{ width: "200px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "100px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "180px", margin: "5px" }} /><br />
                    <Skeleton.Input active style={{ width: "500px", margin: "5px" }} /><br />
                    <Skeleton.Button active style={{ width: "200px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "100px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "180px", margin: "5px" }} /><br />
                    <Skeleton.Input active style={{ width: "500px", margin: "5px" }} /><br />
                </div>
                <div style={{ marginTop: "30px" }}>
                    <Skeleton.Input active style={{ width: "500px", margin: "5px" }} /><br />
                    <Skeleton.Button active style={{ width: "200px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "100px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "180px", margin: "5px" }} /><br />
                    <Skeleton.Input active style={{ width: "500px", margin: "5px" }} /><br />
                    <Skeleton.Button active style={{ width: "200px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "100px", margin: "5px" }} />
                    <Skeleton.Button active style={{ width: "180px", margin: "5px" }} /><br />
                    <Skeleton.Input active style={{ width: "500px", margin: "5px" }} /><br />
                </div>

            </div>
        </>
    );
};
export default Loading;