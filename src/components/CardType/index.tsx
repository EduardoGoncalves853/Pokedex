import { PokemonType } from "../../@types/pokemon";
import { Container } from "./style";
export type typeProps = {
  type: PokemonType;
  size?: number;
};
export function CardType({ type, size = 10 }: typeProps) {
  return (
    <>
      <Container type={type} size={size}>
        {type}
      </Container>
    </>
  );
}
