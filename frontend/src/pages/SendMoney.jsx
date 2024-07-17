import { lazy } from "react"

const InputBox = lazy(() => import("../components/InputBox"))

export default function SendMoney() {
    return <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="flex flex-col shadow shadow-md px-8 bg-white">
            <div className="p-16 pt-8 pb-8 text-3xl font-bold text-center">
                Send Money
            </div>
            <div className=" flex flex-row justify-start items-center gap-2">
                <div className="rounded-full w-10 h-10 text-center p-2 bg-green-600"> S </div>
                <div className="text-md font-semibold"> Sani ranpariya</div>
            </div>
            <div className="py-2">
                <InputBox id="amount" type="number" text="Amount (in Rs)" placeholder="Enter Amount"></InputBox>
            </div>
            <div className="pb-8">
                <button id="tx_init"  className="bg-green-600 text-white font-medium w-full rounded-md text-xs p-2 my-2">Initiate Transfer</button>
            </div>
        </div>
    </div>
}