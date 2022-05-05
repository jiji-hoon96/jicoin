import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Mypage from "./Routes/Mypage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/:coinId" element={<Coin />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
