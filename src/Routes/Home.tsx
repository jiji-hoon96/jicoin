import { Container } from "../components/Container";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Header } from "../components/Header";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LoginWelcomeBtn } from "../components/Button";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/HomeForm";
import { boxVariants } from "../components/variants/box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { motion } from "framer-motion";

export const HomeBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  align-items: center;
`;

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = useReactiveVar(darkModeVar);
  const onOpenForm = () => {
    setIsOpen((prev) => !prev);
  };
  const HomeBtn = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    height: 100%;
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
  `;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Home | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <HomeBox>
          <HomeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontAwesomeIcon
              icon={darkMode ? faLightbulb : faMoon}
              size="10x"
            />
          </HomeBtn>
          <AnimatePresence>
            {isOpen ? (
              <LoginForm
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              ></LoginForm>
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
        </HomeBox>
      </Header>
    </Container>
  );
}

export default Home;
