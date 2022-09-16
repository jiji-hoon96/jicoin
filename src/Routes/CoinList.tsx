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
import {
  faCalculator,
  faLightbulb,
  faMoon,
  faSignOut,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { SubTitle, Title } from "../components/Title";
import { Header } from "../components/Header";
import { Btn, BtnBorder, NavBtn, SearchBtn } from "../components/Button";
import { getToday } from "../components/useSkill/getDay";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import { CoinsListImg } from "../components/Image";
import { coinVariants } from "../components/variants/coinVariants";
import { gql, useReactiveVar } from "@apollo/client";
import Avatar from "../components/Avatar";

const COINCOUNT = 10;

const Nav = styled.div`
  width: 550px;
  margin: 20px 0px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 650px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 250px;
  }
`;

const ListDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled(motion.div)`
  margin: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Coin = styled.div`
  display: inline-block;
  border-radius: 0;
  color: ${(props) => props.theme.loginColor};
  background-color: transparent;
  border: none;
  padding: 20px 0px;
  cursor: pointer;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  :hover {
    transform: scale(1.05);
    height: 600;
  }
  @media screen and (max-width: 650px) {
    font-size: 16px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: center right center;
  width: 400px;
  height: 30px;
  border: none;
  font-size: 24px;
  text-align: center;
  position: absolute;
  right: 40px;
  color: ${(props) => props.theme.loginColor};
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  ::placeholder {
    color: ${(props) => props.theme.loginColor};
  }
  @media screen and (max-width: 650px) {
    font-size: 18px;
    width: 300px;
  }
  @media screen and (max-width: 400px) {
    width: 170px;
    font-size: 14px;
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

interface SerachInfo {
  keyword: "string";
}

function CoinList() {
  const darkMode = useReactiveVar(darkModeVar);
  const { isLoading, data: coinData } = useQuery<CoinListData[]>(
    "CoinList",
    FetchCoinList
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
  const onValid = (coinData: SerachInfo) => {
    navigate(`/search?keyword=${coinData.keyword}`);
  };
  const onLogout = () => {
    navigate("/");
  };
  const onPrice = () => {
    navigate("/price");
  };
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>시총순위 | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        {isLoading ? (
          ""
        ) : (
          <>
            <Nav>
              <SearchBtn onSubmit={handleSubmit(onValid)}>
                <motion.svg
                  onClick={toggleSearch}
                  whileHover={{ scale: 1.1 }}
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
                  {...register("keyword", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z]*$/,
                      message: "검색은 영어만 가능합니다.",
                    },
                  })}
                  transition={{ type: "linear" }}
                  initial={{ scaleX: 0 }}
                  animate={inputAnimation}
                  placeholder="검색은 영어만 가능합니다"
                />
              </SearchBtn>
              <NavBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
                <FontAwesomeIcon
                  icon={darkMode ? faLightbulb : faMoon}
                  size="lg"
                />
              </NavBtn>
              <NavBtn onClick={onLogout}>
                <FontAwesomeIcon icon={faSignOut} size="lg" />
              </NavBtn>
              <NavBtn onClick={onPrice}>
                <FontAwesomeIcon icon={faCalculator} size="lg" />
              </NavBtn>
            </Nav>
            <Title>가상화폐 시총 순위</Title>
            <SubTitle>{getToday()}</SubTitle>
          </>
        )}
      </Header>
      {isLoading ? (
        <Loader>코인 정보를 불러오는 중입니다</Loader>
      ) : (
        <AnimatePresence initial={false} exitBeforeEnter key={Math.random()}>
          <CoinsList
            custom={direction}
            variants={coinVariants}
            initial="start"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            key={index}
          >
            {coinData?.slice(index, index + COINCOUNT).map((coin) => (
              <ListDiv key={coin.id}>
                <Link to={{ pathname: `/coinlist/${coin.id}` }}>
                  <Coin key={coin.id}>
                    {coin.rank}. &nbsp;
                    <CoinsListImg
                      src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                    />
                    {coin.name} ({coin.symbol}){" "}
                  </Coin>
                </Link>
              </ListDiv>
            ))}
          </CoinsList>
          )
          <BtnBorder>
            <Btn onClick={decreaseList} style={{ margin: 0 }}>
              {index === 0
                ? "첫페이지"
                : `${index - COINCOUNT + 1}위 ~ ${index}위`}
            </Btn>
            <Btn onClick={increaseList} style={{ margin: 0 }}>
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

export default React.memo(CoinList);
