import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Btn } from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {Box , LoginForm, ModalForm,SmallNav, Banner, BannerImg,Form, SubmitBtn} from '../components/HomeForm'
import { boxVariants } from "../components/variants/box";
import { gql, useMutation,  } from "@apollo/client";
import {  logUserIn } from "../apollo";
import styled from "styled-components";

interface LoginForm {
  createSign: string;
  username: string;
  password: string;
}

const Notification = styled.div`
  color: ${(props)=>props.theme.boxColor};
`

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
  const location = useLocation();  
  const state = location.state as {createSign:string,username:string, password:string};
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({mode:"onChange", defaultValues:{
    createSign: state?.createSign || "",
    username: state?.username || "",
    password: state?.password || "",
  },
});
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
                            ????????????
                          </Btn>
                        </Link>   
                        <Link to={{ pathname: "/" }}>
                          <Btn>
                            ?????????
                          </Btn>
                        </Link>             
                    </SmallNav>
                    <Form onSubmit={handleSubmit(onSubmitValid)}>
                      <Banner>JiCoin (?????????)</Banner>
                      <Notification>{state?.createSign}</Notification>
                      <input
                        {...register("username", {
                          required: "???????????? ??????????????????",
                        })}
                        type="text"
                        placeholder="???????????? ??????????????????"
                      />
                      <span>{errors.username?.message}</span>
                      <input
                        {...register("password", {
                          required: "??????????????? ??????????????????",
                        })}
                        type="password"
                        placeholder="??????????????? ??????????????????"
                      />
                      <span>{errors.password?.message}</span>
                      <SubmitBtn type="submit" value="?????????" style={{ fontWeight: "bolder" }}/>
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
