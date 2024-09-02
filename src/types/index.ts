import {CurrencySchema, CryptoCuurrencyResponseSchema, PairSchema, CryptoPriceSchema} from "../schema/crypto.schema"
import {z} from "zod"

export type Currency = z.infer<typeof CurrencySchema>
export type Cryptocurrency = z.infer<typeof CryptoCuurrencyResponseSchema>
export type Pair = z.infer<typeof PairSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>