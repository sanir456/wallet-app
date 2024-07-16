import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate()
    return <div className="flex justify-between px-2 pt-1 shadow shadow-md">
        <div className="p-1 pl-3 flex justify-center items-center gap-2">
            <img src="src/assets/logo.png" className="w-8 h-8 rounded-md" ></img>
            <div className="font-bold text-2xl" onClick={() => {navigate("/Dashboard")}}>Wallet</div>
        </div>
        <div className="p-1 pl-3 flex justify-center items-center gap-2">
            <div>Hello</div>
            <div className="rounded-full w-10 h-10 text-center p-2 bg-slate-300"> S </div>
        </div>
    </div>
}