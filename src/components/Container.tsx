import styled from "styled-components";

export const Container = styled.div`
  background-color: transparent;
  display: flex;
  margin: 20px 0px;
  width: 1440px;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 1100px) {
    width: 70%;
    margin: 0 auto;
  }
  @media screen and (max-width: 650px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 350px;
  }
`;

export const SmallContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 800px;
  @media screen and (max-width: 1100px) {
    width: 100%;
    margin: 0 auto;
  }
  @media screen and (max-width: 600px) {
    width: 500px;
    margin: 0 auto;
  }
`;
