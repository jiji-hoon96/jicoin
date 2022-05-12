import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Box = styled(motion.div)`
  width: 500px;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const LoginForm = styled(motion.div)`
  width: 500px;
  height: 650px;
  background-color: whitesmoke;
  border-radius: 30px;
`;

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
      color: white;
      font-weight: bolder;
      transform: scale(1.09);
      background-color: #525252;
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

const Button = styled(motion.button)`
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 5px;
  background-color: transparent;
  border: none;
  font-size: 80px;
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
  width: 220px;
  height: 220px;
  background-image: url("img/logo.png");
  background-position: center;
  background-size: cover;
  margin-bottom: 20px;
`;

const NavBtn = styled.button`
  margin: 5px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 100px;
  height: 30px;
  border: 1px solid #020d10;
  border-radius: 10px;
  text-align: center;
  border: none;
  background-color: #343a2b;
  color: white;
  :hover {
    color: white;
    font-weight: bolder;
    transform: scale(1.09);
  }
`;

const SmallNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

interface LoginForm {
  id: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit = (data: any) => console.log(data);
  const [haveid, setHaveid] = useState(true);
  const onSignUp = () => {
    setHaveid((prev) => !prev);
  };
  const [isOpen, setIsOpen] = useState(false);
  const onOpenForm = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>JiCoin(Login)</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Box>
          <AnimatePresence>
            {isOpen ? (
              <LoginForm
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                {haveid ? (
                  <ModalForm>
                    <SmallNav>
                      <NavBtn onClick={onSignUp}>
                        {haveid ? "회원가입" : "로그인"}
                      </NavBtn>{" "}
                      <NavBtn onClick={onOpenForm}>Exit</NavBtn>
                    </SmallNav>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <BannerImg />
                      <Banner>JiCoin (로그인)</Banner>
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
                        {...register("password", {
                          required: "비밀번호는 필수입니다",
                          maxLength: 20,
                        })}
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                      />
                      <span>{errors.password?.message}</span>
                      <input type="submit" style={{ fontWeight: "bolder" }} />
                    </Form>
                  </ModalForm>
                ) : (
                  <ModalForm>
                    <SmallNav>
                      <NavBtn onClick={onSignUp}>
                        {haveid ? "회원가입" : "로그인"}
                      </NavBtn>{" "}
                      <NavBtn onClick={onOpenForm}>Exit</NavBtn>
                    </SmallNav>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <BannerImg />
                      <Banner>JiCoin (회원가입)</Banner>
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
                          required: "비밀번호는 확인은 필수입니다",
                          maxLength: 20,
                        })}
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                      />
                      <span>{errors.passwordConfirm?.message}</span>
                      <input type="submit" style={{ fontWeight: "bolder" }} />
                    </Form>
                  </ModalForm>
                )}
              </LoginForm>
            ) : (
              <Button
                whileHover={{
                  scale: 1.2,
                  rotateX: 10,
                  transitionDuration: "0.7s",
                }}
                onClick={onOpenForm}
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                WelCome <br /> JiCoin
              </Button>
            )}
          </AnimatePresence>
        </Box>
      </Header>
    </Container>
  );
}

export default Login;
