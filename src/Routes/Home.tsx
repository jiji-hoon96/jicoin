import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  margin: 30px 0px 10px 0px;
`;

const SubTitle = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-size: 24px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  padding: 0px 20px;
  width: 500px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  margin: 20px 0px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.liColor};
  color: black;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    justify-content: center;
    font-size: 25px;
    font-weight: bolder;
  }
  &:hover {
    a {
      background-color: ${(props) => props.theme.hoverColor};
      border-radius: 10px;
      transform: scale(1.03);
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 50px;
  height: 20px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  :hover {
    transform: scale(1.1);
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

function Home() {
  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `(${year}-${month}-${day}) 기준`;
  }
  return (
    <Container>
      <Header>
        <Title>가상화폐 시총 순위</Title>
        <SubTitle>{getToday()}</SubTitle>
      </Header>
    </Container>
  );
}

export default Home;
