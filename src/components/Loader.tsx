import styled from "styled-components";

export const Loader = styled.span`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 700px;
  height: 200px;
  font-size: 30px;
  border-radius: 10px;
  font-weight: bolder;
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
`;