import styled from "styled-components";
import { motion } from "framer-motion";

export const Btn = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-right: 30px;
  &:hover {
    transform: scale(1.04);
    background-color: ${(props)=>props.theme.boxColor};;
  }
`;

export const BtnBorder = styled.div`
  width:300px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const TabBtn = styled.button<{ isActive: boolean }>`
  text-align: center;
  width: 150px;
  height: 50px;
  margin-right: 10px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  &:hover {
    transform: scale(1.04);
    background-color: ${(props)=>props.theme.boxColor};;
  }
`;

export const NavBtn = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  height: 30px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  background-color: white;
  font-size: 15px;
  font-weight: bolder;
  color: ${(props)=>props.theme.bgColor};;
  :hover {
    transform: scale(1.2);
    transition: 0.5s;
    
  }
`;


export const LoginWelcomeBtn = styled(motion.button)`
  color: ${(props) => props.theme.fontColor};
  letter-spacing: 5px;
  background-color: transparent;
  border: none;
  font-size: 80px;
  cursor: pointer;
`;

export const CoinBtn = styled.button`
font-size: 15px;
width:200px;
height: 50px;
border: none;
font-weight: bold;
margin-right: 5px;
border-radius: 10px;
cursor: pointer;
:hover {
    background-color: ${(props)=>props.theme.boxColor};;
    transform: scale(1.04);
  }
`

export const SearchBtn = styled.form`
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
      color: ${(props) => props.theme.boxColor};
    }
  }
`;