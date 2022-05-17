import styled from "styled-components";
import { motion } from "framer-motion";

export const BtnBorder = styled.div`
      display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const Btn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  &:hover {
    transform: scale(1.04);
    background-color: #d8bf2e;
  }
`;

export const TabBtn = styled.button<{ isActive: boolean }>`
  text-align: center;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  text-transform: uppercase;
  &:hover {
    transform: scale(1.04);
    background-color: #d8bf2e;
  }
`;

export const HomeMyPageBtn = styled.button`
  width: 50px;
  height: 30px;
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

export const HomeFavBtn = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  :hover {
    background-color: #d8bf2e;
    transform: scale(1.1);
  }
`;


export const LoginWelcomeBtn = styled(motion.button)`
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 5px;
  background-color: transparent;
  border: none;
  font-size: 80px;
  cursor: pointer;
`;