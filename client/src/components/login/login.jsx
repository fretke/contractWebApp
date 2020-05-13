import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom"
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

function Login(props){

    const history = useHistory();

    const [input, setInput] = useState({
        companyName: "",
        password: ""
    });

    function handleClick(){
        props.update(input, () => {
          history.push("/data");
        });
       
    }

    function handleChange(event){
      const {name, value} = event.target;
      setInput(prev => {
        return {
          ...prev,
          [name]: value
        }
      })
    }

    return (
        <div className="container login-container">
            
                <div className ="form-group">
                  <label htmlFor="exampleInputEmail1">Įmonės pavadinimas</label>
                  <input onChange={handleChange} name="companyName" value={input.userName} type="email" className ="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                
                </div>
                <div className ="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input onChange={handleChange} name = "password" value={input.password} type="password" className ="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  <Link to="/register">
                      <p>Dar neturi paskyros? Spausk čia, kad užsiregistruoti. </p>
                  </Link>
                  
                </div>

                <button onClick={handleClick} type="submit" className = "btn btn-primary">Submit</button>
        
        </div>
    );
}

export default Login;