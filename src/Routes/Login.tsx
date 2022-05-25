import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Btn } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {Box , LoginForm, ModalForm,SmallNav, Banner, BannerImg,Form, SubmitBtn} from '../components/HomeForm'
import { boxVariants } from "../components/variants/box";
import { gql, useMutation,  } from "@apollo/client";
import {  logUserIn } from "../apollo";

interface LoginForm {
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;


function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({mode:"onChange"});
  const navigate = useNavigate();
  const onCompleted = (data:any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("username", {
        message: error,
      });
    }
    navigate('/coinlist')
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data:LoginForm) => {
    if (loading) {
      return;
    }
    const { username, password } = data;
    login({
      variables: { username, password },
    });
  };
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
                            회원가입
                          </Btn>
                        </Link>   
                        <Link to={{ pathname: "/" }}>
                          <Btn>
                            나가기
                          </Btn>
                        </Link>             
                    </SmallNav>
                    <Form onSubmit={handleSubmit(onSubmitValid)}>
                      <BannerImg />
                      <Banner>JiCoin (로그인)</Banner>
                      <input
                        {...register("username", {
                          required: "아이디는 필수입니다",
                          maxLength: 20,
                        })}
                        type="text"
                        placeholder="아이디를 입력해주세요"
                      />
                      <span>{errors.username?.message}</span>
                      <input
                        {...register("password", {
                          required: "비밀번호는 필수입니다",
                          maxLength: 20,
                        })}
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                      />
                      <span>{errors.password?.message}</span>
                      <SubmitBtn type="submit" style={{ fontWeight: "bolder" }}/>
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
