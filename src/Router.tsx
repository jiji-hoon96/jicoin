import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import Chart from "./Routes/Chart";
import Coin from "./Routes/Coin";
import CoinList from "./Routes/CoinList";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Market from "./Routes/Market";
import Mypage from "./Routes/Mypage";
import Search from "./Routes/Search";
import Sign from "./Routes/Sign";

function Router() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/sign" element={<Sign/>}/>
        {!isLoggedIn ? < Route path="*" element={< Navigate to="/" />} /> : 
        <>
        <Route path="/:coinlist" element={<CoinList />}/>
        <Route path="/:coinlist/:coinId" element={<Coin />}/>
        <Route path="/:coinlist/:coinId/chart" element={<Chart />} />
        <Route path="/:coinlist/:coinId/market" element={<Market />} />
        <Route path="/mypage" element={<Mypage />}/>
        <Route path="/search" element={<Search />}/>
        </>
        }
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
