import { Container } from "../components/Container";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Header } from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LoginWelcomeBtn, NavBtn } from "../components/Button";
import { Link } from "react-router-dom";
import {Box , LoginForm} from '../components/HomeForm'
import { boxVariants } from "../components/variants/box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function Home(){
    const [isOpen, setIsOpen] = useState(false);
    const darkMode = useReactiveVar(darkModeVar);
    const onOpenForm = () => {
        setIsOpen((prev) => !prev);
      };
    const HomeBtn = styled.div`
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    height: 60px;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    background-color: transparent;
    font-size: 15px;
    font-weight: bolder;
    :hover {
      transform: scale(1.2);
      transition: 0.5s;
  }
    `
    return (
        <Container>
          <HelmetProvider>
            <Helmet>
              <title>Home | JiCoin</title>
            </Helmet>
          </HelmetProvider>
          <Header>
            <HomeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
              <FontAwesomeIcon icon={darkMode ? faLightbulb : faMoon} size="3x"/>
            </HomeBtn>
            <Box>
              <AnimatePresence>
              {isOpen ? (
              <LoginForm
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                  </LoginForm>
            ) : (
              <LoginWelcomeBtn
                whileHover={{
                  scale: 1.3,
                  rotateX: 10,
                  transitionDuration: "0.7s",
                  textShadow: "50px 50px 50px gray",
                }}
                onClick={onOpenForm}
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                <Link to={{ pathname: "/login" }}>
                    WelCome <br /> JiCoin
                </Link> 
              </LoginWelcomeBtn>
            )}
              </AnimatePresence>
            </Box>
            
          </Header>
        </Container>
      );
}

export default Home;