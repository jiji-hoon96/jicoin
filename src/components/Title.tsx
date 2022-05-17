import styled from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 10px;
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
  font-size: 24px;
  margin-bottom: 10px;
`;