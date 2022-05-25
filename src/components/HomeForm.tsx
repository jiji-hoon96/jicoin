import { motion } from "framer-motion";
import styled from "styled-components";

export const Box = styled(motion.div)`
  width: 500px;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
export const LoginForm = styled(motion.div)`
  width: 500px;
  height: 650px;
  background-color: whitesmoke;
  border-radius: 30px;
`;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const SmallNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
export const Banner = styled.h3`
  color: black;
  font-size: 24px;
  font-weight: bolder;
  margin-bottom: 20px;
  letter-spacing: 5px;
`;

export const BannerImg = styled.img`
  width: 220px;
  height: 220px;
  background-image: url("img/logo.png");
  background-position: center;
  background-size: cover;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;
  input {
    font-size: 14px;
    cursor: pointer;
    width: 250px;
    height: 50px;
    margin: 5px;
    border: 1px solid #020d10;
    border-radius: 10px;
    text-align: center;
    background-color: #f3f3f3;
    :focus {
      color: white;
      font-weight: bolder;
      transform: scale(1.09);
      background-color: #525252;
    }
  }
  span {
    color: orangered;
  }
`;