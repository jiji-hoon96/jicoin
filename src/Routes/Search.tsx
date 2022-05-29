import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList, fetchTrend } from "../api";
import { Container, SmallContainer } from "../components/Container";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { SearchTitle, SearchSubTitle,Title,SearchSmallTitle } from "../components/Title";
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
width:400px;
display: flex;
align-items: center;
height: 600px;
overflow: auto;
overflow-x: hidden;
cursor: pointer;
::-webkit-scrollbar{
    width: 5px;
  };
  ::-webkit-scrollbar-thumb{
    background-color: ${(props) => props.theme.fontColor};
  }
  ::-webkit-scrollbar-track{
    background-color: ${(props) => props.theme.bgColor};
  }
margin: 10px 10px;
display: flex;
flex-direction: column;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.defaultBoxColor};
  text-align: center;
  width:90%;
  height: 60px;
  color:  ${(props) => props.theme.fontColor};
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
      background-color: ${(props) => props.theme.boxColor};
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
const TrendBox = styled.div`
border: 3px groove white;
border-radius: 10px;
display: flex;
flex-direction: column;
margin-top: 60px;
justify-content: center;
align-items: center;
width:300px;
height:500px;
background-color: transparent;
`

const TrendCoin = styled.div`
  padding: 0px 20px;
  background-color: ${(props) => props.theme.defaultBoxColor};
  text-align: center;
  width: 250px;
  height: 60px;
  color: ${(props)=> props.theme.fontColor};
  border-radius: 15px;
  margin : 0px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 13px;
`


function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword: any = searchParams.get("keyword");
  const {isLoading:isTrendLoading, data: isTrendData} = useQuery(
    "TrendList",
    fetchTrend,{
      refetchInterval: 10000,
    }
  )
  const { isLoading:isListLoading, data: isListData } = useQuery<CoinListData[]>(
    "CoinList",
    FetchCoinList,
    {
      refetchInterval: 10000,
    }
  );
  const isLoading = isTrendLoading || isListLoading
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>{`Search : ${keyword} | JiCoin`}</title>
          </Helmet>
        </HelmetProvider>
        {isLoading ? "" : (
          <>
            <Title>
              <Link to={{ pathname: "/coinlist" }}>검색 단어 : {keyword}</Link>
            </Title>
          </>
        )}
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <SmallContainer>
          <CoinsList>
          {isListData?.slice(0, 500).map(
            (coin) =>
              (coin.name.toLowerCase().includes(keyword) ||
                coin.symbol.toLowerCase().includes(keyword) ||
                coin.id.toLowerCase().includes(keyword)) && (
                <Coin key={coin.id}>
                  <Link to={{ pathname: `/coinlist/${coin.id}` }}>
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
        <TrendBox>
          <SearchTitle>
            검색량 순위
            <SearchSubTitle>{getToday()}</SearchSubTitle>
          </SearchTitle>
          {isTrendData?.coins?.map((coin:any)=>coin?.item).map((x:any)=>(
            <TrendCoin key={Math.random()}>
              <Img src={x.thumb} style={{marginLeft: "4px"}}/>
              {x.name}
            </TrendCoin>
          ))}
          <SearchSmallTitle>
            출처(CoinGecko Web Site)
          </SearchSmallTitle>
        </TrendBox>
        </SmallContainer>
      )}
      
    </Container>
  );
}

export default Search;
