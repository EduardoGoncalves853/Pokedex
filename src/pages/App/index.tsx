import { Header } from "../../components/Header";
import { Container } from "./styles";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <Container>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>footer</footer>
    </Container>
  );
}
