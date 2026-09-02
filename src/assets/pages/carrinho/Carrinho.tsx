import { Link } from "react-router-dom";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { useCarrinho } from "../../../contexts/CarrinhoContext";

function Carrinho() {
  const { itens, valorTotal, aumentarQuantidade, diminuirQuantidade, removerDoCarrinho } = useCarrinho();

  function formatarPreco(valor: number) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <section className="w-full bg-[#bfe5ec] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6">
        <h2 className="text-3xl font-black text-[#1d2e83]">Carrinho</h2>

        {itens.length === 0 && (
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white py-16 text-center shadow-sm">
            <p className="text-lg text-[#1a1a1a]">Seu carrinho está vazio</p>
            <Link
              to="/produtos"
              className="rounded-xl bg-[#1d2e83] px-6 py-3 text-base font-semibold text-white transition hover:brightness-110"
            >
              Ver produtos
            </Link>
          </div>
        )}

        {itens.length > 0 && (
          <>
            <div className="flex flex-col gap-3">
              {itens.map((item) => (
                <div
                  key={item.produto.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#eef7fa]">
                      {item.produto.foto ? (
                        <img src={item.produto.foto} alt={item.produto.nome} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs text-slate-400">Sem foto</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[#1d2e83]">{item.produto.nome}</p>
                      <p className="text-sm text-[#1a1a1a]">{formatarPreco(item.produto.preco)} / unid.</p>
                    </div>
                  </div>

                  {/* stepper de quantidade + lixeira, tudo na mesma altura */}
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-slate-300 px-2 py-1.5">
                      <button
                        type="button"
                        onClick={() => diminuirQuantidade(item.produto.id!)}
                        aria-label="Diminuir quantidade"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d2e83] text-white transition hover:brightness-110"
                      >
                        <Minus size={14} weight="bold" />
                      </button>

                      <span className="w-5 text-center text-base font-semibold text-[#1a1a1a]">
                        {item.quantidade}
                      </span>

                      <button
                        type="button"
                        onClick={() => aumentarQuantidade(item.produto.id!)}
                        aria-label="Aumentar quantidade"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white transition hover:brightness-110"
                      >
                        <Plus size={14} weight="bold" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removerDoCarrinho(item.produto.id!)}
                      aria-label="Remover do carrinho"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white transition hover:brightness-110"
                    >
                      <Trash size={18} weight="bold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
              <span className="text-lg font-semibold text-[#1a1a1a]">Total</span>
              <span className="text-2xl font-black text-[#1d2e83]">{formatarPreco(valorTotal)}</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Carrinho;
