import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinMarket } from "../api";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  :hover {
    a {
      color: ${(props) => props.theme.hoverColor};
      font-weight: bolder;
      border-radius: 10px;
    }
    transform: scale(1.03);
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.viewColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const MarketList = styled.ul`
  width: 100%;
`;

const MarketSolo = styled.li`
  height: 70px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.accentColor};
  border-radius: 5px;
  margin-top: 10px;
  :hover {
    transform: scale(1.03) translate(1s);
    background-color: ${(props) => props.theme.hoverColor};
    cursor: pointer;
  }
  p {
    margin-top: 4px;
    color: ${(props) => props.theme.nullColor};
  }
  h2 {
    font-size: 18px;
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
      refetchInterval: 3000,
    }
  );
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{pathname.slice(1)}</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>
          <Link to={{ pathname: `/${coinId}` }}>
            {`${coinId.split("-")[0].toUpperCase()} 상장 거래소`}
          </Link>
        </Title>
      </Header>
      <div>
        {isLoading ? (
          "마켓을 로딩중입니다"
        ) : (
          <Overview>
            <OverviewItem>
              <MarketList>
                {data?.slice(0, 15).map((x) => (
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
