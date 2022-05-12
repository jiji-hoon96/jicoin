import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FetchYoutubeApi } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  width: 600px;
  height: 100%;
  max-width: 600px;
  margin: auto;
  margin-bottom: 50px;
`;

const Header = styled.header`
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 20px 0px;
`;

const Loader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 600px;
  height: 200px;
  font-size: 30px;
  border-radius: 10px;
  font-weight: bolder;
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
`;

const YoutubeList = styled.div`
  margin: 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const YotubeData = styled.div`
  background-color: ${(props) => props.theme.liColor};
  text-align: center;
  width: 400px;
  height: 60px;
  color: black;
  border-radius: 15px;
  margin: 0px 10px 10px 0px;
`;

function Youtube() {
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[1].split("-")[0];
  const { isLoading, data } = useQuery(["youtubeApi", coinId], () =>
    FetchYoutubeApi(coinId)
  );
  console.log(data?.items.map((item: any) => item));
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>JiCoin(시총순위)</title>
          </Helmet>
        </HelmetProvider>
        <Title>{coinId} Youtube </Title>
      </Header>
      {isLoading ? (
        <Loader>{coinId} Youtube 정보를 불러오는 중입니다</Loader>
      ) : (
        <YoutubeList>
          {data?.items?.map((item: any) => (
            <YotubeData key={item.id.videoId}>
              <img src={item.snippet.thumbnails.default.url}></img>
              {item.snippet.title}
              <p>{item.snippet.description}</p>
            </YotubeData>
          ))}
        </YoutubeList>
      )}
    </Container>
  );
}

export default Youtube;
