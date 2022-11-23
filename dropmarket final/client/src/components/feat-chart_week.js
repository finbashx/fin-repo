import moment from "moment-timezone";
import React, {
  useState,
  useEffect
} from "react";
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import {
  Line
} from 'react-chartjs-2'
ChartJS.register(...registerables);
const FeatchartW = (ccoins) => {
  let fram ;
  let fram2;
  let data;
  const [currentf, setCurrentf] = useState();
  let [fin,setFin] = useState();
  const getRecent = () => {
    let tempr = Array.apply(null, Array(7)).map(function (_, i) {
      return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('ddd');});
      let tempr2=[];
      let nowHour = new Date().getHours();
    for (let j = 0; j < tempr.length; j++){
      for(let k =nowHour; k < nowHour+24; k++){
        if(k>24){
        tempr2.push(tempr[j] +" "+ (k-24) + ":"+"00");
        }
        if(k<=24){
          tempr2.push(tempr[j] +" "+ k + ":"+"00");
        }
    }}
    tempr2.push(tempr[7] + nowHour);
   setFin(tempr2);
  }
  const [chart1, setChart1] = useState([]);
  const [datasetss, setDatasetss] = useState([]);
  const initialValue = 'three';
  const [selectedTime, setSelectedTime] = useState(initialValue);
  useEffect(() => {
    {
      if(ccoins.ccoins  && localStorage.getItem("STOP_RENDER2") == "false"){
        let tempchart=[];
      for (let i = 0; i < (ccoins.ccoins[0]).length; i++){
        try{
      fetch(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${ccoins.ccoins[0][i].coin}&tsym=GBP&limit=${ 168}&api_key=45ff14f28775ec177bc0a52c15c5efb9695792a3fe7c3dcfafeef756350e6d1c`)
        .then(resp => resp.json())
        .then(resp => {
          Object.values(resp);
          let temp = resp.Data.Data?.map(function (item) {
            return item.close;
          });
          let temp2 = [Object.values(temp)];
          let final;
          let arrr = [];
            for (var key in temp2[0]) {
              temp2[0][key] = temp2[0][key]* ccoins.ccoins[0][i].amount;
              arrr.push([key, temp2[key]])
            };
            try {
               final = arrr[0][1];
            } catch {
              final =  1;
            };
            let o = Math.round, r = Math.random, s = 255;
            let c =  'rgba(' + 99 + ',' + o(r()*s) + ',' + 150;
            tempchart.push({
              label: ccoins.ccoins[0][i].coin,
              data: final,
              borderColor: c,
              backgroundColor: c,
              pointRadius: 0,
            },)
           setDatasetss(tempchart);
        })}
        catch{};
      }
      if(datasetss.length>=ccoins.ccoins[0].length){
        setChart1(datasetss);
        getRecent();
        localStorage.setItem("STOP_RENDER2","true")
      }
    }
    }
  });
  const options = {
    options: {
      scales:{
        x: {
            display: false
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    }
  }
  };
  data = {
    labels : fin,
    datasets: chart1
    ,
  };
  return ( 
    <div className = "chart-box" >
    <Line className ="chrt" options = {
      options
    }
    data = {
      data
    }
    /> 
    </div>
  )
}
export default FeatchartW