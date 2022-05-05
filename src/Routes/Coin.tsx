import { useLocation } from "react-router-dom";

interface RouteState {
  name: string;
}

function Coin() {
  const location = useLocation(); // pathname 안에 코인의 이름이 들어있음
  return <h1>This is Coin Page</h1>;
}

export default Coin;
