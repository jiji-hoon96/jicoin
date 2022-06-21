import styled from "styled-components";
import { motion } from "framer-motion";

export const Btn = styled.button`
    display: inline-block;
    width:150px;
    padding: 1em 0;
    border-radius: 0;
    color: ${(props)=>props.theme.loginColor};
    background-color: transparent;
    margin-top:2rem;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
  position: relative;
  &:before,
  &:after{
    content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 0;
  }
  &:before{
    transition: width 0s ease,background .4s ease;
    left: 0;
    right: 0;
      bottom: 6px;
  }
  &:after{
    right: 2.2%;
      bottom: 6px;
      background:  ${(props)=>props.theme.loginColor};
    transition: width .4s ease;
  }
  
  &:hover{
    &:before{
      width: 97.8%;
      background:  ${(props)=>props.theme.loginColor};
        transition: width .4s ease;
    }
    &:after{
      width: 97.8%;
        background: 0 0;
      transition: all 0s ease;
    }
  }
`;

export const BtnBorder = styled.div`
  display: flex;
`

export const TabBtn = styled.button<{ isActive: boolean }>`
 display: inline-block;
    padding: 1em 0;
    border-radius: 0;
    color:${(props)=>props.theme.loginColor};
    background-color: transparent;
    margin:20px;
    border: none;
    margin-top:2rem;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
  position: relative;
  &:before,
  &:after{
    content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 0;

  }
  &:before{
    transition: width 0s ease,background .4s ease;
    left: 0;
    right: 0;
      bottom: 6px;
  }
  &:after{
    right: 2.2%;
      bottom: 6px;
      background:${(props)=>props.theme.loginColor};
    transition: width .4s ease;
  }
  
  &:hover{
    &:before{
      width: 97.8%;
      background:${(props)=>props.theme.loginColor};
        transition: width .4s ease;
    }
    &:after{
      width: 97.8%;
        background: 0 0;
      transition: all 0s ease;
    }
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
  background-color: transparent;
  font-size: 15px;
  font-weight: bolder;
  color: ${(props)=>props.theme.loginColor};;
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
  display: inline-block;
    padding: 1em 0;
    border-radius: 0;
    color:${(props)=>props.theme.loginColor};
    background-color: transparent;
    margin:20px;
    border: none;
    margin-top:2rem;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
  position: relative;
  &:before,
  &:after{
    content: '';
      display: block;
      position: absolute;
      height: 1px;
      width: 0;

  }
  &:before{
    transition: width 0s ease,background .4s ease;
    left: 0;
    right: 0;
      bottom: 6px;
  }
  &:after{
    right: 2.2%;
      bottom: 6px;
      background:${(props)=>props.theme.loginColor};
    transition: width .4s ease;
  }
  
  &:hover{
    &:before{
      width: 97.8%;
      background:${(props)=>props.theme.loginColor};
        transition: width .4s ease;
    }
    &:after{
      width: 97.8%;
        background: 0 0;
      transition: all 0s ease;
    }
  }
`

export const SearchBtn = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  position: relative;
  cursor: pointer;
  svg {
    height: 25px;
    :hover {
      color: ${(props) => props.theme.fontColor};
    }
  }
`;