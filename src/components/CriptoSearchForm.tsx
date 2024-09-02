import { useState } from "react";
import { currencies } from "../data";
import { useCriptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function CriptoSearchForm() {
  const cryptocurrencies = useCriptoStore((state) => state.cryptocurrencies);
  const fetchData = useCriptoStore((state)=>state.fectchData)

  const [pair, setPair] = useState<Pair>({
    currency: "",
    cryptocurrency: "",
  });

  const [error,setError] = useState("")

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setPair({
        ...pair,
        [e.target.name]:e.target.value
    })
  }

  const hanldeSumbit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(pair).includes("")){
        setError("Todos los campos son obligatorios")
        return
    }
    setError("")

    //Consultar api
    async function fetchDataF() {
        await fetchData(pair)
    }
    fetchDataF()
  }

  return (
    <form className="form"
        onSubmit={hanldeSumbit}
    >
        {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select name="currency" id="currency"
            onChange={handleChange}
        >
          <option value={pair.currency}>-- Seleccione --</option>
          {currencies.map((c) => (
            <option value={c.code} key={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cryptocurrency">Moneda:</label>
        <select name="cryptocurrency" id="cryptocurrency"
            onChange={handleChange}
        >
          <option value={pair.cryptocurrency}>-- Seleccione --</option>
          {cryptocurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value={"Cotizar"} />
    </form>
  );
}
