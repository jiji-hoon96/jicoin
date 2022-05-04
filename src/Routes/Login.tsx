import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("id", { required: "아이디는 필수입니다", maxLength: 20 })}
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
    </Form>
  );
}

export default Login;
