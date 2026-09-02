import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import CardProduto from "../../components/cardProduto/CardProduto";
import { buscarProdutos } from "../../../services/service";
import type { Produto } from "../../../models";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarLista();
  }, []);

  // busca todos os produtos cadastrados na api
  async function buscarLista() {
    try {
      const resposta = await buscarProdutos();
      setProdutos(resposta.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="w-full bg-[#bfe5ec] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-[#1d2e83]">Produtos</h2>
          <Link
            to="/cadastrar-produto"
            className="rounded-xl bg-[#1d2e83] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Novo Produto
          </Link>
        </div>

        {carregando && (
          <div className="flex justify-center py-14">
            <PuffLoader color="#1d2e83" size={60} />
          </div>
        )}

        {!carregando && produtos.length === 0 && (
          <p className="py-10 text-center text-lg text-[#1a1a1a]">Nenhum produto cadastrado</p>
        )}

        {!carregando && produtos.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListaProdutos;
