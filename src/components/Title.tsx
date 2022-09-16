import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 600;
  width: 800px;
  height: 100px;
  margin-bottom: 10px;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  :hover {
    font-weight: bolder;
    border-radius: 10px;
    transform: scale(1.01);
  }
  @media screen and (max-width: 650px) {
    width: 300px;
    font-size: 28px;
  }
`;

export const SubTitle = styled.h2`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  margin-bottom: 10px;
`;

export const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2;
  flex-direction: column;
  color: ${(props) => props.theme.fontColor};
  margin: 10px 0px;
  font-size: 36px;
`;
export const SearchSubTitle = styled.h2`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

export const SearchSmallTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 20px 0px;
`;
