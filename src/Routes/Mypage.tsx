import { useQuery } from "react-query";
import { FetchYoutubeApi } from "../api";

function Mypage() {
  const { isLoading, data } = useQuery("youtubeApi", FetchYoutubeApi, {
    refetchInterval: 10000,
  });
  console.log(data);
  return <h1>This is Mypage Page</h1>;
}

export default Mypage;
