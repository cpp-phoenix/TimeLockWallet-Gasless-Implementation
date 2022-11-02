import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useBalance } from 'wagmi';
import { useSigner } from 'wagmi';
import 'react-dropdown/style.css';

const Withdraw = () => {

    const { address, isConnected } = useAccount();

    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
        formatUnits: 'ether'
    })

    const [selectedToken, setSelectedToken] = useState({});

    const [viewTokensList, setViewTokensList] = useState(false);
    
    const [tokensList, setTokensList] = useState(new Map());

    const[withdrawValue, setWithdrawValue] = useState("0");

    const { data: signer } = useSigner()

    const handleChange = event => {
        setWithdrawValue(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = async () => {
    }

    const setEtherInMap = () => {
    }

    const getTokensBalance = async () => {
    }

    useEffect(() => {
        if(isConnected) {
            getTokensBalance();
        }
    },[isConnected])

    useEffect(() => {
        if(!isLoading && !isError) {
            setEtherInMap();
        }
    }, [isLoading]);

    return (
        <div>
            {
                viewTokensList && (
                    <div className="fixed flex flex-row justify-center w-full h-full">
                        <div className="relative border border-gray-800 w-80 h-[32rem] mt-20 bg-blue-900">
                            <div className="overflow-y-auto h-full px-2">
                                {
                                    [...tokensList.keys()].map(token =>
                                        <button onClick={() => {
                                            setSelectedToken({name: tokensList.get(token).name, balance: Number(tokensList.get(token).balance).toFixed(2), symbol: tokensList.get(token).symbol, contract: tokensList.get(token).contract, decimals: tokensList.get(token).decimals});
                                            setViewTokensList(!viewTokensList); 
                                        }} key={tokensList.get(token).symbol} className="rounded border flex flex-row items-center justify-between text-white w-full py-4 hover:bg-blue-800 bg-blue-700 my-4 px-2">
                                            <div>{tokensList.get(token).symbol}</div>
                                            <div>{tokensList.get(token).name}</div>
                                            <div>{Number(tokensList.get(token).balance).toFixed(2)}</div>
                                        </button>
                                    )
                                }
                                <div className="h-16"></div>
                            </div>
                            <button onClick={() => setViewTokensList(!viewTokensList)} className="absolute bottom-0 w-full border-t border-gray-800 text-xl text-white py-2 bg-blue-700 hover:bg-blue-800">Close</button>
                        </div>
                    </div>
                )
            }
            <div className="h-96 w-100% flex justify-center items-center text-white text-2xl">
                <div className="border py-2 px-2 bg-blue-900 rounded-lg border-gray-900">
                    <span className="flex w-full justify-center mb-2">Withdraw</span>
                    <div className="flex flex-row bg-blue-700 py-6 px-2 rounded-lg">
                        <input onChange={handleChange} className="placeholder:italic placeholder:text-slate-400 placeholder:text-lg placeholder:px-2 rounded-md border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-black text-lg" type="number" placeholder="0" name="name" />
                        <button onClick={() => setViewTokensList(!viewTokensList)} className="text-lg ml-2 border rounded-lg px-4 bg-blue-800">
                            { selectedToken.symbol ? 
                                <div className="w-full h-full">
                                    { selectedToken.symbol }
                                    <div className="absolute text-xs">
                                        {!viewTokensList && selectedToken.balance}
                                    </div>
                                </div> : "List"
                            }
                        </button>
                    </div>
                    {
                        !selectedToken.balance ? <button className="cursor-not-allowed w-full bg-blue-500 mt-4 rounded-lg p-2 text-lg" disabled>Select Token</button>
                        : <button onClick={() => handleSubmit()} className="w-full hover:bg-blue-800 bg-blue-700 mt-4 rounded-lg p-2 text-lg">Submit</button>
                    }
                </div>
        </div>
        </div>
    )
}

export default Withdraw;