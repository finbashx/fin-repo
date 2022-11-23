const moment = require("moment");
const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "pass",
  database: "loginsystem",
});
app.post("/sign", (req,res)=> {
  const username = req.body.username;
  const password = req.body.password;
  const Vdate = moment().startOf("day").format('D/MM');
  db.query("INSERT INTO users (username, password) VALUES (?,?)", 
  [username,password], (err, result)=>{console.log(err)})
  db.query("INSERT INTO holdings (username, coin, date, price, amount) VALUES (?,?,?,?,?)", 
  [username,"GBP",Vdate,100000,100000], (err, result)=>{console.log(err)})
});
app.post("/dat", (req,res )=>{
  const username = req.body.username;
  db.query(
    "SELECT * FROM holdings WHERE username = ?",
  [username],
    (err, result) =>{
      if (err){
        res.send({err:err});
      }
      if(result.length > 0){
        res.send(result)
      }
    }
  )
})
app.post("/sell", (req,res )=>{
  const username = req.body.username;
  const coin = req.body.coin;
  const gbp = req.body.gbp;
  const Vdate = moment().startOf("day").format('D/MM');
  db.query(
    "DELETE FROM holdings WHERE username = ? AND coin = ?",
  [username, coin], (err, result)=>{console.log(err)})
  db.query(
    "INSERT INTO holdings (username, coin, date, price, amount) VALUES (?,?,?,?,?)", 
  [username,"GBP",Vdate,gbp,gbp], (err, result)=>{console.log(err)})
})
app.post("/buy", (req,res)=> {
  const username = req.body.username;
  const coin = req.body.coin;
  const price = req.body.price;
  const amount = req.body.amount;
  const Vdate = moment().startOf("day").format('D/MM');
  db.query("INSERT INTO holdings (username, coin, date, price, amount) VALUES (?,?,?,?,?)", 
  [username,coin,Vdate,price,amount], (err, result)=>{console.log(err)})
  db.query("INSERT INTO holdings (username, coin, date, price, amount) VALUES (?,?,?,?,?)", 
  [username,"GBP",Vdate,-1*amount,-1*amount], (err, result)=>{console.log(err)})
});
app.post("/log",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username,password],
    (err, result) =>{
      if (err){
        res.send({err:err});
      }
        if(result.length > 0){
          res.send(result)
        }
        else{
          res.send({message: "invalid"})
        }
    }
  )
})
app.listen(3001, () => {
})