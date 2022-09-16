import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { Container } from "./Container";
import { Loader } from "./Loader";
import { BtnBorder } from "./Button";
import { getTodays } from "./useSkill/getDay";

const ChartBox = styled.div`
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 500px;
  @media screen and (max-width: 1540px) {
    width: 400px;
  }
  @media screen and (max-width: 1100px) {
    width: 500px;
    margin-top: 100px;
  }
  @media screen and (max-width: 600px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    width: 300px;
  }
`;

function Chart() {
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[2];
  const { isLoading, data } = useQuery<any>(["month", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const chartStart = Number(data?.map((x: any) => x.time_open)[0]) * 1000;
  const chartEnd =
    Number(data?.map((x: any) => x.time_open)[data?.length - 1]) * 1000;
  const loading = isLoading;
  return (
    <Container>
      {loading ? (
        <Loader>"차트를 로딩중입니다"</Loader>
      ) : (
        <>
          {data === undefined || data.error === "Price data not found." ? (
            <Loader>"차트 데이터가 존재하지 않습니다"</Loader>
          ) : (
            <ChartBox>
              <div>
                <ApexChart
                  type="line"
                  series={[
                    {
                      name: "Price",
                      data: data?.map((price: any) => price.close) ?? [],
                    },
                  ]}
                  options={{
                    theme: {
                      mode: "dark",
                    },
                    title: {
                      text: `${getTodays(chartStart)} ~ ${getTodays(chartEnd)}`,
                      align: "center",
                      style: { fontSize: "16px" },
                    },
                    chart: {
                      animations: {
                        easing: "linear",
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
                        opacity: 0.5,
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
                      axisBorder: { show: true, offsetY: 10 },
                      axisTicks: { show: true },
                      labels: {
                        show: true,
                        rotate: 0,
                        style: { fontSize: "14px" },
                      },
                      type: "category",
                      categories: data?.map((price: any) =>
                        getTodays(Number(price.time_open) * 1000)
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
          )}
        </>
      )}
    </Container>
  );
}

export default Chart;
