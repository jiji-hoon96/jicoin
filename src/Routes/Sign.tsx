import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { AnimatePresence, motion } from "framer-motion";
import {Box , LoginForm, ModalForm,SmallNav, Banner, BannerImg,Form} from '../components/HomeForm'
import { Btn } from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { boxVariants } from "../components/variants/box";

interface LoginForm {
    id: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
}

export default function Sign(){
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
          <title>JiCoin | SignUp</title>
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
                Login
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
              </LoginForm>
          </AnimatePresence>
        </Box>
      </Header>
    </Container>
    )
}
