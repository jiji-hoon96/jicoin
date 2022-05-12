import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from "./Routes/Chart";
import Coin from "./Routes/Coin";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Market from "./Routes/Market";
import Mypage from "./Routes/Mypage";
import Search from "./Routes/Search";
import Youtube from "./Routes/Youtube";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/:coinId" element={<Coin />}></Route>
        <Route path="/:coinId/chart" element={<Chart />} />
        <Route path="/:coinId/market" element={<Market />} />
        <Route path="/:coinId/youtube" element={<Youtube />} />
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
