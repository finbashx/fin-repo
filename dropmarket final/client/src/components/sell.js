import { useContext } from "react";
import CurrentContext from "../Current";
import Axios from "axios";
import Sellcomp from "./sell-comp";
export default function Sell(){
  const {str, worth} = useContext(CurrentContext);
  const ret = () =>{
    Axios.post("http://localhost:3001/dat",{
      username:str,
  }).then((resp) => {
  }
  )
  }
    return(
      <div>
        <img src="/navicons/sellban.png" className="top-sell"/>
      <div className="chart-wrap sell">
        
      </div>
      <div className="Sell">
      <h1>{str}'s Holdings </h1>
        <p>{worth}</p>
              
              
           
        
             <Sellcomp/>
          
      </div>
      </div>
    )
  }