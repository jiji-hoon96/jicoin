import { Helmet } from "react-helmet-async"
import { HelmetProvider } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Container } from "../components/Container"
import { Header } from "../components/Header"
import { Box, Form, SubmitBtn } from "../components/HomeForm"

export const EditBanner = styled.h3`
  color: ${(props)=>props.theme.loginColor};
  font-size: 32px;
  font-weight: bolder;
  margin-bottom: 20px;
  letter-spacing: 5px;
  :hover{
    transform: scale(1.05);
  }
`;

function Edit(){
    const { register, handleSubmit, formState:{errors}, getValues,setError } = useForm({
        mode: "onChange",
      });
    const onSubmitValid = (data:any) => {
        console.log(data)
      };
    return (
        <Container>
          <HelmetProvider>
            <Helmet>
              <title>Edit Profile | JiCoin</title>
            </Helmet>
          </HelmetProvider>
        <Header>
        <Box>
        <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Link to={{pathname:"/mypage"}}>
                <EditBanner>JiCoin (프로필 수정)</EditBanner>
            </Link>
          <input style={{width:"350px"}}
            {...register("nickname", {
              required: "변경하실 닉네임을 입력해주세요",
              minLength: {
                value: 3,
                message: "닉네임을 3글자 이상 입력해주세요"
              },
              maxLength: {
                value:10,
                message: "닉네임은 10글자를 넘길 수 없습니다"
              },
            })}
            type="text"
            placeholder="변경하실 닉네임을 입력해주세요"
          />
          <span>{errors.nickname?.message}</span>
          <SubmitBtn type="submit" value="회원가입" style={{ fontWeight: "bolder" }} />
        </Form>
        </Box>
      </Header>
    </Container>
    )
}

export default Edit