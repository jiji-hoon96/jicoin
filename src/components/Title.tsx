import styled from "styled-components";

export const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  :hover {
    a {
      color: #d8bf2e;
      font-weight: bolder;
      border-radius: 10px;
    }
    transform: scale(1.03);
  }
`;