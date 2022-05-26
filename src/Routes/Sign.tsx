import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { AnimatePresence } from "framer-motion";
import {Box , LoginForm, ModalForm,SmallNav, Banner, BannerImg,Form, SubmitBtn} from '../components/HomeForm'
import { Btn } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { boxVariants } from "../components/variants/box";
import { gql, useMutation } from "@apollo/client";

interface LoginForm {
    id: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
      $nickname: String!
      $username: String!
      $email: String!
      $password: String!
  ) {
    createAccount(
      nickname: $nickname
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function Sign(){
  const navigate = useNavigate();
  const onCompleted = (data:any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    console.log(data)
    if (!ok) {
      return setError("username", {message:error})
    }
    navigate('/login')
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState:{errors}, getValues,setError } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data:any) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
    return (
        <Container>
          <HelmetProvider>
            <Helmet>
              <title>SignUp | JiCoin</title>
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
          <Link to={{ pathname: "/login" }}>
            <Btn>
                로그인
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
          <Banner>JiCoin (회원가입)</Banner>
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
            {...register("nickname", {
              required: "닉네임은 필수입니다",
              maxLength: 20,
            })}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <span>{errors.nickname?.message}</span>
          <input
            {...register("email", {
              required: "이메일은 필수입니다",
              maxLength: 20,
            })}
            type="text"
            placeholder="이메일을 입력해주세요"
          />
          <span>{errors.email?.message}</span>
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다",
              maxLength: 20,
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          <span>{errors.password?.message}</span>
          <SubmitBtn type="submit" style={{ fontWeight: "bolder" }} />
        </Form>
      </ModalForm>
              </LoginForm>
          </AnimatePresence>
        </Box>
      </Header>
    </Container>
    )
}
