import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinMarket } from "../api";
import { Container } from "./Container";
import { Loader } from "./Loader";

const Overview = styled.div`
  width: 500px;
  height: 1000px;
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow-y: auto;
  padding: 10px 5px;
  border-radius: 10px;

  @media screen and (max-width: 1100px) {
    height: 400px;
  }
  @media screen and (max-width: 600px) {
    width: 300px;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.fontColor};
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
`;
const OverviewItem = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 3px;
  }
`;

const MarketList = styled.ul`
  width: 100%;
`;

const MarketSolo = styled.li`
  height: 70px;
  width: 450px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  margin-top: 5px;
  @media screen and (max-width: 600px) {
    width: 200px;
  }
  a {
    display: inline-block;
    border-radius: 0;
    color: ${(props) => props.theme.fontColor};
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    letter-spacing: 2px;

    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    :hover {
      background-color: #bec9e7;
    }
  }
`;

const MarketSoloSmallTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MarketSoloSmallInput = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: 5px;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
interface IMarket {
  exchange_id: string;
  exchange_name: string;
  pair: string;
  base_currency_name: string;
  quote_currency_id: string;
  market_url: string;
  quotes: {
    USD: {
      volume_24h: string;
      price: number;
    };
  };
}

function Market() {
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[2];
  const { isLoading, data } = useQuery<IMarket[]>(
    ["market", coinId],
    () => fetchCoinMarket(coinId),
    {
      refetchInterval: 300000,
    }
  );
  return (
    <Container>
      <div>
        {isLoading ? (
          <Loader>거래소 정보를 불러오는 중입니다</Loader>
        ) : (
          <Overview>
            <OverviewItem>
              <MarketList>
                {data?.slice(0, 50).map((x) => (
                  <MarketSolo key={Math.random()}>
                    <MarketSoloSmallTitle>
                      <a
                        href={x.market_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MarketSoloSmallInput>
                          {`${x.exchange_name} : $${x.quotes.USD.price.toFixed(
                            3
                          )}`}
                        </MarketSoloSmallInput>
                      </a>
                    </MarketSoloSmallTitle>
                  </MarketSolo>
                ))}
              </MarketList>
            </OverviewItem>
          </Overview>
        )}
      </div>
    </Container>
  );
}

export default Market;
