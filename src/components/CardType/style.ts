import styled from "styled-components";
import { typeProps } from ".";

export const Container = styled.span<typeProps>`
background: ${({ theme, type }) => theme.colors.types[type]};
`