const BASE_URL = `https://api.coinpaprika.com/v1`;

export function FetchYoutubeApi() {
  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=bts&key=${process.env.GOOGLE_API_KEY}`,
    requestOptions
  ).then((response) => response.json());
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
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 4;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchCoinYear(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 12 * 60 * 60 * 24 * 7 * 4;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchCoinMarket(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}/markets`).then((response) =>
    response.json()
  );
}
