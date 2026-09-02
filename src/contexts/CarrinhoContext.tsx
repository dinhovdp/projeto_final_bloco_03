import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Produto } from "../models";

// cada item guarda o produto e a quantidade escolhida pelo usuario
export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  quantidadeTotal: number;
  valorTotal: number;
  adicionarAoCarrinho: (produto: Produto) => void;
  aumentarQuantidade: (idProduto: number) => void;
  diminuirQuantidade: (idProduto: number) => void;
  removerDoCarrinho: (idProduto: number) => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

const CHAVE_STORAGE = "farmacia:carrinho";

// nao ha autenticacao no projeto, entao o localStorage e suficiente pra manter
// o carrinho depois de um F5, sem precisar de cookies ou backend pra isso
function carregarCarrinhoSalvo(): ItemCarrinho[] {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    return salvo ? (JSON.parse(salvo) as ItemCarrinho[]) : [];
  } catch (erro) {
    console.log(erro);
    return [];
  }
}

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(carregarCarrinhoSalvo);

  // toda vez que o carrinho muda, atualiza o localStorage
  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
  }, [itens]);

  function adicionarAoCarrinho(produto: Produto) {
    setItens((itensAtuais) => {
      const jaExiste = itensAtuais.find((item) => item.produto.id === produto.id);

      if (jaExiste) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...itensAtuais, { produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(idProduto: number) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === idProduto
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuirQuantidade(idProduto: number) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.produto.id === idProduto
          ? { ...item, quantidade: Math.max(1, item.quantidade - 1) }
          : item,
      ),
    );
  }

  function removerDoCarrinho(idProduto: number) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.produto.id !== idProduto));
  }

  // soma a quantidade de TODOS os itens (nao a quantidade de produtos diferentes)
  const quantidadeTotal = itens.reduce((total, item) => total + item.quantidade, 0);
  const valorTotal = itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        quantidadeTotal,
        valorTotal,
        adicionarAoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

// hook de acesso ao carrinho, usado nos componentes
export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (contexto === undefined) {
    throw new Error("useCarrinho precisa ser usado dentro de um CarrinhoProvider");
  }
  return contexto;
}
