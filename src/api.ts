const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchTrend() {
  return fetch("https://api.coingecko.com/api/v3/search/trending").then(
    (response) => response.json()
  );
}

export function FetchCoinList() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) =>
    response.status === 200 ? response.json() : console.log("차트없음")
  );
}

export function fetchCoinMarket(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}/markets`).then((response) =>
    response.json()
  );
}
