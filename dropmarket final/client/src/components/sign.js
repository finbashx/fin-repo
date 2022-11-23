import Axios from "axios";
import React,{ useState, useContext } from "react";
import  CurrentContext  from "../Current";
export default function Sign(){
const [usernameReg, setUsernameReg] = useState("");
const [passwordReg, setPasswordReg] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [loginStatus, setLoginStatus] = useState("");
const {str, whoLogged} = useContext(CurrentContext);
const change = (val) =>{
}
const register = () =>{
  Axios.post("http://localhost:3001/sign", {
    username:usernameReg, 
    password:passwordReg,
  }).then((resp) => {
    
  }
  );
  window.location.reload(false);
}
const login = () => {
  Axios.post("http://localhost:3001/log",{
    username:username,
    password:password,
}).then((resp) => {
  if(resp.data.message){
    setLoginStatus(resp.data.message);
  }
  else{
    setLoginStatus(resp.data[0].username + ": logged in");
    whoLogged(resp.data[0].username);
    window.localStorage.setItem("CURRENT_LOGGED", resp.data[0].username);
    window.location.reload(false);
  }
})
  };
    return(
      <div className="log-flex">
       <div className="Sign">
      <div className="registration">
        <h1>Registration</h1>
        <div className="block">
        <label>Username</label>
        <br></br>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <br></br>
        <button onClick={register}> Register </button>
        </div>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <button onClick={()=> login()}> Login </button>
      </div>
      <h2>{loginStatus}</h2>
    </div>
    <img className="log-ban" src="/navicons/log-ban.png"/>
    </div>
    )
  }
