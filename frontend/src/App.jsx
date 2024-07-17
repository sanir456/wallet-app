import { BrowserRouter, Routes , Route} from "react-router-dom"

import { lazy, Suspense } from "react"

const Navbar = lazy(() => import("./components/Navbar"))
const Signup = lazy(() => import("./pages/Signup"))
const Signin = lazy(() => import("./pages/Signin"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const SendMoney = lazy(() => import("./pages/SendMoney"))

function App() {

  return <div>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Suspense fallback={"..Loading"}><Signup></Signup></Suspense>}></Route>
        <Route path="/signup" element={<Suspense fallback={"..Loading"}><Signup></Signup></Suspense>}></Route>
        <Route path="/signin" element={<Suspense fallback={"..Loading"}><Signin></Signin></Suspense>}></Route>
        <Route path="/dashboard" element={<Suspense fallback={"..Loading"}><Dashboard></Dashboard></Suspense>}></Route>
        <Route path="/send" element={<Suspense fallback={"..Loading"}><SendMoney></SendMoney></Suspense>}></Route>
      </Routes>
    </BrowserRouter>

  </div>
}

export default App
