import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Coin from "./Routes/Coin";
import CoinList from "./Routes/CoinList";
import Home from "./Routes/Home";
import Price from "./Routes/Price";
import Search from "./Routes/Search";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/coinlist" />} />
        <Route path="/" element={<Home />} />
        <Route path="/coinlist" element={<CoinList />} />
        <Route path="/price" element={<Price />} />
        <Route path="/coinlist/:coinId" element={<Coin />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
