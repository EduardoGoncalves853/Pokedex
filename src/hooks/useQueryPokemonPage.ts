import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { Pokemon } from "../@types/pokemon";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useQueryPokemonPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const searchParams = useSearchParams();

  async function getPokemonPage({ page = 1, limit = 30 }) {
    const offset = (page - 1) * limit;
    const { data } = await API.get(`/pokemon?limit=${limit}&offset=${offset}`);

    const pokemonPromises = data.results.map(
      async (pokemon: { url: string }) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
      }
    );

    const pokemonData = await Promise.all(pokemonPromises);

    const totalPokemon = data.count;
    const totalPagesAPI = Math.ceil(totalPokemon / limit);

    if (totalPages != totalPagesAPI) {
      setTotalPages(totalPagesAPI);
    }

    return pokemonData as Pokemon[];
  }

  function nextPage() {
    setPage((prevValue) => prevValue + 1);
    navigate(`?page=${page + 1}`);
  }

  function prevPage() {
    setPage((prevValue) => prevValue - 1);
    navigate(`?page=${page - 1}`);
  }

  useEffect(() => {
    const pageQuery = Number(searchParams[0].get("page"));

    setPage(pageQuery || 1);

    // caso o pageQuery for maior que total pages (44) (ex: 45, 50, 100)
    if (totalPages > 0) {
      if (pageQuery > totalPages) {
        navigate(`?page=${totalPages}`);
        setPage(totalPages);
        return;
      }
      // caso o pageQuery for menor que 1 (ex: 0, -1, -2)
      if (pageQuery < 1) {
        navigate(`?page=1`);
        setPage(1);
        return;
      }
    }
  }, [searchParams, page, totalPages, navigate]);
  // query = (requisição)
  const query = useQuery({
    queryKey: ["getPokemonPage", page, limit],
    queryFn: () => getPokemonPage({ page, limit }),
  });

  return {
    ...query,
    page,
    totalPages,
    setLimit,
    nextPage,
    prevPage,
  };
}
