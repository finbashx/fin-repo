import { createContext, useState, useEffect } from "react";
import  Axios  from "axios";
const CurrentContext = createContext();
export function CurrentProv({children}){
    const [str,setStr] = useState((window.localStorage.getItem("CURRENT_LOGGED")));
    const [worth, setWorth] = useState((window.localStorage.getItem("CURRENT_PORT")));
    const [gp, setGp] = useState()
    const whoLogged = (who) => {
        window.localStorage.setItem("CURRENT_LOGGED",who);
        const valu = window.localStorage.getItem("CURRENT_LOGGED")
        setStr((valu));
    }
    return(
       <CurrentContext.Provider value={{str, whoLogged, worth }}>
        {children}
       </CurrentContext.Provider>
    )
}
export default CurrentContext;