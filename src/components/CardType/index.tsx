import { PokemonType } from "../../@types/pokemon";
import { Container } from "./style";
export type typeProps = {
type: PokemonType;
}
export function CardType({ type }: typeProps) {
  return (
    <>
      <Container type={type}>
        {type}
      </Container>
    </>
  );
}
