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
import { useEffect, useState } from "react";

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
margin-top: 20px;
  display: flex;
  flex-direction: column;
  width:550px;
`

const CalDivideForm = styled.div`
  background-color: whitesmoke;
  margin-bottom: 10px;
  border-radius:10px;
  height:90px;
  input{
    width:250px;
    margin-left: 15px;
    padding:15px 10px;
    border: 1px solid grey;
    border-radius: 10px;
    font-size:15px;
  }

`

const CalTitle = styled.h1`
  font-size: 18px;
  padding:5px 7px;
`

const CalBtnDiv= styled.div`
  display: flex;
  justify-content: center;
`

const CalBtn = styled.button`
text-align: center;
width:200px;
height:50px;
border: none;
cursor: pointer;
font-size: 16px;
border-radius: 10px;
 color:black;
  :hover{
    background-color: #7fe094;
    color: black;
    transform: scale(1.04);
  }
`


interface CalculateBuy{
  oldprice:number,
  oldcount:number,
  newprice:number,
  newcount:number,
}

function Mypage() {
  const {data} = useUser();
  const [toatlcount, setTotalCount] = useState('')
  const [toatlresult, setTotalResult] = useState('')
  const {register, handleSubmit,formState:{errors},reset} = useForm<CalculateBuy>();
  const onSubmitValid = (data:CalculateBuy) => {
    const oldObject = data.oldcount * data.oldprice
    const newObject = data.newcount * data.newprice
    const totalCount = String(Number(data.oldcount) + Number(data.newcount))
    const totalResult = String((oldObject+ newObject) / Number(totalCount))
    setTotalCount(totalCount);
    setTotalResult(totalResult)
    reset()
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
          <CalDivideForm>
            <CalTitle>현재 보유</CalTitle>
            <input {...register("oldprice", {required:"현재 매입가를 입력해주세요"})} type="number" placeholder="현재 매입가를 입력해주세요"/>
            <input {...register("oldcount", {required:"현재 보유 수량을 입력해주세요"})} type="number" placeholder="현재 보유 수량을 입력해주세요"/>
          </CalDivideForm>
          <CalDivideForm>
          <CalTitle>추가 매수</CalTitle>
            <input {...register("newprice", {required:"추가 매수가를 입력해주세요"})} type="number" placeholder="추가 매수가를 입력해주세요"/>
            <input {...register("newcount", {required:"추가 매수 수량을 입력해주세요"})} type="number" placeholder="추가 매수 수량을 입력해주세요"/>
          </CalDivideForm>
          <CalBtnDiv>
            <CalBtn type="submit">평균 매입가 계산하기</CalBtn>
          </CalBtnDiv>
        </CalculateForm>
        <h1>{`총 보유 수량 : ${toatlcount} 개`}</h1>
        <h1>{`평단가 : ${(+toatlresult).toFixed(2)} 원`}</h1>
      </Header>
    </Container>
  );
}

export default Mypage;
