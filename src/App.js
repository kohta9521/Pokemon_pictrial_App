import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPOkemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);
      console.log(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPOkemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className="App">
      <h3>ポケモン図鑑</h3>
      {loading ? (
        <h1>ロード中、、、</h1>
      ) : (
        <h1>ポケモンデータを取得しました!</h1>
      )}
    </div>
  );
}

export default App;
