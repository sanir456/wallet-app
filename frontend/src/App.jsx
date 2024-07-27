import { BrowserRouter, Routes , Route , Navigate} from "react-router-dom"
import axios from "axios"
import { lazy, Suspense, useEffect, useState } from "react"
import { userAtom } from "./store/atoms/user"
import { useRecoilState } from "recoil"
const Navbar = lazy(() => import("./components/Navbar"))
const Signup = lazy(() => import("./pages/Signup"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const SendMoney = lazy(() => import("./pages/SendMoney"))

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user,setUser] = useRecoilState(userAtom)

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers:{
              'authorization':"Beared " + localStorage.getItem("token")
          }
        })
        console.log(response.data);
        console.log("hi");
        setUser({
          ...response.data.user,
          isLoggedIn:true
        })
       
      }catch(error){
        console.log(error);
        setUser({isLoggedIn:false})
      }finally{
        setIsLoading(false)
      }
    }
    isLoggedIn()
  },[])

  if(isLoading){
    console.log("loading");
    return
  }

  return <div>
    
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Suspense fallback={"..Loading"}><Navigate to={ user.isLoggedIn ? "/dashboard":"/signin" }></Navigate> </Suspense>}></Route>
        <Route path="/signup" element={<Suspense fallback={"..Loading"}><Signup></Signup></Suspense>}></Route>
        <Route path="/signin" element={<Suspense fallback={"..Loading"}><Signin></Signin></Suspense>}></Route>
        <Route path="/dashboard" element={<Suspense fallback={"..Loading"}><Dashboard></Dashboard></Suspense>}></Route>
        <Route path="/send" element={<Suspense fallback={"..Loading"}><SendMoney></SendMoney></Suspense>}></Route>
      </Routes>
    </BrowserRouter>

  </div>
}

export default App
