import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Coin from "./Routes/Coin";
import CoinList from "./Routes/CoinList";
import Edit from "./Routes/Edit";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Mypage from "./Routes/Mypage";
import Price from "./Routes/Price";
import Search from "./Routes/Search";
import Sign from "./Routes/Sign";

function Router() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? < Route path="*" element={< Navigate to="/coinlist" />} /> : 
        <>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/sign" element={<Sign/>}/>
        </>
        }
        {!isLoggedIn ? < Route path="*" element={< Navigate to="/" />} /> : 
        <>
          <Route path="/coinlist" element={<CoinList />}/>
          <Route path="/coinlist/:coinId" element={<Coin />}/>
          <Route path="/mypage" element={<Mypage />}/>
          <Route path="/mypage/price" element={<Price />}/>
          <Route path="/mypage/edit" element={<Edit />}/>
          <Route path="/search" element={<Search />}/>
        </>
        }
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
