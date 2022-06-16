import styled from "styled-components";

export const Container = styled.div`
  background-color: #${(props)=>props.theme.bgColor};;
  max-width: 1000px;
  width:1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 50px 0px;
  padding: 0px 20px;
  height: 100vh;
`;

export const SmallContainer= styled.div`
  display: flex;
  width: 100%;
`
