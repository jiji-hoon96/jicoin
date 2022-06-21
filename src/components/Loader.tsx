import styled from "styled-components";

export const Loader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width:600px;
  height:600px;
  border-radius: 10px;
  font-weight: bolder;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
`;