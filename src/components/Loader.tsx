import styled from "styled-components";

export const Loader = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 500px;
  height: 500px;
  font-size: 30px;
  border-radius: 10px;
  font-weight: bolder;
  background-color:${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
`;