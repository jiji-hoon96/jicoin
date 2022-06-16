import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { BtnBorder, CoinBtn, TabBtn } from "../components/Button";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import {  SubTitle, Title } from "../components/Title";
import { getToday } from "../components/useSkill/getDay";

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  padding: 10px 20px;
  margin:4px 0px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  width:600px;
  height: 100px;
`;

const MiniTitleValue = styled.div`
font-size: 15px;
width:200px;
height:50px;
color:${(props) => props.theme.fontColor};;
display: flex;
justify-content: center;
text-align: center;
align-items: center;
border-radius: 10px;
font-size: 28px;
background-color: ${(props) => props.theme.bgColor};
margin-bottom: 10px;
`


const Description = styled.div`
  margin: 20px 0px;
  text-align: center;
  line-height: 2em;
  overflow: auto;
  height:250px;
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px 20px;
  color: ${(props) => props.theme.fontColor};
  border-radius: 10px;
  ::-webkit-scrollbar{
    width: 5px;
  };
  ::-webkit-scrollbar-thumb{
    background-color: ${(props) => props.theme.fontColor};
  }
  ::-webkit-scrollbar-track{
    background-color: ${(props) => props.theme.bgColor};
  }
`;
const EmptyDescription = styled.div`
margin: 20px 0px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
height:100px;
background-color: ${(props) => props.theme.bgColor};
font-size: 20px;
padding: 10px 20px;
color: ${(props) => props.theme.fontColor};
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
  const coinId = pathname.split('/')[2];
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
  const [currentTab, setCurrentTab] = useState(0);
  const cointabArr = [
    {name : "시총순위", value : infoData?.rank},
    {name: "표준명", value : infoData?.symbol},
    {name: "가격", value : `$${priceData?.quotes?.USD.price.toFixed(3)}`},
    {name: "현재공급량", value: priceData?.total_supply},
    {name: "전체공급량", value: priceData?.max_supply}
  ]
  const selectMenuHandler = (index:number) => {
    setCurrentTab(index);
  };
  const marketMatch = useMatch("/coinlist/:coinId/market");
  const chartMatch = useMatch("/coinlist/:coinId/chart");
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{coinId.split("-")[0].toUpperCase()} Coin | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        {loading ? "" : (
          <>
            <Title>
              <Link to={{ pathname: "/coinlist" }}>
                {coinId
                  ? `${infoData?.name} (${infoData?.symbol})`
                  : loading
                  ? "Loading..."
                  : infoData?.name}
              </Link>
            </Title>
            <SubTitle>{getToday()}</SubTitle>
        </>
        )}
      </Header>
      {loading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <>
        <Overview>
            <OverviewItem>
            {cointabArr.map((ele,index)=>{
                return (
                  <CoinBtn key={index} onClick={()=>selectMenuHandler(index)}>
                    {ele.name}
                  </CoinBtn>
                )
              })}
            </OverviewItem>         
            <MiniTitleValue>
              {`${cointabArr[currentTab].value}`}
            </MiniTitleValue>
          </Overview>
          {infoData?.description === "" || infoData?.description === undefined  || infoData?.description === null ? <EmptyDescription>{`${infoData?.name}의 정보는 존재하지 않습니다`}</EmptyDescription> : <Description>{infoData?.description}</Description>}
          <BtnBorder>
            <Link to={`/coinlist/${coinId}/chart`} state={infoData?.symbol}>
              <TabBtn isActive={chartMatch !== null}>
                차트
              </TabBtn>
            </Link>
            <Link to={`/coinlist/${coinId}/market`}>
              <TabBtn isActive={marketMatch !== null}>
                상장 거래소
              </TabBtn>
            </Link>
          </BtnBorder>
        </>
      )}
    </Container>
  );
}

export default Coin;
