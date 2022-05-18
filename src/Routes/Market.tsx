import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinMarket } from "../api";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { Title } from "../components/Title";

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  background-color: ${(props) => props.theme.viewColor};
  padding: 20px 10px;
  border-radius: 10px;
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
  height: 75px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  background-color: whitesmoke;
  color: black;
  border-radius: 5px;
  margin-top: 10px;
  :hover {
    transform: scale(1.03) translate(1s);
    background-color: #d8bf2e;
    cursor: pointer;
  }
  p {
    margin-top: 4px;
    color: ${(props) => props.theme.nullColor};
  }
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
  a {
    margin: 7px 0px;
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
  const coinId = pathname.split("/")[1];
  const { isLoading, data } = useQuery<IMarket[]>(
    ["market", coinId],
    () => fetchCoinMarket(coinId),
    {
      refetchInterval: 300000,
    }
  );
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{coinId.split("-")[0].toUpperCase()} Markets | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>
          <Link to={{ pathname: `/${coinId}` }}>
            {`${coinId.split("-")[0].toUpperCase()} 코인 상장 거래소`}
          </Link>
        </Title>
      </Header>
      <div>
        {isLoading ? (
          <Loader>마켓 정보를 불러오는 중입니다</Loader>
        ) : (
          <Overview>
            <OverviewItem>
              <MarketList>
                {data?.slice(0, 8).map((x) => (
                  <MarketSolo key={Math.random()}>
                    <a
                      href={x.market_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2>
                        Market : {x.exchange_name} / Market Price : $
                        {x.quotes.USD.price.toFixed(3)}
                      </h2>
                      <hr /> MarketURL :&nbsp;
                      {x.market_url !== null ? (
                        x.market_url
                      ) : (
                        <p>해당 거래소의 URL을 찾을 수 없습니다</p>
                      )}
                    </a>
                  </MarketSolo>
                ))}
              </MarketList>
            </OverviewItem>
            <OverviewItem>
              <MarketList>
                {data?.slice(8, 16).map((x) => (
                  <MarketSolo key={Math.random()}>
                    <a
                      href={x.market_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h2>
                        Market : {x.exchange_name} / Market Price : $
                        {x.quotes.USD.price.toFixed(3)}
                      </h2>
                      <hr /> MarketURL :&nbsp;
                      {x.market_url !== null ? (
                        x.market_url
                      ) : (
                        <p>해당 거래소의 URL을 찾을 수 없습니다</p>
                      )}
                    </a>
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
