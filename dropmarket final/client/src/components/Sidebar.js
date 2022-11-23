import NavItem from "./NavItem";
import logo from '../img/logo.svg';
import items from "../data/sidebar.json";
import React, { useContext, useEffect, useState } from "react";
import  Axios  from "axios";
import App from "../App";
import CurrentContext from "../Current";
export default function Sidebar(){
  const {str} = useContext(CurrentContext);
  const [vall, setVall] = useState();
  useEffect(() => {
        Axios.post("http://localhost:3001/dat",{
        username:str,
    }).then((resp) => {
        let temp = resp.data;
        let tempworth = 0;
        for (let el = 0; el < temp.length; el++){
          if(temp[el].coin == "GBP"){
         tempworth =tempworth+ temp[el].amount;
        console.log(tempworth);
         setVall(tempworth.toFixed(2));
          }
          };
    }
    );
},[])
  return(
    <div className="sidenav">
    <div>
        <img className="logo" src={logo}></img>
        </div>
        <div className="drop">
            <h1>Dashboard</h1>
           { items.map((item, index)=>< NavItem key={index} item={item}/>)}
           <div className="cred"><h2>Credit: </h2><p>£{vall}</p></div>
          <div>
            <button className="buy-but log" onClick={() => {localStorage.clear(); window.location.reload(false);}}>
              <a className="buy-but-p">Logout</a>
            </button>
          </div>
        </div>
    </div>
  )
}
