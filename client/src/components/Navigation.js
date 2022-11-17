import React from "react";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
    return (<div>
        <NavLink to="/">Links</NavLink>
        <NavLink to="/stat" style={{paddingLeft: '20px'}}>Statistic</NavLink>
    </div>
    )
}