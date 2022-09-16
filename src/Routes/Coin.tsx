import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { BtnBorder, CoinBtn, NavBtn, TabBtn } from "../components/Button";
import Chart from "../components/Chart";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { SubTitle, Title } from "../components/Title";
import { getToday } from "../components/useSkill/getDay";
import Market from "../components/Market";
import Price from "./Price";

const CoinContainer = styled.div`
  background-color: transparent;
  margin: 50px 0px;
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1440px) {
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 1100px) {
    width: 100%;
    flex-direction: column;
    margin: 0 auto;
    height: 1000px;
  }
`;

const OverviewItem = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  width: 600px;
  height: 100px;
  @media screen and (max-width: 1100px) {
    height: 50px;
  }
  @media screen and (max-width: 600px) {
    width: 300px;
  }
`;

const MiniTitleValue = styled.div`
  font-size: 32px;
  width: 600px;
  height: 50px;
  color: ${(props) => props.theme.fontColor};
  background-color: transparent;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  margin: 20px 0px;
  text-align: center;
  line-height: 2em;
  overflow: auto;
  width: 70%;
  height: 250px;
  background-color: transparent;
  padding: 10px 20px;
  color: ${(props) => props.theme.fontColor};
  border-radius: 10px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.fontColor};
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
`;
const EmptyDescription = styled.div`
  margin: 20px 0px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100px;
  background-color: transparent;
  font-size: 20px;
  padding: 10px 20px;
  color: ${(props) => props.theme.fontColor};
  border-radius: 10px;
`;

const OverDiv = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  width: 50%;
  float: right;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  const coinId = pathname.split("/")[2];
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
  const [bigTab, setBigTab] = useState(0);
  const cointabArr = [
    { name: "시총순위", value: `${infoData?.rank} 위` },
    { name: "표준명", value: `SYMBOL : ${infoData?.symbol}` },
    { name: "가격", value: ` $ ${priceData?.quotes?.USD.price.toFixed(3)}` },
    {
      name: "현재공급량",
      value: `${priceData?.total_supply.toLocaleString()} 개`,
    },
    {
      name: "전체공급량",
      value: `${priceData?.max_supply.toLocaleString()} 개`,
    },
  ];
  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
    setBigTab(1);
  };
  const onChangeBigChart = () => {
    setBigTab(2);
  };
  const onChangeBigMarket = () => {
    setBigTab(3);
  };

  const marketMatch = useMatch("/coinlist/:coinId/market");
  const chartMatch = useMatch("/coinlist/:coinId/chart");

  const loading = infoLoading || priceLoading;
  return (
    <CoinContainer>
      <HelmetProvider>
        <Helmet>
          <title>{coinId.split("-")[0].toUpperCase()} Coin | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        {loading ? (
          <Loader>코인 정보를 불러오는 중입니다</Loader>
        ) : (
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
            {infoData?.description === "" ||
            infoData?.description === undefined ||
            infoData?.description === null ? (
              <EmptyDescription>{`${infoData?.symbol}의 정보는 존재하지 않습니다`}</EmptyDescription>
            ) : (
              <Description>{infoData?.description}</Description>
            )}
            <OverviewItem>
              {cointabArr.map((ele, index) => {
                return (
                  <CoinBtn key={index} onClick={() => selectMenuHandler(index)}>
                    {ele.name}
                  </CoinBtn>
                );
              })}
            </OverviewItem>
            <BtnBorder>
              <TabBtn isActive={chartMatch !== null} onClick={onChangeBigChart}>
                차트
              </TabBtn>
              <TabBtn
                isActive={marketMatch !== null}
                onClick={onChangeBigMarket}
              >
                상장 거래소
              </TabBtn>
            </BtnBorder>
          </>
        )}
      </Header>
      {loading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <OverDiv>
          <MiniTitleValue>
            {bigTab === 1 ? (
              `${cointabArr[currentTab].value}`
            ) : bigTab === 2 ? (
              <Chart />
            ) : bigTab === 3 ? (
              <Market />
            ) : (
              ""
            )}
          </MiniTitleValue>
        </OverDiv>
      )}
    </CoinContainer>
  );
}

export default Coin;
