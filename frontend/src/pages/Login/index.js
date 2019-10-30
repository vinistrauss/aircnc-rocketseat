import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/sessions", {
      email
    });

    const { _id } = response.data;

    //Salvando o id do usuario no local storage, para ter acesso em toda aplicação
    localStorage.setItem("user", _id);

    history.push("/dashboard");
  }
  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores encontre{" "}
        <strong>talentos</strong> para sua empresa
      </p>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email"> E-MAIL *</label>
        <input
          type="emaill"
          id="email"
          placeholder="Seu melhor e-mail"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />

        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </>
  );
}
