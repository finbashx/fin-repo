import React, {useState, useEffect, useContext} from "react";
import  Axios  from "axios";
import CurrentContext from "../Current";
import "../index.css";
export default function Sellcomp(){
    const {str} = useContext(CurrentContext);
  const [jsmap, setJsmap] = useState([]);
  const [holdings,setHoldings] = useState();
  const [worth, setWorth] = useState();
  const [holdcoins,setHoldcoins] = useState("");
  const [apicoins, setApicoins] = useState();
  let templist = [];
let tempworth = 0;
  useEffect(()=>{{
    Axios.post("http://localhost:3001/dat",{
        username:str,
    }).then((resp) => {
        let temp = resp.data;
        let coinsss="";
        let tempholdcoins = [];
        for (let el = 0; el < temp.length; el++){
          if(temp[el].coin == "GBP"){
         tempworth =tempworth+ temp[el].amount;
         setWorth(tempworth.toFixed(2));
          }else if (temp[el].coin != "GBP"){
            let wasIn = false
            for(let i = 0; i < tempholdcoins.length; i++){
              if(temp[el].coin == tempholdcoins[i].coin){
                console.log((tempholdcoins[i].amount))
                tempholdcoins[i].amount = (tempholdcoins[i].amount)+(temp[el].price);
                setHoldcoins(tempholdcoins);
                wasIn = true;
              }
            }
            if(wasIn==false){
              coinsss +=temp[el].coin + ",";
              tempholdcoins.push({coin:   (temp[el].coin),
                amount: (temp[el].price),
              });
              console.log("hihi")
                setHoldcoins(tempholdcoins);
            }
          };
          };
    }
    ); 
  }
  },[])
  const selll = (cc, vl) => {
    fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${cc}&tsyms=GBP&api_key=45ff14f28775ec177bc0a52c15c5efb9695792a3fe7c3dcfafeef756350e6d1c`
    )
    .then(respp => respp.json())
    .then(respp => 
      {let tr = respp.GBP *vl;
        Axios.post("http://localhost:3001/sell", {
          username: str,
       coin :cc,
       gbp: tr,
        }).then((resp) => {
        }
        );
        window.location.reload(false);
      }
      )
  }
  const changecol = (value) => {
    if (value > 0) return "feat-col changegreen";
    if (value <= 0) return "feat-col changered";
  };
  const sort = () =>{
    console.log(apicoins);
    let temp = jsmap;
    temp = Object.values(temp);
    temp.sort( function( a , b){
      if(Number(a.GBP.PRICE) > Number(b.GBP.PRICE)) return -1;
      if(Number(a.GBP.PRICE) < Number(b.GBP.PRICE)) return 1;
    });
    setJsmap(temp);
  };
    return(
        <div className="Feat-comp sell">
        <table className="tab-box">
        <thead>
          <tr>
            <th onClick={() => sort()}>COINS</th>
            <th>PRICE</th>
            <th>AMOUNT</th>
            
          </tr>
          </thead>
          <tbody>
              {Object.keys(holdcoins).map((key) => (
                <tr className="feat-row" key={key}>
                <td className="feat-tab-coin">
                {holdcoins[key].coin}
                </td>
                <td>
                {holdcoins[key].amount}
                </td>
                <td>
                <button className="buy-but"> <a onClick={() => selll(holdcoins[key].coin, holdcoins[key].amount)} className="buy-but-p">Sell</a></button>
                </td>
                
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
  }
