import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList, fetchTrend } from "../api";
import { Container, SmallContainer } from "../components/Container";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import {
  SearchTitle,
  SearchSubTitle,
  Title,
  SearchSmallTitle,
} from "../components/Title";
import { getToday } from "../components/useSkill/getDay";

interface CoinListData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const CoinsList = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  height: 800px;
  overflow: auto;
  overflow-x: hidden;
  cursor: pointer;
  @media screen and (max-width: 1100px) {
    width: 50%;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.fontColor};
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
  margin: 10px 10px;
  flex-direction: column;
`;

const Coin = styled.div`
  display: inline-block;
  border-radius: 0;
  color: ${(props) => props.theme.loginColor};
  font-weight: 600;
  background-color: transparent;
  border: none;
  padding: 20px 0px;
  cursor: pointer;
  font-size: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
  :hover {
    transform: scale(1.05);
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  position: relative;
  top: 6px;
  margin-right: 10px;
  @media screen and (max-width: 1100px) {
    width: 30px;
    height: 30px;
  }
`;
const TrendBox = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  background-color: transparent;
  @media screen and (max-width: 1100px) {
    width: 50%;
    margin: 0 auto;
  }
  @media screen and (max-width: 600px) {
    width: 200px;
    margin: 0 auto;
  }
`;

const TrendCoin = styled.div`
  padding: 0px 20px;
  background-color: transparent;
  text-align: center;
  width: 350px;
  height: 60px;
  color: ${(props) => props.theme.fontColor};
  border-radius: 15px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
`;

const NoResult = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword: any = searchParams.get("keyword");
  const { isLoading: isTrendLoading, data: isTrendData } = useQuery(
    "TrendList",
    fetchTrend
  );
  const { isLoading: isListLoading, data: isListData } = useQuery<
    CoinListData[]
  >("CoinList", FetchCoinList);
  const isLoading = isTrendLoading || isListLoading;
  const exist = isListData
    ?.slice(0, 500)
    .map(
      (coin) =>
        coin.name.toLowerCase().includes(keyword) ||
        coin.symbol.toLowerCase().includes(keyword) ||
        coin.id.toLowerCase().includes(keyword)
    )
    .includes(true);
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>{`Search : ${keyword} | JiCoin`}</title>
          </Helmet>
        </HelmetProvider>
        {isLoading ? (
          ""
        ) : (
          <>
            <Title>
              <Link to={{ pathname: "/coinlist" }}>검색 단어 : {keyword}</Link>
            </Title>
            {exist ? "" : <NoResult>(검색결과 없음)</NoResult>}
          </>
        )}
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <SmallContainer>
          {exist ? (
            <CoinsList>
              {isListData?.slice(0, 500).map((coin) =>
                coin.name.toLowerCase().includes(keyword) ||
                coin.symbol.toLowerCase().includes(keyword) ||
                coin.id.toLowerCase().includes(keyword) ? (
                  <Coin key={coin.id}>
                    <Link to={{ pathname: `/coinlist/${coin.id}` }}>
                      {coin.rank}. &nbsp;
                      <Img
                        src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                      />
                      {coin.name}({coin.symbol})
                    </Link>
                  </Coin>
                ) : (
                  ""
                )
              )}
            </CoinsList>
          ) : (
            ""
          )}
          <TrendBox>
            <SearchTitle>
              검색량 순위
              <SearchSubTitle>{getToday()}</SearchSubTitle>
            </SearchTitle>
            {isTrendData?.coins
              ?.map((coin: any) => coin?.item)
              .map((x: any) => (
                <TrendCoin key={Math.random()}>
                  {`${x?.score + 1} . `}
                  <Img
                    src={x.thumb}
                    style={{
                      marginLeft: "4px",
                      position: "relative",
                      top: "1px",
                    }}
                  />
                  {x.name}
                </TrendCoin>
              ))}
            <SearchSmallTitle>출처(CoinGecko Web Site)</SearchSmallTitle>
          </TrendBox>
        </SmallContainer>
      )}
    </Container>
  );
}

export default Search;
