import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Btn } from "../components/Button";
import { Link } from "react-router-dom";
import {Box , LoginForm, ModalForm,SmallNav, Banner, BannerImg,Form} from '../components/HomeForm'
import { boxVariants } from "../components/variants/box";

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
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Login | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Box>
          <AnimatePresence>
              <LoginForm
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                  <ModalForm>
                    <SmallNav>
                        <Link to={{ pathname: "/sign" }}>
                          <Btn>
                            Sign
                          </Btn>
                        </Link>   
                        <Link to={{ pathname: "/" }}>
                          <Btn>
                            Exit
                          </Btn>
                        </Link>             
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
              </LoginForm>
          </AnimatePresence>
        </Box>
      </Header>
    </Container>
  );
}

export default Login;
