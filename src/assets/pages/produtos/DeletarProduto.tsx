import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { buscarProdutoPorId, deletarProduto } from "../../../services/service";
import type { Produto } from "../../../models";

function DeletarProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto>({ nome: "", preco: 0 });
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // busca o produto para mostrar o nome na tela de confirmacao
  async function buscarPorId(idProduto: string) {
    try {
      const resposta = await buscarProdutoPorId(Number(idProduto));
      setProduto(resposta.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarExclusao() {
    setExcluindo(true);
    try {
      await deletarProduto(Number(id));
      navigate("/produtos");
    } catch (erro) {
      console.log(erro);
      setExcluindo(false);
    }
  }

  if (carregando) {
    return (
      <div className="flex w-full justify-center bg-[#bfe5ec] py-20">
        <PuffLoader color="#1d2e83" size={60} />
      </div>
    );
  }

  return (
    <section className="w-full bg-[#bfe5ec] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-black text-[#1d2e83]">Deletar Produto</h2>
        <p className="text-lg text-[#1a1a1a]">
          Tem certeza que deseja apagar o produto <span className="font-bold">{produto.nome}</span>?
        </p>

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/produtos")}
            className="rounded-xl border border-[#1d2e83] px-6 py-3 text-base font-semibold text-[#1d2e83] transition hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmarExclusao}
            disabled={excluindo}
            className="rounded-xl bg-red-500 px-6 py-3 text-base font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {excluindo ? "Excluindo..." : "Sim, apagar"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeletarProduto;
