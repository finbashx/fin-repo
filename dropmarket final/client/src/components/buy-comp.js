import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { useCallback } from "react";
import "../index.css";
export default function Featcomp(){
  const [jsmap, setJsmap] = useState([])
  const [orderr, setOrderr] = useState(true);
  let order =true;
  useEffect(()=>{{
    fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,USDT,USDC,BNB,XRP,BUSD,ADA,SOL,DOGE,MATIC,DOT,DAI,TRX,SHIB,WBTC,AVAX,UNI,LEO,LTC,LINK,ATOM,ETC,FTT,XLM,NEAR,XMR,ALGO,TON,VET,LUNA,FLOW,FIL,APE,HBAR&tsyms=GBP&api_key=45ff14f28775ec177bc0a52c15c5efb9695792a3fe7c3dcfafeef756350e6d1c")
    .then(resp => resp.json())
    .then( resp => {let temp =resp.RAW;
      temp = Object.values(temp);
      temp.sort( function( a , b){
        if(Number(a.GBP.PRICE) > Number(b.GBP.PRICE)) return -1;
        if(Number(a.GBP.PRICE) < Number(b.GBP.PRICE)) return 1;
      });
      setJsmap(temp);})
  }
  },[])
  const execute = (exec) => {
    window.localStorage.setItem("ORDER_SESSION",exec);
  }
  const changecol = (value) => {
    if (value > 0) return "feat-col changegreen";
    if (value <= 0) return "feat-col changered";
  };
  useEffect(() => {{
    console.log("called");
    if(orderr == false)
    {let temp =jsmap;
    temp = Object.values(temp);
    temp.sort( function( a , b){
      if(Number(a.GBP.PRICE) > Number(b.GBP.PRICE)) return 1;
      if(Number(a.GBP.PRICE) < Number(b.GBP.PRICE)) return -1;
    });
    
    setJsmap(temp);
    
    }
    if(orderr ==true){
      let temp =jsmap;
    temp = Object.values(temp);
    temp.sort( function( a , b){
      if(Number(a.GBP.PRICE) > Number(b.GBP.PRICE)) return -1;
      if(Number(a.GBP.PRICE) < Number(b.GBP.PRICE)) return 1;
    });
   
    setJsmap(temp);
   
    }
    
}},[orderr])
    return(
        <div className="Feat-comp">
        <table className="tab-box">
        <thead>
          <tr>
          <th  onClick={() => {order= !order; setOrderr(order)}}><div style={{display : "flex"}}><p >COINS</p><img src="navicons/sArr.svg" className="arrr"/></div></th>
            <th>PRICE</th>
            <th>SUPPLY</th>
            <th>CAP (full diluted)</th>
          
            <th>12H CHANGE</th>
            <th> </th>
          </tr>
          </thead>
          <tbody>
              {Object.keys(jsmap).map((key) => (
                <tr className="feat-row" key={key}>
                <td className="feat-tab-coin">
                  <div className="feat-tab-coin-div">
                  <img className="tab-img" src={`https://www.cryptocompare.com/${jsmap[key].GBP.IMAGEURL}`}/>
                  <div className="name-wrap">
                    <p className="feat-col">{(jsmap[key].GBP.FROMSYMBOL)}</p>
                    <p className="feat-col gbp">&#160;&#160;(GBP)</p>
                  </div>
                  </div>
                </td>
                <td className="feat-col price">£{jsmap[key].GBP.PRICE.toFixed(2)}</td>
                <td className="feat-col sup">{Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format(jsmap[key].GBP.SUPPLY)}</td>
                <td className="feat-col cap">{Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format(jsmap[key].GBP.MKTCAP)}</td>

                <td className={changecol(jsmap[key].GBP.CHANGEPCT24HOUR)}>{(jsmap[key].GBP.CHANGEPCT24HOUR).toFixed(2)}%</td>
                <td className="feat-col buy"><button className="buy-but" onClick={()=> execute((jsmap[key].GBP.FROMSYMBOL))}><a onClick={() => execute(execute((jsmap[key].GBP.FROMSYMBOL)))} href="finalise" className="buy-but-p">Buy</a></button></td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
  }
