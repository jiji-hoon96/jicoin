import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinYear } from "../api";
import ApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { Title } from "../components/Title";
import { Header } from "../components/Header";
import { Btn, BtnBorder } from "../components/Button";

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

const ChartBox = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;

function Chart() {
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[2];

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
          <title>{coinId.split("-")[0].toUpperCase()} Chart | JiCoin</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        {loading ? "" :(
          <>
          <Title>
            <Link to={{ pathname: `/coinlist/${coinId}` }}>
              {index === 0
                ? `${coinId.split("-")[0].toUpperCase()} Coin 1달 차트`
                : `${coinId.split("-")[0].toUpperCase()} Coin 1년 차트`}
            </Link>
          </Title>
          </>
        )}
      </Header>
        {loading ? (
          <Loader>"차트를 로딩중입니다"</Loader>
        ) : (
          <>     
          <ChartBox>
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
                      .split("-")[0]
                      .toUpperCase()} Coin  (${chartStart} ~ ${chartEnd})`,
                    align: "center",
                  },
                  chart: {
                    animations: {
                      easing: 'linear',
                    },
                    height: 600,
                    width: 600,
                    toolbar: {
                      show: false,
                    },
                    zoom: {
                      enabled: false,
                    },
                    background: "#40739e",
                    dropShadow: {
                      enabled: true,
                      top: 0,
                      left: 0,
                      blur: 3,
                      opacity: 0.5
                    },
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
                      .split("-")[0]
                      .toUpperCase()} Coin (${chartStartYear} ~ ${chartEnd})`,
                    align: "center",
                  },
                  chart: {
                    animations: {
                      easing: 'linear',
                    },
                    height: 600,
                    width: 600,
                    toolbar: {
                      show: false,
                    },
                    background: "#273c75",
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
          </ChartBox>
          <BtnBorder>
          <Btn onClick={monthChart}>1달 차트</Btn>
          <Btn onClick={yearChart}>1년 차트</Btn>
        </BtnBorder>
        </>
        )}
    </Container>
  );
}

export default Chart;
