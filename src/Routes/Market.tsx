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
height:700px;
  display: flex;
  cursor: pointer;
  overflow: auto;
  padding: 20px 10px;
  border-radius: 10px;
  ::-webkit-scrollbar{
    width: 10px;
    
  };
  ::-webkit-scrollbar-thumb{
    background-color: ${(props) => props.theme.fontColor};
  }
  ::-webkit-scrollbar-track{
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
  height:80px;
  width: 300px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  background-color: ${(props) => props.theme.defaultBoxColor};;
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  margin-top: 5px;
  a {
    font-size: 13px;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 160px;
    align-items:center;
    height: 30px;
    border-radius:10px;

    :hover {
    transform:scale(1.15);
    cursor: pointer;
    font-weight: bolder;
    background-color: ${(props)=>props.theme.bgColor};
  }
    }

`;

const MarketSoloSmallTitle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const MarketSoloSmallInput = styled.div`
text-align: center;
align-items: center;
  display: flex;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`
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
      <HelmetProvider>
        <Helmet>
          <title>{coinId.split("-")[0].toUpperCase()} Markets | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        {isLoading  ? "" : (
          <>
          <Title>
            <Link to={{ pathname: `/coinlist/${coinId}` }}>
              {`${coinId.split("-")[0].toUpperCase()} 코인 상장 거래소`}
            </Link>
          </Title>
          </>
        )}
      </Header>
      <div>
        {isLoading ? (
          <Loader>마켓 정보를 불러오는 중입니다</Loader>
        ) : (
          <Overview>
            <OverviewItem>
              <MarketList>
                {data?.slice(0, 50).map((x) => (
                  <MarketSolo key={Math.random()}>
                    <MarketSoloSmallTitle>
                      <MarketSoloSmallInput>
                      {`${x.exchange_name} : $${x.quotes.USD.price.toFixed(3)}`}
                      </MarketSoloSmallInput>
                      <a
                      href={x.market_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >Go {x.exchange_name}</a>
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
