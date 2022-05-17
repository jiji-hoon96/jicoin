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
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { SubTitle, Title } from "../components/Title";
import { Header } from "../components/Header";
import { Btn, BtnBorder, HomeFavBtn, HomeMyPageBtn } from "../components/Button";
import { getToday } from "../components/useSkill/getDay";

const COINCOUNT = 10;

const Nav = styled.div`
  width: 100%;
  margin-bottom: 20px;
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

const Img = styled.img`
  width: 25px;
  position: relative;
  top: 8px;
  height: 25px;
  margin-right: 6px;
`;

const CoinsList = styled(motion.div)`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.liColor};
  width: 300px;
  height: 50px;
  color: black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s ease-in;
  font-size: 13px;
  font-weight: bolder;
  margin: 5px;
  &:hover {
      background-color: #d8bf2e;
      border-radius: 10px;
      transition: 0.3;
      transform: scale(1.01);
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
  width: 300px;
  height: 30px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  right: 40px;
  border-radius: 10px;
  border: none;
  font-weight: bolder;
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
  const { register, handleSubmit} = useForm<SerachInfo>();
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
            <title>시총순위 | JiCoin</title>
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
              {...register("keyword", { required: true ,pattern: { value: /^[a-zA-Z]*$/, message: "검색은 영어만 가능합니다." }
              })}
              transition={{ type: "linear" }}
              initial={{ scaleX: 0 }}
              animate={inputAnimation}
              placeholder="Enter the coin you want to find in English!"
            />
          </Search>
          <Link to={{ pathname: "/mypage" }}>
            <HomeMyPageBtn>
              <FontAwesomeIcon icon={faUserAlt} size="lg" />
            </HomeMyPageBtn>
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
                <HomeFavBtn>
                  <FaStar size="1.5em" />
                </HomeFavBtn>
              </ListDiv>
            ))}
          </CoinsList>
          )
          <BtnBorder>
            <Btn onClick={decreaseList}>
              {index === 0
                ? "첫페이지"
                : `${index - COINCOUNT + 1}위 ~ ${index}위`}
            </Btn>
            <Btn onClick={increaseList}>
              {index > 180
                ? "마지막페이지"
                : `${index + COINCOUNT + 1}위 ~ ${index + COINCOUNT * 2}위`}
            </Btn>
          </BtnBorder>
        </AnimatePresence>
      )}
    </Container>
  );
}

export default React.memo(Home);
