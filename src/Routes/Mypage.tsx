import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Title } from "../components/Title";

function Mypage() {
  return (
    <Container>
     <Header>
        <HelmetProvider>
          <Helmet>
            <title>My Page | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <Title>
          <Link to={{ pathname: "/home" }}> My Page</Link>
        </Title>
        
      </Header>
    </Container>
  );
}

export default Mypage;
