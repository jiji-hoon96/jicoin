import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinList } from "../api";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const COINCOUNT = 10;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 20px 0px;
`;

const Nav = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ListDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FavBtn = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  :hover {
    background-color: #d8bf2e;
    transform: scale(1.2);
  }
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
    transition: 0.4;
    background-color: #d8bf2e;
  }
`;

const MyPageButton = styled.button`
  width: 60px;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: bolder;
  :hover {
    transform: scale(1.2);
    transition: 0.5s;
    background-color: #d8bf2e;
  }
`;

const Header = styled.header`
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled(motion.div)`
  margin: 5px 0px;
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
  margin: 0px 10px 10px 0px;
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
      transform: scale(1.02);
      transition: 0.3;
    }
  }
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  position: relative;
  cursor: pointer;
  svg {
    height: 25px;
    :hover {
      color: #d8bf2e;
    }
  }
`;

const Input = styled(motion.input)`
  transform-origin: center right center;
  width: 400px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  position: absolute;
  right: 40px;
  border-radius: 10px;
  border: none;
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

interface SerachInfo {
  keyword: "string";
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
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { register, handleSubmit } = useForm<SerachInfo>();
  const inputAnimation = useAnimation();
  const increaseList = () => {
    setDirection(false);
    setIndex((prev) => (prev > 180 ? prev : prev + COINCOUNT));
  };
  const decreaseList = () => {
    setDirection(true);
    setIndex((prev) => (prev === 0 ? 0 : prev - COINCOUNT));
  };
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  const onValid = (data: SerachInfo) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>JiCoin(시총순위)</title>
          </Helmet>
        </HelmetProvider>
        <Nav>
          <Search onSubmit={handleSubmit(onValid)}>
            <motion.svg
              onClick={toggleSearch}
              whileHover={{ scale: 1.3 }}
              transition={{ type: "tween" }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </motion.svg>
            <Input
              {...register("keyword", { required: true })}
              transition={{ type: "linear" }}
              initial={{ scaleX: 0 }}
              animate={inputAnimation}
              placeholder="Please enter the word you want to find in English"
            />
          </Search>
          <Link to={{ pathname: "/mypage" }}>
            <MyPageButton>
              <FontAwesomeIcon icon={faUserAlt} size="lg" />
            </MyPageButton>
          </Link>
        </Nav>
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
              <ListDiv key={coin.id}>
                <Coin key={coin.id}>
                  <Link to={{ pathname: `/${coin.id}` }}>
                    {coin.rank}. &nbsp;
                    <Img
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    />
                    {coin.name} ({coin.symbol}){" "}
                  </Link>
                </Coin>
                <FavBtn>
                  <FaStar size="1.5em" />
                </FavBtn>
              </ListDiv>
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
