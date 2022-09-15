import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";

const WelcomeDiv = styled.div`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  :hover {
    transform: scale(1.04);
  }
`;
const MyAvatarDiv = styled.div`
  margin: 20px 0px 10px 0px;
`;

const MyAvatarImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const SelectDiv = styled.div`
  margin: 20px;
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectBtn = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  color: black;
  margin-left: 20px;
  font-size: 32px;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
    background-color: #bec9e7;
  }
`;

const MypageHeader = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
`;

function Mypage() {
  return (
    <Container>
      <MypageHeader>
        <HelmetProvider>
          <Helmet>
            <title>평단가 계산|JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <SelectDiv>
          <Link to={{ pathname: "/mypage/price" }}>
            <SelectBtn>평단가 계산</SelectBtn>
          </Link>
        </SelectDiv>
      </MypageHeader>
    </Container>
  );
}

export default Mypage;
