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
width:500px;
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
flex-direction: column;
`;

const Coin = styled.div`
    display: inline-block;
    border-radius: 0;
    color:${(props)=>props.theme.loginColor};
    background-color: transparent;
    border: none;
    padding:20px 0px;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
  :hover{
    transform: scale(1.05);
  }
  &:before,
  &:after{
    content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 0;

  }
  &:before{
    transition: width 0s ease,background .4s ease;
    left: 0;
    right: 0;
      bottom: 6px;
  }
  &:after{
    right: 2.2%;
      bottom: 6px;
      background:${(props)=>props.theme.loginColor};
    transition: width .4s ease;
  }
  
  &:hover{
    &:before{
      width: 97.8%;
      background:${(props)=>props.theme.loginColor};
        transition: width .4s ease;
    }
    &:after{
      width: 97.8%;
        background: 0 0;
      transition: all 0s ease;
    }
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  top:6px;
  margin-right: 10px;
`;
const TrendBox = styled.div`
border: 1px groove white;
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
  background-color:transparent;
  text-align: center;
  width: 250px;
  height: 60px;
  color: ${(props)=> props.theme.fontColor};
  border-radius: 15px;
  margin : 0px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;
`


function Search() {
  const [searchParams, _] = useSearchParams();
  const keyword: any = searchParams.get("keyword");
  const {isLoading:isTrendLoading, data: isTrendData} = useQuery(
    "TrendList",
    fetchTrend
  )
  const { isLoading:isListLoading, data: isListData } = useQuery<CoinListData[]>(
    "CoinList",
    FetchCoinList,
  );
  const isLoading = isTrendLoading || isListLoading; 
  const exist = isListData?.slice(0, 500).map(
    (coin) =>
      (coin.name.toLowerCase().includes(keyword) ||
        coin.symbol.toLowerCase().includes(keyword) ||
        coin.id.toLowerCase().includes(keyword))).includes(true);
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
              <Link to={{ pathname: "/coinlist" }}>?????? ?????? : {keyword}</Link>
            </Title>
            {exist ? "" : <h1>(???????????? ??????)</h1>}
          </>
        )}
      </Header>
      {isLoading ? (
        <Loader>?????? ????????? ???????????? ????????????</Loader>
      ) : (
        <SmallContainer>
          {exist ? <CoinsList>
          {isListData?.slice(0, 500).map(
            (coin) =>
              (coin.name.toLowerCase().includes(keyword) ||
                coin.symbol.toLowerCase().includes(keyword) ||
                coin.id.toLowerCase().includes(keyword)) ? (
                <Coin key={coin.id}>
                  <Link to={{ pathname: `/coinlist/${coin.id}` }}>
                    {coin.rank}. &nbsp;
                    <Img
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    />
                    {coin.name}({coin.symbol})
                  </Link>
                </Coin>
              ) : ""
          )}
        </CoinsList> : ""}
        <TrendBox>
          <SearchTitle>
            ????????? ??????
            <SearchSubTitle>{getToday()}</SearchSubTitle>
          </SearchTitle>
          {isTrendData?.coins?.map((coin:any)=>coin?.item).map((x:any)=>(
            <TrendCoin key={Math.random()}>
              <Img  src={x.thumb} style={{marginLeft: "4px" , position:"relative" ,top:"1px"}}/>
              {x.name}
            </TrendCoin>
          ))}
          <SearchSmallTitle>
            ??????(CoinGecko Web Site)
          </SearchSmallTitle>
        </TrendBox>
        </SmallContainer>
      )}
      
    </Container>
  );
}

export default Search;
