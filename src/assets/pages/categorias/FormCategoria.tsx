import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { atualizarCategoria, buscarCategoriaPorId, cadastrarCategoria } from "../../../services/service";
import type { Categoria } from "../../../models";

function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({ nome: "" });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // se tiver id na rota, carrega os dados da categoria para editar
  async function buscarPorId(idCategoria: string) {
    const resposta = await buscarCategoriaPorId(Number(idCategoria));
    setCategoria(resposta.data);
  }

  function atualizarEstado(evento: ChangeEvent<HTMLInputElement>) {
    setCategoria({ ...categoria, [evento.target.name]: evento.target.value });
  }

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);

    try {
      if (id !== undefined) {
        await atualizarCategoria(categoria);
      } else {
        await cadastrarCategoria(categoria);
      }
      navigate("/categorias");
    } catch (erro) {
      console.log(erro);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="w-full bg-[#bfe5ec] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto flex w-full max-w-[560px] flex-col gap-6">
        <h2 className="text-3xl font-black text-[#1d2e83]">
          {id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
        </h2>

        <form onSubmit={enviarFormulario} className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-sm font-semibold text-[#1a1a1a]">
              Nome da categoria
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={categoria.nome}
              onChange={atualizarEstado}
              placeholder="Digite o nome da categoria"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 text-base text-[#1a1a1a] focus:border-[#1d2e83] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 flex items-center justify-center rounded-xl bg-[#1d2e83] px-6 py-3 text-base font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {enviando ? <PuffLoader color="#ffffff" size={24} /> : "Salvar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default FormCategoria;
