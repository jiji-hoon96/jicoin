import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Container } from "../components/Container";
import { Title } from "../components/Title";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const CalculateForm = styled.form`
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
`;

const CalDivideForm = styled.div`
  background-color: whitesmoke;
  margin-bottom: 30px;
  border-radius: 10px;
  height: 100px;
  input {
    width: 250px;
    margin: 0px 20px;
    padding: 15px 10px;
    border: 1px solid grey;
    border-radius: 10px;
    font-size: 15px;
  }
`;

const CalTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 5px;
  padding: 5px 7px;
  font-weight: bolder;
`;

const CalSmallTitle = styled.h2`
  font-size: 15px;
  padding: 5px 7px;
  margin: 5px 10px;
`;

const CalBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CalBtn = styled.button`
  text-align: center;
  width: 100px;
  height: 50px;
  border: none;
  cursor: pointer;
  margin-right: 6px;
  font-size: 16px;
  border-radius: 10px;
  color: black;
  :hover {
    background-color: #bec9e7;
    color: black;
    transform: scale(1.04);
  }
`;

const ResultDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  width: 650px;
  height: 300px;
  background-color: whitesmoke;
`;

const ResultPrice = styled.div`
  width: 200px;
  height: 40px;
  font-size: 24px;
  font-weight: bolder;
  div {
    margin-top: 10px;
    width: 200px;
    height: 5px;
    background-color: orange;
  }
`;

const GridDiv = styled.div`
  display: grid;
  width: 600px;
  height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const NowDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
`;
const PriceHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface CalculateBuy {
  oldprice: number;
  oldcount: number;
  newprice: number;
  newcount: number;
}

function Price() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldcount, setOldCount] = useState("");
  const [oldprice, setOldPrice] = useState("");
  const [newcount, setNewCount] = useState("");
  const [newprice, setNewPrice] = useState("");
  const [toatlcount, setTotalCount] = useState("");
  const [toatlresult, setTotalResult] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalculateBuy>();
  const onSubmitValid = (data: CalculateBuy) => {
    const oldObject = data.oldcount * data.oldprice;
    const newObject = data.newcount * data.newprice;
    const totalCount = String(Number(data.oldcount) + Number(data.newcount));
    const totalResult = String((oldObject + newObject) / Number(totalCount));
    setOldCount(String(data.oldcount));
    setOldPrice(String(data.oldprice));
    setNewCount(String(data.newcount));
    setNewPrice(String(data.newprice));
    setTotalCount(totalCount);
    setTotalResult(totalResult);
    setIsOpen((prev) => !prev);
  };
  const clickReset = () => {
    reset();
    setIsOpen((prev) => !prev);
  };
  return (
    <Container>
      <PriceHeader>
        <HelmetProvider>
          <Helmet>
            <title>Get Average | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <Link to="/coinlist">
          <Title>평균매입가 구하기 ($)</Title>
        </Link>

        <CalculateForm onSubmit={handleSubmit(onSubmitValid)}>
          <CalDivideForm>
            <CalTitle>현재 보유</CalTitle>
            <input
              {...register("oldprice", {
                required: "현재 매입가를 입력해주세요",
              })}
              type="number"
              placeholder="현재 매입가를 입력해주세요"
            />
            <input
              {...register("oldcount", {
                required: "현재 보유 수량을 입력해주세요",
              })}
              type="number"
              placeholder="현재 보유 수량을 입력해주세요"
            />
          </CalDivideForm>
          <CalDivideForm>
            <CalTitle>추가 매수</CalTitle>
            <input
              {...register("newprice", {
                required: "추가 매수가를 입력해주세요",
              })}
              type="number"
              placeholder="추가 매수가를 입력해주세요"
            />
            <input
              {...register("newcount", {
                required: "추가 매수 수량을 입력해주세요",
              })}
              type="number"
              placeholder="추가 매수 수량을 입력해주세요"
            />
          </CalDivideForm>
          <CalBtnDiv>
            {isOpen ? (
              <CalBtn onClick={clickReset}>초기화</CalBtn>
            ) : (
              <CalBtn type="submit">계산하기</CalBtn>
            )}
          </CalBtnDiv>
        </CalculateForm>
        {isOpen ? (
          <ResultDiv>
            <ResultPrice>
              {`평단가 : $ ${Math.ceil(+toatlresult)} `}
              <div />
            </ResultPrice>
            <div
              style={{
                width: 600,
                height: 5,
                backgroundColor: "#DCDDE1",
                margin: 20,
              }}
            />
            <GridDiv>
              <NowDiv>
                <CalTitle>현재 보유</CalTitle>
                <CalSmallTitle>{`보유 단가 : $ ${oldprice} `}</CalSmallTitle>
                <CalSmallTitle>{`보유 수량 : ${oldcount} 개`}</CalSmallTitle>
                <CalSmallTitle>{`총 금액 : $ ${
                  +oldcount * +oldprice
                }`}</CalSmallTitle>
              </NowDiv>
              <NowDiv>
                <CalTitle>추가 매수</CalTitle>
                <CalSmallTitle>{`보유 단가 : $ ${newprice}`}</CalSmallTitle>
                <CalSmallTitle>{`보유 수량 : ${newcount} 개`}</CalSmallTitle>
                <CalSmallTitle>{`총 금액 : $ ${
                  +newcount * +newprice
                } `}</CalSmallTitle>
              </NowDiv>
              <NowDiv>
                <CalTitle>총 결과 값</CalTitle>
                <CalSmallTitle>{`보유 단가 : $ ${Math.ceil(
                  +toatlresult
                )} `}</CalSmallTitle>
                <CalSmallTitle>{`보유 수량 : ${
                  Number(oldcount) + Number(newcount)
                } 개`}</CalSmallTitle>
                <CalSmallTitle>{`총 금액 : $ ${
                  +oldcount * +oldprice + +newcount * +newprice
                } `}</CalSmallTitle>
              </NowDiv>
            </GridDiv>
          </ResultDiv>
        ) : null}
      </PriceHeader>
    </Container>
  );
}
export default Price;
