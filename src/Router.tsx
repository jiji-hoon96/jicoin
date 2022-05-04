import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from "./Routes/Chart";
import Coin from "./Routes/Coin";
import Home from "./Routes/Home";
import Info from "./Routes/Info";
import Login from "./Routes/Login";
import Mypage from "./Routes/Mypage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/coin" element={<Coin />}></Route>
        <Route path="/info" element={<Info />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
