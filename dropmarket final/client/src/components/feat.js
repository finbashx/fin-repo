import FeatchartQ from "./feat-chart_quarter";
import FeatchartW from "./feat-chart_week";
import FeatchartY from "./feat-chart_year";
import React, {useState, useEffect, useContext} from "react";
import Featcomp from "./feat-comp";
import Axios from "axios";
import "../index.css";
import { RadioGroup, Radio } from 'react-radio-input';
import CurrentContext from "../Current";


export default function Feat(){
  let showQ = false;
  let showW = false;
  let showY = false;
  const initialValue = 'Yy';
  const [selectedC, setSelectedC] = useState(initialValue);
  const [ln, setLn] = useState(0);
  const [holdings, setHoldings] = useState();
  const [holdings2, setHoldings2] = useState([]);
  const [worth, setWorth] = useState("???");
  const [renderC,setRenderC] = useState(false);
  const {str} = useContext(CurrentContext);
  let tempworth = 0;
  let templist = [];
  let logged = false;
  if("CURRENT_LOGGED" in localStorage){
    logged= false;
  }
  else{
    logged = true;
  }
  useEffect(() => {
      Axios.post("http://localhost:3001/dat",{
        username:str,
    }).then((resp) => {
        let temp = resp.data;
        setLn(temp.length);
        for (let el = 0; el < temp.length; el++){
          if(temp[el].coin == "GBP"){
         tempworth =tempworth+ temp[el].amount;
         setWorth(tempworth.toFixed(2));
        setLn(ln-1);
          }else if (temp[el].coin != "GBP"){
            fetch(
              `https://min-api.cryptocompare.com/data/price?fsym=${temp[el].coin}&tsyms=GBP&api_key=45ff14f28775ec177bc0a52c15c5efb9695792a3fe7c3dcfafeef756350e6d1c`
           )
           .then(res => res.json())
           .then((res => {let hold= res.GBP;
            let wasIn = false
            for(let i = 0; i < templist.length; i++){
              if(temp[el].coin == templist[i].coin){
                templist[i].amount = (templist[i].amount)+(temp[el].price);
                wasIn = true;
              }
            }
            if(wasIn==false){
              templist.push({coin:   (temp[el].coin),
                amount: (temp[el].price),
              });
              console.log("hihi")
            }
            tempworth= tempworth+ ((hold)*(temp[el].price));
            setWorth(tempworth.toFixed(2));
            setHoldings(templist);
          }));
          };
          };
          templist.push({coin:"GBP",
            amount: (tempworth),
          });
          setHoldings2([templist]);
          setRenderC(true);
    }
    );
  },[])
  if(selectedC=="Yy"){
    showY=true;
    showQ=false;
    showW=false;
  }
  if(selectedC=="Ww"){
    showY=false;
    showQ=false;
    showW=true;
  }
  if(selectedC=="Qq"){
    showY=false;
    showQ=true;
    showW=false;
  }
  // /.split(".").shift()).toUpperCase()
  const gett = () =>{
    if(holdings2[0]){
    if(holdings2[0].length >= ln){
      localStorage.setItem("STOP_RENDER1","false");
      localStorage.setItem("STOP_RENDER2","false");
      localStorage.setItem("STOP_RENDER3","false");
      return holdings2;
    }
  }
  }
  return(
    <div className="Feat">
      <div className="feat-port">
        <img src="/navicons/ban.png" className="feat-ban"/>
      </div>
      <div className="top-box">
      <div className="chart-wrap">
        <h2 onClick={() => console.log(holdings)}>Welcome, {str}</h2>
        <h3>{str}'s Portfolio (inc. cred)</h3>
        <h1>£{worth}</h1>
        <h3>Hist. Data of Your Holdings</h3>
        <div style={{ display: showQ ? "block" : "none" }}>
      <FeatchartQ ccoins={gett()}/>
      </div>
      <div style={{ display: showW ? "block" : "none" }}>
      <FeatchartW ccoins={gett()}/>
      </div>
      <div style={{ display: showY ? "block" : "none" }}>
      <FeatchartY ccoins={gett()}/>
      
      </div>
      <div className="note" style={{ display: logged ? "block" : "none" }}>
        <h2>You need to create an account, to access your portfolio.<br></br>
           Please go and navigate to account on the sidebar to get started</h2>
      </div>
      </div>
      <div className="boxes">
      <div className="buy-box">
          <h1>
          Want to Buy? <br></br>No Problem.
          </h1>
          <button ><a href="/buy">Buy</a></button>
      </div>
      <div className="buy-box over">
          <h1>
          Or sell? 
          </h1>
          <button ><a href="/sell">Sell</a></button>
      </div>
      </div>
      </div>
      <div className="tab-wrapper">
        <div className="radGr">
      <RadioGroup
      name="ChartR"
      onChange={setSelectedC}
      selectedValue={selectedC}
    >
      <label htmlFor="Yy">
        <Radio id="YyOption" value="Yy" />
        1Y
      </label>
      <label htmlFor="Qq">
        <Radio id="QqOption" value="Qq" />
        3M
      </label>
      <label htmlFor="Ww">
        <Radio id="WwOption" value="Ww" />
        1W
      </label>
    </RadioGroup>
    </div>
      <h1 className="feat-head">All Coins</h1>
      <Featcomp />
        </div>
    </div>
  )
}
