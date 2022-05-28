import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Title } from "../components/Title";
import useUser from "../hooks/useUser";

const WelcomeDiv = styled.div`
  margin-top: 10px;
`
const MyAvatarDiv = styled.div`
  margin:  20px 0px 10px 0px;
`

const MyAvatarImg = styled.img`
  width:100px;
  height:100px;
  border-radius: 10px;
`

function Mypage() {
  const {data} = useUser();
  return (
    <Container>
     <Header>
        <HelmetProvider>
          <Helmet>
            <title>My Page | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <Title>
          <Link to={{ pathname: "/coinlist" }}> My Page</Link>
        </Title>
        <MyAvatarDiv>{data?.me?.avatar === "" || null || undefined  ? <FontAwesomeIcon icon={faUserAlt} size="5x" /> : <MyAvatarImg src={data?.me?.avatar} />}</MyAvatarDiv>
        <WelcomeDiv>{`안녕하세요 ${data?.me?.nickname}님`}</WelcomeDiv>
      </Header>
    </Container>
  );
}

export default Mypage;
