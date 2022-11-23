import { Routes, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Feat from './components/feat';
import Buy from "./components/buy";
import { BrowserRouter, Navigate } from 'react-router-dom';
import Sell from "./components/sell";
import Sign from "./components/sign";
import Execute from "./components/execute";
import React, {useState} from "react";
import { CurrentProv } from "./Current";
export default function App(){
  let loggedIn = false;
  if("CURRENT_LOGGED" in localStorage){
    loggedIn = true;
  }
  else{
      loggedIn = false;
  }
  return (
    <>
    <div className="Side-pad">
    <CurrentProv>
    <BrowserRouter>
      < Sidebar/>
      <Routes>
        <Route path="/feat" element={ < Feat/>}/>
        <Route path="/buy" element={loggedIn ? (
      <Buy />
    ) : (
      <Navigate replace to={"/feat"} />
    )
  }
/>
        <Route path="/finalise" element={loggedIn ? (
      <Execute />
    ) : (
      <Navigate replace to={"/feat"} />
    )
  }
/>
        <Route path="/sell" element={loggedIn ? (
      <Sell />
    ) : (
      <Navigate replace to={"/feat"} />
    )
  }
/>
        <Route path="/sign" element={loggedIn ? (
      <Navigate replace to={"/feat"} />
    ) : (
      <Sign />
    )
  }
/>
        <Route path="/" element={<Feat/>}/>
        <Route path="/logout" element={<Feat/>}/>
      </Routes>
      </BrowserRouter>
      </CurrentProv>
      <footer className="foot">
      <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        <img src="./navicons/footer.png" className="footer"></img>
      </footer>
      </div>
      </>
  );
}
