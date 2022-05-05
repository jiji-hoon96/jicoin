import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 10px 0px;
`;

const SubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  padding: 0px 20px;
  width: 500px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled(motion.div)`
  margin: 20px 0px;
`;

const Coin = styled(motion.div)`
  background-color: ${(props) => props.theme.liColor};
  color: black;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    justify-content: center;
    font-size: 25px;
    font-weight: bolder;
  }
  &:hover {
    a {
      background-color: ${(props) => props.theme.hoverColor};
      border-radius: 10px;
      transform: scale(1.03);
    }
  }
`;

const Loader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 500px;
  height: 200px;
  font-size: 30px;
  border-radius: 10px;
  font-weight: bolder;
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Pagearray = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 50px;
  height: 20px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  :hover {
    transform: scale(1.1);
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

interface CoinListData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const coinarray = 20;
function Home() {
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `(${year}-${month}-${day}) 기준`;
  }
  const { isLoading, data } = useQuery<CoinListData[]>(
    "CoinList",
    FetchCoinList,
    {
      refetchInterval: 10000,
    }
  );
  return (
    <Container>
      <Header>
        <Title>가상화폐 시총 순위</Title>
        <SubTitle>{getToday()}</SubTitle>
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <Pagearray>
          <button>이전</button>
          <CoinsList initial="invisible" animate="visible" exit="exit">
            {data?.slice(0, 5).map((coin) => (
              <Coin key={coin.id}>
                <Link to={{ pathname: `/${coin.id}` }}>
                  {coin.rank}. &nbsp;
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name}({coin.symbol})
                </Link>
              </Coin>
            ))}
          </CoinsList>
          <button>다음</button>
        </Pagearray>
      )}
    </Container>
  );
}

export default Home;
