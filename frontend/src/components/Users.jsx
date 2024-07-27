import { lazy, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Button = lazy(() => import("./Button"))
const InputBox = lazy(() => import("../components/InputBox"))

export default function Users() {
    
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchUsers = async () =>  {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/searchUser?filter="+search,{
                    headers:{
                        'authorization':"Beared " + localStorage.getItem("token")
                    }
                })
                setUsers(response.data.users)
            }catch(error){
            console.log(error);
            }
        }
        fetchUsers()
    },[search])

    function onChangeHandle(e) {
        setSearch(e.target.value)
    }

    return <div>
        <div className="m-2 mr-8 pt-2 pl-2">
            <InputBox id="searchUser" type="text" placeholder="Search users.." onChange={onChangeHandle} text="Users"></InputBox>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user}></User> )
            }
        </div>
        
    </div>
}

function User({user}) {
    const navigate = useNavigate()

    return <div className="flex justify-between mx-2 mr-8">
        <div className="p-1 pl-3 flex justify-center items-center gap-2">
            <div className="rounded-full w-10 h-10 text-center p-2 bg-slate-300"> S </div>
            <div className="text-md">{user.firstName} {user.lastName}</div>
        </div>
        <div className="p-1 pl-3 flex justify-center items-center gap-2">
            <Button id="sendMoney" text="Send Money" onClick={() => {
                navigate("/send?id="+user._id+"&name="+user.firstName+" "+user.lastName)
                }}></Button>
        </div>  
    </div>
}