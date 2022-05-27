import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  width:400px;
  height: 200px;
  border: 3px groove ${(props) => props.theme.boxColor};
  border-radius: 10px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.boxColor};
    color: ${(props) => props.theme.fontColor};
      font-weight: bolder;
      border-radius: 10px;
    transform: scale(1.03);
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
flex-direction: column;
color:  ${(props) => props.theme.fontColor};
margin: 10px 0px;
font-size: 15px;
`
export const SearchSubTitle = styled.h2`
  color: ${(props) => props.theme.fontColor};
  font-size: 12px;
`;

export const SearchSmallTitle = styled.h3`
  font-size:12px;
  margin-bottom: 10px;
`