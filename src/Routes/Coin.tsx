import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { BtnBorder, TabBtn } from "../components/Button";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import {  MiniTitleValue, SubTitle, Title } from "../components/Title";
import { getToday } from "../components/useSkill/getDay";
import { CoinBtn } from "../components/Button";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.accentColor};
  padding: 10px 20px;
  margin:10px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 50%;
  margin: 20px;
  align-items: center;
  background-color: ${(props) => props.theme.viewColor};
  color: ${(props) => props.theme.accentColor};
  width:50px;
  height: 50px;

`;

const Description = styled.div`
  margin: 20px 0px;
  text-align: center;
  line-height: 2em;
  overflow: auto;
  height:250px;
  background-color: ${(props) => props.theme.viewColor};
  padding: 10px 20px;
  color: ${(props) => props.theme.accentColor};
  border-radius: 10px;
  ::-webkit-scrollbar{
    width: 5px;
  };
  ::-webkit-scrollbar-thumb{
    background-color:  whitesmoke;
  }
  ::-webkit-scrollbar-track{
    background-color:  #343A2B;
  }
`;
const EmptyDescription = styled.div`
margin: 20px 0px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
height:100px;
font-size: 20px;
background-color: ${(props) => props.theme.viewColor};
padding: 10px 20px;
color: ${(props) => props.theme.accentColor};
border-radius: 10px;
`;



interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { pathname } = useLocation();
  const coinId = pathname.slice(1);
  const [selected, setSelected] = useState(false);
  const marketMatch = useMatch("/:coinId/market");
  const chartMatch = useMatch("/:coinId/chart");
  const transition = {
    type: "spring",
    duration: 1.5
  };
  const onClick = () =>{
    setSelected((prev)=>!prev)
  }
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 300000,
    }
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 300000,
    }
  );
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{coinId.split("-")[0].toUpperCase()} Coin | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>
          <Link to={{ pathname: "/home" }}>
            {coinId
              ? `${infoData?.name} (${infoData?.symbol})`
              : loading
              ? "Loading..."
              : infoData?.name}
          </Link>
        </Title>
        <SubTitle>{getToday()}</SubTitle>
      </Header>
      {loading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <>
        <AnimatePresence>
        <Overview>
            <OverviewItem>
              {selected ?  <MiniTitleValue onClick={onClick}>{infoData?.rank}</MiniTitleValue> :<CoinBtn onClick={onClick} transition={transition}>시총 순위</CoinBtn> }
              </OverviewItem>
              <OverviewItem>
              {selected ?  <MiniTitleValue onClick={onClick}>{infoData?.symbol}</MiniTitleValue> :<CoinBtn onClick={onClick} transition={transition}>거래소 마크</CoinBtn> }  
              </OverviewItem>
              <OverviewItem>
              {selected ?  <MiniTitleValue onClick={onClick}>{priceData?.quotes.USD.price.toFixed(3)}</MiniTitleValue> :<CoinBtn onClick={onClick} transition={transition}>가격</CoinBtn> }  
              </OverviewItem>
              <OverviewItem>
              {selected ?  <MiniTitleValue onClick={onClick}>{priceData?.total_supply}</MiniTitleValue> :<CoinBtn onClick={onClick} transition={transition}>현재까지 공급량</CoinBtn> }  
              </OverviewItem>
              <OverviewItem>
              {selected ?  <MiniTitleValue onClick={onClick}>{priceData?.max_supply}</MiniTitleValue> :<CoinBtn onClick={onClick} transition={transition}>전체 공급량</CoinBtn> }  
              </OverviewItem>
              
              
              
              
            
          </Overview>
        </AnimatePresence>
          {infoData?.description === "" ? <EmptyDescription>{`${infoData?.name}의 정보는 존재하지 않습니다`}</EmptyDescription> : <Description>{infoData?.description}</Description>}
          <BtnBorder>
            <TabBtn isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </TabBtn>
            <TabBtn isActive={marketMatch !== null}>
              <Link to={`/${coinId}/market`}>Market</Link>
            </TabBtn>
          </BtnBorder>
        </>
      )}
    </Container>
  );
}

export default Coin;
