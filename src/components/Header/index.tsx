import { Link, useNavigate } from "react-router-dom";
import { Container } from "./style";
import pokemonLogo from "../../assets/pokemon-logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
// handleSubmit é a função para que o submit chegue no destino

type Input = {
  inputSearch: string;
};

export function Header() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    navigate(`/search?q=${data.inputSearch}`);
    reset();
  };
  return (
    <>
      {/* "link to " é onde o link vai levar o usuário */}
      <Container>
        <Link to={"/"}>
          <img src={pokemonLogo} alt=" logo com texto pokemon " />
        </Link>
        {/* 'onSubmit' é atributo de evento para quando o submit for usado/ligado */}

        {/* 'handleSubmit' é basicamente uma função que só vai ser ativada quando o formulário for enviado */}
        {/* traduzindo handleSubmit "manipulador de envio" */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            {/* "srOnly" é scanner only, ou seja apenas programadores, inpescionadores de console podem ver */}

            <label htmlFor="inputSearch" className="srOnly">
              Pesquisar Pokemon
            </label>

            <input
              type="text"
              id="inputSearch"
              placeholder="Pesquisar Pokemon"
              {...register("inputSearch", {
                required: "preencha o nome do Pokémon",
              })}
            />
            <span className="inputError">{errors.inputSearch?.message}</span>
          </section>

          {/* 'submit' é para enviar inf para a rede ou 'URL' */}
          <button type="submit"></button>
        </form>
      </Container>
    </>
  );
}
