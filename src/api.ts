const BASE_URL = `https://api.coinpaprika.com/v1`;

export function FetchCoinList() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
