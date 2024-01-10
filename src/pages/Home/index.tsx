import { Link } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard";
import { useQueryPokemonPage } from "../../hooks/useQueryPokemonPage";
import { Container } from "./style";

export function Home() {
  const { data, isLoading, error } = useQueryPokemonPage();
  console.log(data);
  if (error) console.log(error);

  return (
    <>
      <Container>
        <h1>{"Bem vindo(a) à Pokedex do Reprograma Jucás"}</h1>

        {isLoading && <span className="feedbackLoading">Loading...</span>}
        {!isLoading && error && (
          <span className="feedbackLoading">Error...</span>
        )}

        <div className="gridCards">
          {data?.map((pokemon) => {
            return (
              <Link to={`/details/${pokemon.name}`} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
