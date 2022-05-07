import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const COINCOUNT = 10;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 30px 0px;
`;

const SubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
`;

const Container = styled.div`
  padding: 0px 20px;
  width: 600px;
  height: 100%;
  max-width: 600px;
  margin: auto;
  margin-bottom: 50px;
`;
const Loader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 600px;
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

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: bolder;
  :hover {
    transform: scale(1.1);
    background-color: #d8bf2e;
  }
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled(motion.div)`
  margin: 30px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.liColor};
  text-align: center;
  width: 400px;
  height: 60px;
  color: black;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 18px;
    transition: color 0.2s ease-in;
    justify-content: center;
    font-size: 15px;
    font-weight: bolder;
  }
  &:hover {
    a {
      background-color: #d8bf2e;
      border-radius: 10px;
      transform: scale(1.01);
    }
  }
`;

const coinVariants = {
  start: (direction: boolean) => ({
    x: direction ? -300 : 300,

    opacity: 0,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: (direction: boolean) => ({
    x: direction ? 300 : -300,

    opacity: 0,
  }),
};

interface CoinListData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

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
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);

  const increaseList = () => {
    setDirection(false);
    setIndex((prev) => (prev > 180 ? prev : prev + COINCOUNT));
  };
  const decreaseList = () => {
    setDirection(true);
    setIndex((prev) => (prev === 0 ? 0 : prev - COINCOUNT));
  };
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>JiCoin(시총순위)</title>
          </Helmet>
        </HelmetProvider>
        <Title>가상화폐 시총 순위</Title>
        <SubTitle>{getToday()}</SubTitle>
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <AnimatePresence initial={false} exitBeforeEnter>
          <CoinsList
            custom={direction}
            variants={coinVariants}
            initial="start"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            key={index}
          >
            {data?.slice(index, index + COINCOUNT).map((coin) => (
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
          )
          <BtnDiv>
            <Button onClick={decreaseList}>
              {index === 0
                ? "첫페이지"
                : `${index - COINCOUNT + 1}위 ~ ${index}위`}
            </Button>
            <Button onClick={increaseList}>
              {index > 180
                ? "마지막페이지"
                : `${index + COINCOUNT + 1}위 ~ ${index + COINCOUNT * 2}위`}
            </Button>
          </BtnDiv>
        </AnimatePresence>
      )}
    </Container>
  );
}

export default React.memo(Home);
