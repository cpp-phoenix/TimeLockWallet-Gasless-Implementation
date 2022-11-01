import React from "react";
import { NavLink as Link, NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="h-96 w-100% flex justify-center items-center text-white text-2xl">
            Please go to <NavLink className="font-bold text-blue-500" to='/deposit'>&nbsp;Deposit&nbsp;</NavLink> Section to deposit Funds. The funds will stay locked to x time
        </div>
    )
}

export default Home;