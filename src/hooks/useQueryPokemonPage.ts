import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";

export function useQueryPokemonPage() {
  async function getPokemonPage() {
    const { data } = await API.get("/pokemon");

    const pokemonPromisses = data.results.map(
      async (pokemon: { url: string }) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
      }
    );

    const pokemonData = await Promise.all(pokemonPromisses);

    console.log(pokemonData);
    return pokemonData;
  }

  const query = useQuery({
    queryKey: ["getPokemonPage"],
    queryFn: getPokemonPage,
  });

  return {
    ...query,
  };
}
