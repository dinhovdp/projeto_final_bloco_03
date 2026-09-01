import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { buscarCategoriaPorId, deletarCategoria } from "../../../services/service";
import type { Categoria } from "../../../models";

function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({ nome: "" });
  const [carregando, setCarregando] = useState(true);
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // busca a categoria para mostrar o nome na tela de confirmacao
  async function buscarPorId(idCategoria: string) {
    try {
      const resposta = await buscarCategoriaPorId(Number(idCategoria));
      setCategoria(resposta.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  async function confirmarExclusao() {
    setExcluindo(true);
    try {
      await deletarCategoria(Number(id));
      navigate("/categorias");
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
        <h2 className="text-2xl font-black text-[#1d2e83]">Deletar Categoria</h2>
        <p className="text-lg text-[#1a1a1a]">
          Tem certeza que deseja apagar a categoria <span className="font-bold">{categoria.nome}</span>?
        </p>

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/categorias")}
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

export default DeletarCategoria;
