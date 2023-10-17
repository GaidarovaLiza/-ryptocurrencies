export type CurrencyType = {
  id: string,
  rank: string,
  symbol: string,
  name: string,
  supply: string,
  maxSupply: string,
  marketCapUsd: string,
  volumeUsd24Hr: string,
  priceUsd: string,
  changePercent24Hr: string,
  vwap24Hr: string,
  explorer: string
}

export type CurrenciesType = {
  data: CurrencyType[],
  timestamp: number
}

export type CustomCurrencyType = Pick<CurrencyType, "id" | "symbol" | "priceUsd">;