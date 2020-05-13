import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Register(props){

    const history = useHistory();

    const [newUser, setNewUser] = useState({
        companyName: "",
        password: ""
    });

    function handleChange(event){
        const {name, value} = event.target;

        setNewUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    function handleClick(){
        console.log("Creating new user " + newUser);
        props.create(newUser, ()=>{
            history.push("/data");
        });
        
    }

    return (
        <div className="container login-container">
            
        <div className ="form-group">
          <label htmlFor="exampleInputEmail1">Įmonės pavadinimas</label>
          <input onChange={handleChange} type="email" name = "companyName"  value={newUser.companyName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Įveskite įmonės pavadinimą"/>
        
        </div>
        <div className ="form-group">
          <label htmlFor="exampleInputPassword1">Slaptažodis</label>
          <input onChange={handleChange} name="password" value = {newUser.password}  type="password" className="form-control" id="exampleInputPassword1" placeholder="Slaptažodis"/>
          
        </div>

        <button onClick={handleClick} type="submit" className ="btn btn-primary">Submit</button>

</div>
    );
}

export default Register;