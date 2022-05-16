import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList, fetchTrend } from "../api";

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
  width: 1000px;
  height: 100%;
  max-width: 600px;
  margin: auto;
  margin-bottom: 50px;
`;

const SmallContainer= styled.div`
  display: flex;
  width:1000px;

`

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
  margin: 30px 30px 0px 0px;
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
  :hover {
    a {
      color: #d8bf2e;
      font-weight: bolder;
      border-radius: 10px;
    }
    transform: scale(1.03);
  }
`;

const TrendBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:250px;
  height:600px;
  background-color: transparent;
`

const TrendCoin = styled.div`
   background-color: ${(props) => props.theme.liColor};
   color:black;
  text-align: center;
  width: 250px;
  height: 60px;
  color: black;
  border-radius: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const TrendTitle = styled.h1`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
  color: white;
  margin-bottom: 10px;
  font-size: 24px;
`
const SubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
`;

const SmallTitle = styled.h3`
  font-size:12px;
`


function Search() {
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `(${year}-${month}-${day}) 기준`;
  }
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
  console.log()
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>JiCoin(Search)</title>
          </Helmet>
        </HelmetProvider>
        <Title>
          <Link to={{ pathname: "/home" }}>검색 단어 : {keyword}</Link>
        </Title>
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <SmallContainer>
          <CoinsList>
          {isListData?.slice(0, 200).map(
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
        <TrendBox>
          <TrendTitle>
            검색량 순위
            <SubTitle>{getToday()}</SubTitle>
          </TrendTitle>
          {isTrendData?.coins?.map((coin:any)=>coin?.item).map((x:any)=>(
            <TrendCoin key={Math.random()}>
              {x.score+1}.  
              <Img src={x.thumb} style={{margin: "0px 10px"}}/>
              {x.name}
            </TrendCoin>
          ))}
          <SmallTitle>
            출처(CoinGecko Web Site)
          </SmallTitle>
        </TrendBox>
        </SmallContainer>
      )}
      
    </Container>
  );
}

export default Search;
