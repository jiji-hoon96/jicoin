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
  height: 750px;
  background-color: ${(props)=>props.theme.bgColor};
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
  color: ${(props)=>props.theme.fontColor};
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
    font-size: 16px;
    cursor: pointer;
    width: 250px;
    height: 50px;
    margin: 5px;
    border: 1px solid ${(props)=>props.theme.fontColor};;
    border-radius: 10px;
    text-align: center;
    background-color:${(props)=>props.theme.bgColor};
    :focus {
      color: ${(props)=>props.theme.fontColor};
      font-weight: bolder;
      transform: scale(1.09);
      background-color: #${(props)=>props.theme.hoverColor};
    }
  }
  span {
    color: ${(props)=>props.theme.hoverColor};;
  }
`;

export const SubmitBtn = styled.input`
  :hover{
    transform: scale(1.1);
    background-color:#${(props)=>props.theme.bgColor};;
  }
`