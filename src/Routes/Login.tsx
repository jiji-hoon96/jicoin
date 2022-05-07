import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Modal from "react-modal";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  flex-direction: column;
  input {
    font-size: 14px;
    cursor: pointer;
    width: 250px;
    height: 50px;
    margin: 5px;
    border: 1px solid #020d10;
    border-radius: 10px;
    text-align: center;
    background-color: #f3f3f3;
    :focus {
      transform: scale(1.09);
      background-color: #e2d9d9;
    }
  }
  span {
    color: orangered;
  }
`;

const Header = styled.header`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 100vh;
  margin: auto;
`;

const Button = styled.button`
  color: ${(props) => props.theme.accentColor};
  background-color: transparent;
  border: none;
  font-size: 80px;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    font-weight: bolder;
    color: ${(props) => props.theme.accentColor};
  }
`;

const ModalBtn = styled.button`
  background-color: #010101;
  text-decoration: none;
  border: none;
  margin-top: 10px;
  padding: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
`;

const Banner = styled.h3`
  color: black;
  font-size: 24px;
  font-weight: bolder;
  margin-bottom: 20px;
  letter-spacing: 5px;
`;

const BannerImg = styled.img`
  width: 200px;
  height: 200px;
  background-image: url("img/logo.png");
  background-position: center;
  background-size: cover;
  margin-bottom: 20px;
`;

interface LoginForm {
  id: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit = (data: any) => console.log(data);
  const [modalOpen, setModalOpen] = useState(false);
  const onModalEvent = () => {
    setModalOpen((prev) => !prev);
  };
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>JiCoin(Login)</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Button onClick={onModalEvent}>JiCoin</Button>
      </Header>
      <Modal
        isOpen={modalOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "transparent",
          },
          content: {
            position: "absolute",
            top: "15%",
            left: "20%",
            width: "60%",
            height: "70%",
            background: "#F3F3F3",
            overflow: "auto",
            WebkitOverflowScrolling: "auto",
            borderRadius: 30,
          },
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BannerImg />
          <Banner>JiCoin</Banner>
          <input
            {...register("id", {
              required: "아이디는 필수입니다",
              maxLength: 20,
            })}
            type="text"
            placeholder="아이디를 입력해주세요"
          />
          <span>{errors.id?.message}</span>
          <input
            {...register("nickname", {
              required: "닉네임은 필수입니다",
              maxLength: 20,
            })}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <span>{errors.nickname?.message}</span>
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다",
              maxLength: 20,
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <span>{errors.password?.message}</span>
          <input
            {...register("passwordConfirm", {
              required: "비밀번호는 필수입니다",
              maxLength: 20,
            })}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
          />
          <span>{errors.passwordConfirm?.message}</span>
          <input type="submit" />
          <ModalBtn onClick={onModalEvent}>ESC</ModalBtn>
        </Form>
      </Modal>
    </Container>
  );
}

export default Login;
