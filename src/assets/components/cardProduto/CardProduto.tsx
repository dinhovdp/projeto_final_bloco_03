import { Link } from "react-router-dom";
import { ShoppingCart } from "@phosphor-icons/react";
import type { Produto } from "../../../models";
import { useCarrinho } from "../../../contexts/CarrinhoContext";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  const { adicionarAoCarrinho } = useCarrinho();

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex h-40 w-full items-center justify-center bg-[#eef7fa]">
        {produto.foto ? (
          <img
            src={produto.foto}
            alt={produto.nome}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-slate-400">Sem imagem</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {produto.categoria?.nome && (
          <span className="w-fit rounded-full bg-[#bfe5ec] px-2 py-1 text-xs font-semibold text-[#1d2e83]">
            {produto.categoria.nome}
          </span>
        )}

        <p className="text-lg font-semibold text-[#1d2e83]">{produto.nome}</p>
        <p className="text-xl font-black text-[#1a1a1a]">
          {produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={() => adicionarAoCarrinho(produto)}
            className="flex items-center justify-center gap-2 rounded-md bg-[#1d2e83] px-3 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            <ShoppingCart size={18} weight="bold" />
            Adicionar ao carrinho
          </button>

          <div className="flex gap-2">
            <Link
              to={`/editar-produto/${produto.id}`}
              className="flex-1 rounded-md bg-[#1d2e83] px-3 py-2 text-center text-sm font-medium text-white transition hover:brightness-110"
            >
              Editar
            </Link>
            <Link
              to={`/deletar-produto/${produto.id}`}
              className="flex-1 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-medium text-white transition hover:brightness-110"
            >
              Deletar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;
