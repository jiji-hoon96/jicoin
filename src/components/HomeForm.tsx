import { motion } from "framer-motion";
import styled from "styled-components";

export const Box = styled(motion.div)`
  width: 600px;
  height: 600px;
  display: flex;
  justify-content: center;
  background-color:${(props)=>props.theme.boxColor};;
  border-radius: 30px;
`;
export const LoginForm = styled(motion.div)`
  margin:50px 0px;
  background-color: transparent;
`;

export const ModalForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 20px;
  width:800px;
  height:100%;
`;


export const SmallNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin:0px 30px;
`;
export const Banner = styled.h3`
  color: ${(props)=>props.theme.loginColor};
  font-size: 32px;
  font-weight: bolder;
  margin-bottom: 20px;
  letter-spacing: 5px;
`;

export const BannerImg = styled.div`
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
  color: ${(props)=>props.theme.fontColor};
  flex-direction: column;
  input {
    font-size: 24px;
    cursor: pointer;
    width: 300px;
    height: 50px;
    margin: 5px;
    border : none;
    color: ${(props)=>props.theme.fontColor};
    border-radius: 10px;
    text-align: center;
    background-color: transparent;
    font-weight: bolder;
    :focus {
      outline: none;
    }
    ::placeholder{
    color:${(props)=>props.theme.loginColor};
    font-weight: 200;
  }
  }
  input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active {transition: background-color 5000s; -webkit-text-fill-color: black !important;}

  span {
    color: ${(props)=>props.theme.errorColor};;
  }
`;

export const SubmitBtn = styled.input`
  color: ${(props)=>props.theme.fontColor};
  :hover{
    transform: scale(1.1);
    background-color:#${(props)=>props.theme.bgColor};;
  }
`