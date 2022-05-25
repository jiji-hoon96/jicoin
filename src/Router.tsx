import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/sign" element={<Sign/>}></Route>
        <Route path="/:coinlist" element={<CoinList />}></Route>
        <Route path="/:coinlist/:coinId" element={<Coin />}></Route>
        <Route path="/:coinlist/:coinId/chart" element={<Chart />} />
        <Route path="/:coinlist/:coinId/market" element={<Market />} />
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
