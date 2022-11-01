import React from "react";
import { NavLink as Link, NavLink } from 'react-router-dom';
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const Navbar = () => {
    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    return (
        <div className="bg-blue-900">
            <div className="flex flex-row items-center w-full h-20">
                <div className="flex items-center text-xl text-white mx-10 px-6 mr-52">
                    <NavLink className="hover:text-blue-300" to='/'>Home</NavLink>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-28 text-xl w-screen text-white"> 
                    <NavLink className="hover:text-blue-300" to='/deposit'>Deposit</NavLink>
                    <NavLink className="hover:text-blue-300" to='/withdraw'>Withdraw</NavLink>
                </div>
                {(isConnected) && 
                <div className="flex w-60 items-center justify-center border rounded-full text-white text-md font-bold px-4 bg-red-600 py-1">
                    {chain.id !== 5 ? <button key={5} onClick={() => switchNetwork?.(5)}>Wrong Network</button> : chain.name + " Testnet"}
                </div>
                }
                <div className="flex w-40 items-center justify-center text-lg text-white h-100% mx-4">
                    {(isConnected) ? 
                    <div className="border text-sm items-center py-2 px-4 rounded-full bg-blue-600">
                        {address.slice(0,6)}.....{address.slice(address.length-6,address.length)}
                    </div>
                    : <button className="border-2 border-blue-700 text-blue-700 bg-blue-300 h-12 rounded-lg p-2 w-36" onClick={() => connect()}>Connect Wallet</button>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;