import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Cryptocurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies:Cryptocurrency[]
    result:CryptoPrice
    loading:boolean
    fetchCryptos: () => Promise<void>
    fectchData: (pair:Pair) => Promise<void>
}

export const useCriptoStore = create<CryptoStore>()(devtools(((set)=>({
    cryptocurrencies:[],
    result:{
        IMAGEURL:"",
        PRICE:"",
        HIGHDAY:"",
        LOWDAY:"",
        CHANGEPCT24HOUR:"",
        LASTUPDATE:""
    },
    loading:false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(()=>({
            cryptocurrencies
        }))
    },
    fectchData: async (pair) => {
        set(()=>({
            loading:true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        set(()=>({
            result:result,
            loading:false
        }))
    }
}))))