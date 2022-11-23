import Buycomp from "./buy-comp";
import CurrentContext from "../Current";
import { useContext } from "react";
export default function Buy(){
    const {str} = useContext(CurrentContext);
    return(
     
      <div className="buy-flex">
        
        <div className="buy-top">
        <img src="/navicons/buyban.png" className="top-buy"/>
      <div>
        <div className="chart-wrap">
        <h1>{str}'s Buy Page</h1>
        <h2>Press Buy To View Insights...</h2>
        </div>
              
                 <Buycomp/>
          </div>
      </div>
      <img className="ban" src="/navicons/side.svg"/>
      </div>
    )
  }