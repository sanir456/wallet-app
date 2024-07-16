import { lazy } from "react"

const Balance = lazy(() => import("../components/Balance"))
const Users = lazy(() => import("../components/Users"))
const InputBox = lazy(() => import("../components/InputBox"))

const user = [
    {
        "username": "ravi@gmail.com",
        "firstName": "ravi",
        "lastName": "ranpariya",
        "_id": "669559b177aae9c9f36e52bc"
    },
    {
        "username": "sani@gmail.com",
        "firstName": "sani",
        "lastName": "ranpariya",
        "_id": "669559ba77aae9c9f36e52c1"
    },
    {
        "username": "puja@gmail.com",
        "firstName": "puja",
        "lastName": "ranpariya",
        "_id": "669559c177aae9c9f36e52c6"
    }
]

export default function Dashboard() {
    return <div>
        <Balance balance={10000}></Balance>
        <hr></hr>
        <div className="m-2 mr-8 pt-2 pl-2">
            <InputBox id="searchUser" type="text" placeholder="Search users.." text="Users"></InputBox>
        </div>
        <Users users={user}></Users>
    </div>
}