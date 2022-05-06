import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinYear } from "../api";
import ApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: any;
  volume: number;
  market_cap: number;
}
interface IYear {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: any;
  volume: number;
  market_cap: number;
}

const Container = styled.div`
  width: 700px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;
const Loader = styled.span`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  width: 700px;
  height: 200px;
  font-size: 30px;
  border-radius: 10px;
  font-weight: bolder;
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  :hover {
    a {
      color: ${(props) => props.theme.hoverColor};
      font-weight: bolder;
      border-radius: 10px;
    }
    transform: scale(1.03);
  }
`;

const ChartBtnDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChartBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  &:hover {
    transform: scale(1.04);
    background-color: #c49191;
  }
`;

const ChartBox = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 500px;
`;

function Chart() {
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[1];
  const [index, setIndex] = useState(0);
  const yearChart = () => {
    setIndex(index > 1 ? 2 : index + 1);
  };
  const monthChart = () => {
    setIndex(index < 1 ? 0 : index - 1);
  };
  const { isLoading: MonthLoading, data: MonthData } = useQuery<IHistorical[]>(
    ["month", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 30000,
    }
  );
  const { isLoading: YearLoading, data: YearData } = useQuery<IYear[]>(
    ["year", coinId],
    () => fetchCoinYear(coinId),
    {
      refetchInterval: 30000,
    }
  );

  const chartStart = MonthData?.map((x) => x.time_open.split(","))[0][0].slice(
    0,
    10
  );
  const chartStartYear = YearData?.map((x) =>
    x.time_open.split(",")
  )[0][0].slice(0, 10);
  const chartEnd = MonthData?.map((x) => x.time_close.split(","))
    .slice(-1)[0][0]
    .slice(0, 10);
  const loading = MonthLoading || YearLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{pathname.slice(1)}</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>
          <Link to={{ pathname: `/${coinId}` }}>{coinId}</Link>
        </Title>
      </Header>
      <ChartBox>
        {loading ? (
          <Loader>"차트를 로딩중입니다"</Loader>
        ) : (
          <div>
            {index === 0 ? (
              <ApexChart
                type="line"
                series={[
                  {
                    name: "Price",
                    data:
                      MonthData?.map((price) => price.close.toFixed(3)) ?? [],
                  },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  title: {
                    text: `${coinId
                      .split("-")[1]
                      .toUpperCase()} Coin  (${chartStart} ~ ${chartEnd})`,
                    align: "center",
                  },
                  chart: {
                    height: 500,
                    width: 800,
                    toolbar: {
                      show: false,
                    },
                    background: "transparent",
                  },
                  grid: { show: false },
                  stroke: {
                    curve: "smooth",
                    width: 3,
                  },
                  yaxis: {
                    show: true,
                  },
                  xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false },
                    type: "category",
                    categories: MonthData?.map((price) =>
                      price.time_open.slice(5, 10)
                    ),
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      gradientToColors: ["#0be881"],
                      stops: [0, 100],
                    },
                  },
                  colors: ["#0fbcf9"],
                  tooltip: {
                    y: {
                      formatter: (value: any) => `$${value.toFixed(2)}`,
                    },
                  },
                }}
              />
            ) : (
              <ApexChart
                type="line"
                series={[
                  {
                    name: "Price",
                    data:
                      YearData?.map((price) => price.close.toFixed(3)) ?? [],
                  },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  title: {
                    text: `${coinId
                      .split("-")[1]
                      .toUpperCase()} Coin (${chartStartYear} ~ ${chartEnd})`,
                    align: "center",
                  },
                  chart: {
                    height: 500,
                    width: 800,
                    toolbar: {
                      show: false,
                    },
                    background: "transparent",
                  },
                  grid: { show: false },
                  stroke: {
                    curve: "smooth",
                    width: 3,
                  },
                  yaxis: {
                    show: true,
                  },
                  xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false },
                    type: "category",
                    categories: YearData?.map((price) =>
                      price.time_open.slice(0, 10)
                    ),
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      gradientToColors: ["#0be881"],
                      stops: [0, 100],
                    },
                  },
                  colors: ["#0fbcf9"],
                  tooltip: {
                    y: {
                      formatter: (value: any) => `$${value.toFixed(2)}`,
                    },
                  },
                }}
              />
            )}
          </div>
        )}
      </ChartBox>
      <ChartBtnDiv>
        <ChartBtn onClick={monthChart}>1달 차트</ChartBtn>
        <ChartBtn onClick={yearChart}>1년 차트</ChartBtn>
      </ChartBtnDiv>
    </Container>
  );
}

export default Chart;
