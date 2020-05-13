import React, { useState, useEffect } from "react";
import Table from "./table"
import Intro from "./header/header"

function Main(props){

    const [isAuth, setIsAuth] = useState(true);
    // console.log(props.name);

    // useEffect(() => {
    //     if (props.name === "Juta"){
    //         setIsAuth(true);
    //     } else {
    //         setIsAuth(false);
    //     }
    // }, [])

    
    
    return (
        <div>
           { isAuth? <div>
            <Intro />
            <Table name={props.name}/>
           </div>
             : <h1>Wrond password</h1>}
        </div>
    );
}

export default Main;