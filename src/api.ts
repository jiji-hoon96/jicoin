const BASE_URL = `https://api.coinpaprika.com/v1`;

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

export function fetchCoinMarket(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}/markets`).then((response) =>
    response.json()
  );
}
