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
  height: 15vh;
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
  height: 55px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: bolder;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.accentColor};
  border-radius: 5px;
  margin-bottom: 10px;
  :hover {
    transform: scale(1.03) translate(1s);
    background-color: ${(props) => props.theme.hoverColor};
    cursor: pointer;
  }
  p {
    color: ${(props) => props.theme.nullColor};
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
    };
  };
}

interface CoinID {
  coinId: string;
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
      <Header>
        <Title>
          <Link to={{ pathname: `/${coinId}` }}>{`${coinId
            .split("-")[0]
            .toUpperCase()} 상장 거래소`}</Link>
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
                      Market: {x.exchange_name} <hr /> MarketURL:
                      {x.market_url !== null ? (
                        x.market_url
                      ) : (
                        <p>The market URL does not exist</p>
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
