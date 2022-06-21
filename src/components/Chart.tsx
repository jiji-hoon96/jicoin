import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Container } from "./Container";
import { Loader } from "./Loader";
import { BtnBorder } from "./Button";
import { getTodays } from "./useSkill/getDay";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const ChartBox = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width:600px;
  height:600px;
`;

function Chart() {
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[2];
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["month", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 30000,
    }
  );
  
  const chartStart =Number(data?.map((x) => x.time_open)[0] )*1000;
  const chartEnd =  Number(data?.map((x) => x.time_open)[data?.length-1] )*1000;
  const loading = isLoading;
  return (
    <Container>
        {loading ? (
          <Loader>"차트를 로딩중입니다"</Loader>
        ) : (
          <>     
          <ChartBox>
            <div>
              <ApexChart
                type="line"
                series={[
                  {
                    name: "Price",
                    data:
                      data?.map((price) => price.close) ?? [],
                  },
                ]}
                options={{
                  theme: {
                    mode: "dark",
                  },
                  title: {
                    text: `${getTodays(chartStart)} ~ ${getTodays(chartEnd)}`,
                    align: "center",
                    style: {fontSize:"24px"}
                  },
                  chart: {
                    animations: {
                      easing: 'linear',
                    },
                    height: 600,
                    width: 600,
                    toolbar: {
                      show: true,
                    },
                    zoom: {
                      enabled: false,
                    },
                    background: "#7f8fa6",
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
                    axisBorder: { show: true , offsetY:10},
                    axisTicks: { show: true},
                    labels: { show: true , rotate: 0, style:{fontSize:"14px",}},
                    type: "category",
                    categories: data?.map((price) =>
                      getTodays(Number(price.time_open)*1000)
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
              </div>
          </ChartBox>
          <BtnBorder>
        </BtnBorder>
        </>
        )}
    </Container>
  );
}

export default Chart;
