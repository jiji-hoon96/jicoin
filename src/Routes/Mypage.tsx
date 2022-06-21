import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import useUser from "../hooks/useUser";

const WelcomeDiv = styled.div`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  :hover{
    transform: scale(1.04);
  }
`
const MyAvatarDiv = styled.div`
  margin:  20px 0px 10px 0px;
`

const MyAvatarImg = styled.img`
  width:100px;
  height:100px;
  border-radius: 10px;
`

const SelectDiv = styled.div`
  margin: 20px;
  width: 500px;
  height:500px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const SelectBtn = styled.div`
  width:200px;
  height:200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  color:black;
  margin-left: 20px;
  font-size: 32px;
  cursor: pointer;
  :hover{
    transform: scale(1.03);
    background-color: #bec9e7;
  }
`

const MypageHeader= styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
`


function Mypage() {
  const {data} = useUser();
  return (
    <Container>
     <MypageHeader>
        <HelmetProvider>
          <Helmet>
            <title>My Page | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <WelcomeDiv>
          <Link to={{ pathname: "/coinlist" }}>{`${data?.me?.nickname}님의 페이지 입니다`}</Link>
        </WelcomeDiv>
        <MyAvatarDiv>{data?.me?.avatar === "" || data?.me?.avatar ===null || data?.me?.avatar ===undefined  ? <FontAwesomeIcon icon={faUserAlt} size="5x" /> : <MyAvatarImg src={data?.me?.avatar} />}</MyAvatarDiv>
        <SelectDiv>
            <Link to={{pathname:'/mypage/price'}}>
              <SelectBtn>
                평단가 계산
              </SelectBtn>
            </Link>
            <Link to={{pathname:'/mypage/edit'}}>
              <SelectBtn>
                프로필 수정
              </SelectBtn>
            </Link>
            
          
        </SelectDiv>
      </MypageHeader>
    </Container>
  );
}

export default Mypage;
