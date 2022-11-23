import { useState , useEffect, useContext} from "react";
import CurrentContext from "../Current";
import Axios from "axios";
import FeatchartY from "./feat-chart_year";
export default function Execute(){
  const{str} = useContext(CurrentContext);
  const [gbpval, setGbpval] = useState();
    const [convval, setConvval] = useState();
    const apiVal = window.localStorage.getItem("ORDER_SESSION");
    const placehold = window.localStorage.getItem("ORDER_SESSION") + " amount"
    useEffect(() => {
    {
      window.localStorage.setItem("STOP_RENDER1","false");
      fetch(`https://min-api.cryptocompare.com/data/price?fsym=${apiVal}&tsyms=GBP&api_key=45ff14f28775ec177bc0a52c15c5efb9695792a3fe7c3dcfafeef756350e6d1c`)
        .then(resp => resp.json())
        .then(resp => {
         setConvval(resp.GBP);
        })
    }
  }, []);
  const order = () => {
      Axios.post("http://localhost:3001/buy", {
        username: str,
     coin :apiVal,
     price: gbpval ,
     amount: (convval * gbpval),
      }).then((resp) => {
      }
      );
      window.location.reload(false);
  }
    return(
      <div className="execute">
        <img src="/navicons/finban.png" className="top-fin"/>
        <div className="chart-wrap conf-box">
        <h1>{str}'s Order</h1>
        <input
          type="text"
          placeholder= {placehold }
          onChange={(e) => {
            setGbpval(e.target.value);
          }}
        />
        <h2>GBP value:  £{(convval * gbpval).toFixed(2)}</h2>
        <button className="buy-but"><a className="buy-but-p" onClick={() => order() }href="/feat">Order</a></button>

        </div>
        <div className=" chart-wrap ex-flex"><h1>{apiVal} <h2>1 Year Chart</h2></h1></div>
      <div>
              <FeatchartY ccoins = {[[
                {coin:   apiVal,
                  amount: 1}
                ]]}/>
          </div>
      </div>
    )
  }
