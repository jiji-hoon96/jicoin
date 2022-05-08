import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList } from "../api";

interface CoinListData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  width: 600px;
  height: 100%;
  max-width: 600px;
  margin: auto;
  margin-bottom: 50px;
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

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.liColor};
  text-align: center;
  width: 400px;
  height: 60px;
  color: black;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 18px;
    transition: color 0.2s ease-in;
    justify-content: center;
    font-size: 15px;
    font-weight: bolder;
  }
  &:hover {
    a {
      background-color: #d8bf2e;
      border-radius: 10px;
      transform: scale(1.01);
    }
  }
`;
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 30px 0px;
`;

function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword: any = searchParams.get("keyword");
  const { isLoading, data } = useQuery<CoinListData[]>(
    "CoinList",
    FetchCoinList,
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>JiCoin(Search)</title>
          </Helmet>
        </HelmetProvider>
        <Title>검색 단어 : {keyword}</Title>
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 200).map(
            (coin) =>
              (coin.name.toLowerCase().includes(keyword) ||
                coin.symbol.toLowerCase().includes(keyword) ||
                coin.id.toLowerCase().includes(keyword)) && (
                <Coin key={coin.id}>
                  <Link to={{ pathname: `/${coin.id}` }}>
                    {coin.rank}. &nbsp;
                    <Img
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    />
                    {coin.name}({coin.symbol})
                  </Link>
                </Coin>
              )
          )}
        </CoinsList>
      )}
    </Container>
  );
}

export default Search;
