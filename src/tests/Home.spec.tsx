import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { vi, describe, it, expect } from "vitest";
import * as useBooksHook from "../hooks/useBooks";

describe("Página: Home", () => {
  it("deve exibir a lista de livros quando a API retornar sucesso", () => {
    vi.spyOn(useBooksHook, "useBooks").mockReturnValue({
      books: [
        {
          id: 1,
          title: "Livro Teste 1",
          author: "Autor 1",
          description: "",
          coverImage: "",
          publicationDate: new Date("2000-05-25")
        },
        {
          id: 2,
          title: "Livro Teste 2",
          author: "Autor 2",
          description: "",
          coverImage: "",
          publicationDate: new Date("2000-08-05")
        },
      ],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Livro Teste 1")).toBeInTheDocument();
    expect(screen.getByText("Livro Teste 2")).toBeInTheDocument();

    expect(screen.queryByText("Carregando...")).not.toBeInTheDocument();
  });

  it("deve exibir mensagem de estado vazio quando não houver livros", () => {
    vi.spyOn(useBooksHook, "useBooks").mockReturnValue({
      books: [],
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Nenhum livro encontrado")).toBeInTheDocument();
  });

  it("deve exibir o LoadingSpinner enquanto busca dados", () => {
    vi.spyOn(useBooksHook, "useBooks").mockReturnValue({
      books: [],
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });
});
