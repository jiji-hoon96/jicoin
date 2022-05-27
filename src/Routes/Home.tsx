import { Container } from "../components/Container";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Header } from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LoginWelcomeBtn } from "../components/Button";
import { Link } from "react-router-dom";
import {Box , LoginForm} from '../components/HomeForm'
import { boxVariants } from "../components/variants/box";

function Home(){
    const [isOpen, setIsOpen] = useState(false);
    const onOpenForm = () => {
        setIsOpen((prev) => !prev);
      };
    return (
        <Container>
          <HelmetProvider>
            <Helmet>
              <title>Home | JiCoin</title>
            </Helmet>
          </HelmetProvider>
          <Header>
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