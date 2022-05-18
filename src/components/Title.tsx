import { motion } from "framer-motion";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.accentColor};
  cursor: pointer;
  :hover {
      color: #d8bf2e;
      font-weight: bolder;
      border-radius: 10px;
    transform: scale(1.03);
  }
`;

export const SubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 20px;
  margin-bottom: 10px;
`;

export const MiniTitleValue = styled(motion.div)`
  font-size: 15px;
  margin-bottom: 10px;
`

export const SearchTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
margin-bottom: 10px;
font-size: 15px;
`
export const SearchSubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 12px;
`;

export const SearchSmallTitle = styled.h3`
  font-size:12px;
`