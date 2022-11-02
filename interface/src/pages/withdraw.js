import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { Web3 } from 'web3';
import { useAccount } from "wagmi";
import { useBalance } from 'wagmi';
import { useSigner } from 'wagmi';
import { useProvider } from "wagmi";
import timelockWalletABI from '../contractABI/timelockWalletABI.json';
import erc20ABI from '../contractABI/ERC20ABI.json';
import { Biconomy } from "@biconomy/mexa";
import 'react-dropdown/style.css';

const Withdraw = () => {

    let biconomy;
    let ethersProvider;

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
        if(withdrawValue > 0) {
            let contractInterface = new ethers.utils.Interface(timelockWalletABI);

            let functionSignature;
            if(selectedToken.symbol === "ETH") {
                functionSignature = contractInterface.encodeFunctionData("withdrawEther", [ethers.utils.parseUnits(withdrawValue, "ether")]);
            } else {
                const withdrawValueinWei = ethers.utils.parseUnits(withdrawValue, selectedToken.decimals);
                functionSignature = contractInterface.encodeFunctionData("withdrawToken", [selectedToken.contract, withdrawValueinWei]);
            }

            const params = [{
                "from": address,
                "to": ethers.utils.hexlify("0x9bD1C105DaAB3a2494e0F8573FB137357e5ea4F5"),
                "value": "0x0", 
                "data": functionSignature,
                "signatureType": biconomy.EIP712_SIGN
            }];

            await ethersProvider.send('eth_sendTransaction', params);
        }
    }

    
    const getTokensBalance = async () => {

        let jsonData = JSON.stringify({
            query: `{
                wallets(where: {user: "${address.toLowerCase()}"}) {
                  id
                  user {
                    user
                      }
                  token {
                    contract
                  }
                  balance
                  locktime
                }
              }`,
            variables: {}
            }) 

        jsonData = jsonData.replaceAll("/\\",'');

        var myHeaders = new Headers();
        myHeaders.append("content-type", "application/json");

        var requestOptions = (FETCH_TYPE) => {
            return {
                method: 'POST',
                headers: myHeaders,
                body: FETCH_TYPE,
                redirect: 'follow'
            }
        };

        let response = await fetch("https://api.studio.thegraph.com/query/37459/biconomy-lock-contract/v1", requestOptions(jsonData));

        if(response.status === 200) {
            let data = await response.json();
            for (let wallet of data.data.wallets) {
                // Get balance of token 
                let balance = wallet.balance;
                if(wallet.token.contract) {
                    const metadataRaw = JSON.stringify({
                        "jsonrpc": "2.0",
                        "method": "alchemy_getTokenMetadata",
                        "headers": {
                        'Content-Type': 'application/json'
                        },
                        "params": [
                            `${wallet.token.contract}`
                        ],
                        "id": 42
                    });
                    
                    const metadataOptions = {
                        method: 'POST',
                        body: metadataRaw,
                        redirect: 'follow',
                    };  
                    
                    // Get metadata of token
                    fetch("https://eth-goerli.g.alchemy.com/v2/hJQEQOBzlhThwfUEWk3r-QfpJfXp-78I", metadataOptions)
                    .then(response => response.json()).then(metadata => {
                        // Compute token balance in human-readable format
                        balance = balance/Math.pow(10, metadata.result.decimals);
                        balance = balance.toFixed(4);
                        // Print name, balance, and symbol of token
    
                        setTokensList(new Map(tokensList.set(metadata.result.symbol, {
                            name: metadata.result.name,
                            balance: balance,
                            symbol: metadata.result.symbol,
                            contract: wallet.token.contract,
                            decimals: metadata.result.decimals
                        })))
                        
                    })
                    .catch(error => console.log('error', error))
                } else {
                    balance = balance/Math.pow(10, 18);
                    balance = balance.toFixed(4);
                    setTokensList(new Map(tokensList.set('ETH', {
                        name: "Ethereum",
                        balance: balance,
                        symbol: 'ETH',
                        contract: "",
                        decimals: 18
                    })))
                }
            }
        }
    }

    useEffect(() => {
        const initBiconomy = async () => {
            biconomy = new Biconomy(window.ethereum,{ apiKey: "jMdIihglJ.a093e35e-f925-454a-833a-79026b6aadbb", debug: true });
            ethersProvider = new ethers.providers.Web3Provider(biconomy);
        }
        initBiconomy();
    })

    useEffect(() => {
        if(isConnected) {
            getTokensBalance();
        }
    },[isConnected])

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
                                            setSelectedToken({name: tokensList.get(token).name, balance: Number(tokensList.get(token).balance).toFixed(4), symbol: tokensList.get(token).symbol, contract: tokensList.get(token).contract, decimals: tokensList.get(token).decimals});
                                            setViewTokensList(!viewTokensList); 
                                        }} key={tokensList.get(token).symbol} className="rounded border flex flex-row items-center justify-between text-white w-full py-4 hover:bg-blue-800 bg-blue-700 my-4 px-2">
                                            <div>{tokensList.get(token).symbol}</div>
                                            <div>{tokensList.get(token).name}</div>
                                            <div>{Number(tokensList.get(token).balance).toFixed(4)}</div>
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