import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const COINCOUNT = 5;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 30px 0px;
`;

const SubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  margin-bottom: 30px;
`;

const Container = styled.div`
  padding: 0px 20px;
  width: 600px;
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

const Pagearray = styled.div``;

const CoinarrayBtn = styled.button``;

const CoinsList = styled(motion.div)``;

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

const coinVariants = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: { x: -500, opacity: 0, scale: 0, transition: { duration: 1 } },
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
  const increaseList = () => {
    setIndex((prev) => (prev > 200 ? prev : prev + COINCOUNT));
  };
  const decreaseList = () => {
    setIndex((prev) => (prev === 0 ? 0 : prev - COINCOUNT));
  };
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
          <AnimatePresence initial={false}>
            <CoinsList
              variants={coinVariants}
              initial="invisible"
              animate="visible"
              exit="exit"
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
          </AnimatePresence>
          <button onClick={decreaseList}>
            {index === 0
              ? "이전페이지없음"
              : `${index + 1 - COINCOUNT}~${index + COINCOUNT - 1}`}
            감소
          </button>
          <button onClick={increaseList}>
            {`${index + COINCOUNT * 2}~${index + COINCOUNT * 3}`}증가
          </button>
        </Pagearray>
      )}
    </Container>
  );
}

export default Home;
