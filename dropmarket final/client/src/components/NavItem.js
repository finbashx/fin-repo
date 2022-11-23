import arr from "../img/arr.svg";
import { useState } from "react";
export default function NavItem({item}){
    const [open, setOpen] = useState(false)
    if(item.childrens){
    return(
        <div className={open ? "nav-item open" :"nav-item"}>
            <div className="nav-title">
            <span>
                {item.icon &&  <img className="ic"src={item.icon}></img>}
                <a className="nav-text" href="">{item.title}</a>
            </span>
            <img className="arrw cursor"src={arr} onClick={() => setOpen(!open)}></img>
            </div>
            <div className="nav-content">
            { item.childrens.map((child, index)=>< NavItem key={index} item={child}/>)}
            </div>
        </div>
    )
    }else{
        return(
            <span>
                <div className="nav-content">
                <a className="nav-text linked" href={item.path}>{item.title}</a>
            </div>
            </span>
        )
    }
}