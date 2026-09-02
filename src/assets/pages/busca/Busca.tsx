import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import CardProduto from "../../components/cardProduto/CardProduto";
import { buscarCategorias, buscarProdutos } from "../../../services/service";
import type { Categoria, Produto } from "../../../models";
import { idBateComTermo, normalizarTexto } from "../../../utils/Texto";

function Busca() {
  const [parametros] = useSearchParams();
  const termo = parametros.get("q") ?? "";

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const [respostaProdutos, respostaCategorias] = await Promise.all([
        buscarProdutos(),
        buscarCategorias(),
      ]);
      setProdutos(respostaProdutos.data);
      setCategorias(respostaCategorias.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  const termoNormalizado = normalizarTexto(termo);

  const produtosEncontrados = produtos.filter(
    (produto) =>
      normalizarTexto(produto.nome).includes(termoNormalizado) ||
      idBateComTermo(produto.id, termo),
  );

  const categoriasEncontradas = categorias.filter(
    (categoria) =>
      normalizarTexto(categoria.nome).includes(termoNormalizado) ||
      idBateComTermo(categoria.id, termo),
  );

  const semResultado =
    !carregando && produtosEncontrados.length === 0 && categoriasEncontradas.length === 0;

  return (
    <section className="w-full bg-[#bfe5ec] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <h2 className="text-2xl font-black text-[#1d2e83] sm:text-3xl">
          Resultado para: <span className="italic">"{termo}"</span>
        </h2>

        {carregando && (
          <div className="flex justify-center py-14">
            <PuffLoader color="#1d2e83" size={60} />
          </div>
        )}

        {semResultado && (
          <p className="py-10 text-center text-lg text-[#1a1a1a]">
            Nenhum produto ou categoria encontrado para essa busca
          </p>
        )}

        {!carregando && categoriasEncontradas.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-[#1d2e83]">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categoriasEncontradas.map((categoria) => (
                <span
                  key={categoria.id}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1d2e83] shadow-sm"
                >
                  {categoria.nome}
                </span>
              ))}
            </div>
          </div>
        )}

        {!carregando && produtosEncontrados.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-[#1d2e83]">Produtos</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {produtosEncontrados.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Busca;