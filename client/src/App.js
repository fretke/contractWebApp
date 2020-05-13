import React, { useState } from 'react';

import Main from "./components/mainPage/main";
import Login from "./components/login/login";
import Register from "./components/registerPage/register"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";


function App() {

  const [user, setUser] = useState({});


  function updateUser(user, callback){
    console.log("setting user in App " + user.userName);
    
    setUser(user);
    callback();
  }

  function updateNewUser(user, callback){
    setUser(user);

    fetch("http://localhost:5000/newUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then((res) => {
      return res.json();
    })
    .then( (res) => {
      console.log("created new user with id " + res);
      callback();
    })
    .catch((err) => console.log(err)
    );
 
  }

  return (
    <Router>
      <div >
      <MuiPickersUtilsProvider utils={LuxonUtils}>
       
       <Switch>
          <Route path="/data"  render={ (props) => <Main name={user.companyName} />}/>

          <Route path="/register" render = { (props) => <Register create={updateNewUser}/>} />

          <Route path="/" exact render={ (props) => <Login update={updateUser} />}/>
       </Switch>

       </MuiPickersUtilsProvider>
    
      </div>
    </Router>
  
  );
}

export default App;
