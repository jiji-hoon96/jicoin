import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Title } from "../components/Title";
import useUser from "../hooks/useUser";
import { useForm } from "react-hook-form";
import { Form, SubmitBtn } from "../components/HomeForm";
import { useState } from "react";

const WelcomeDiv = styled.div`
  margin-top: 10px;
  font-size: 20px;
`
const MyAvatarDiv = styled.div`
  margin:  20px 0px 10px 0px;
`

const MyAvatarImg = styled.img`
  width:100px;
  height:100px;
  border-radius: 10px;
`

const CalculateForm = styled.form`
  display: flex;
  flex-direction: column;
`

interface CalculateBuy{
  oldprice:number,
  oldcount:number,
  newprice:number,
  newcount:number,
}
interface TotalCaculator{
  totalCount:string;
  totalResult:number;
}

function Mypage() {
  const {data} = useUser();
  const [toatlcount, setTotalCount] = useState('')
  const [toatlresult, setTotalResult] = useState('')
  const {register, handleSubmit,formState:{errors},watch} = useForm<CalculateBuy>();
  const onSubmitValid = (data:CalculateBuy) => {
    const oldObject = data.oldcount * data.oldprice
    const newObject = data.newcount * data.newprice
    const totalCount = String(Number(data.oldcount) + Number(data.newcount))
    const totalResult = String((oldObject+ newObject) / Number(totalCount))
    setTotalCount(totalCount);
    setTotalResult(totalResult)
  };
  return (
    <Container>
     <Header>
        <HelmetProvider>
          <Helmet>
            <title>My Page | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <Title>
          <Link to={{ pathname: "/coinlist" }}> My Page</Link>
        </Title>
        <MyAvatarDiv>{data?.me?.avatar === "" || null || undefined  ? <FontAwesomeIcon icon={faUserAlt} size="5x" /> : <MyAvatarImg src={data?.me?.avatar} />}</MyAvatarDiv>
        <WelcomeDiv>{`${data?.me?.nickname}님의 개인 화면입니다`}</WelcomeDiv>
        <CalculateForm onSubmit={handleSubmit(onSubmitValid)}>
          <input {...register("oldprice", {required:"이전 매입가를 입력해주세요"})} type="number" placeholder="이전 매입가를 입력해주세요"/>
          <input {...register("oldcount", {required:"이전 보유 수량을 입력해주세요"})} type="number" placeholder="이전 보유 수량을 입력해주세요"/>
          <input {...register("newprice", {required:"신규 매입가를 입력해주세요"})} type="number" placeholder="신규 매입가를 입력해주세요"/>
          <input {...register("newcount", {required:"신규 보유 수량을 입력해주세요"})} type="number" placeholder="신규 보유 수량을 입력해주세요"/>
          <SubmitBtn type="submit" value="평균 매입가 계산하기" style={{ fontWeight: "bolder" }}/>
        </CalculateForm>
        <h1>{`총 보유 수량 : ${toatlcount}`}</h1>
        <h1>{`평단가 ${toatlresult}`}</h1>
      </Header>
    </Container>
  );
}

export default Mypage;
