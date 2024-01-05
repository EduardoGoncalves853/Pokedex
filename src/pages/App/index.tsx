import { Container } from "./styles";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <Container>
      <header>Header</header>

      <main>
        <Outlet />
      </main>

      <footer>footer</footer>
    </Container>
  );
}
