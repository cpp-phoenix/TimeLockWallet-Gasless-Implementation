import React from "react";
import 'react-dropdown/style.css';

const Withdraw = () => {

    const handleSubmit = () => {
        alert(`The name you entered was:`)
    }

    return (
        <div className="h-96 w-100% flex justify-center items-center text-white text-2xl">
            <div className="border py-2 px-2 bg-blue-900 rounded-lg border-gray-900">
                <span className="flex w-full justify-center mb-2">Withdraw</span>
                <div className="flex flex-row bg-blue-700 py-6 px-2 rounded-lg">
                    <input className="placeholder:italic placeholder:text-slate-400 placeholder:text-lg placeholder:px-2 rounded-md border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-black text-lg" type="number" placeholder="0" name="name" />
                    <div className="text-lg ml-2 border rounded-lg px-4 bg-blue-800">
                        List
                    </div>
                </div>
                <button onClick={() => handleSubmit()} className="w-full hover:bg-blue-800 bg-blue-700 mt-4 rounded-lg p-2 text-lg">Enter Amount</button>
            </div>
        </div>
    )
}

export default Withdraw;