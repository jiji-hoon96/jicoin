import { useQuery } from "react-query";
import { FetchYoutubeApi } from "../api";

function Youtube() {
  const { isLoading, data } = useQuery("youtubeApi", FetchYoutubeApi, {
    refetchInterval: 10000,
  });
  console.log(data);
  return <h1>This is Youtube Page</h1>;
}

export default Youtube;
