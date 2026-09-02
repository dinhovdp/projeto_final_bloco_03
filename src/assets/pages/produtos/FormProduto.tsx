import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import {
  atualizarProduto,
  buscarCategorias,
  buscarProdutoPorId,
  cadastrarProduto,
} from "../../../services/service";
import type { Categoria, Produto } from "../../../models";

function FormProduto() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<Produto>({ nome: "", preco: 0, foto: "" });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    buscarListaCategorias();
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // lista de categorias para preencher o select do formulario
  async function buscarListaCategorias() {
    try {
      const resposta = await buscarCategorias();
      setCategorias(resposta.data);
    } catch (erro) {
      console.log(erro);
    }
  }

  // se tiver id na rota, carrega os dados do produto para editar
  async function buscarPorId(idProduto: string) {
    const resposta = await buscarProdutoPorId(Number(idProduto));
    setProduto(resposta.data);
  }

  function atualizarEstado(evento: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evento.target;
    setProduto({ ...produto, [name]: name === "preco" ? Number(value) : value });
  }

  function atualizarCategoria(evento: ChangeEvent<HTMLSelectElement>) {
    const categoriaEscolhida = categorias.find((categoria) => categoria.id === Number(evento.target.value));
    setProduto({ ...produto, categoria: categoriaEscolhida });
  }

  async function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);

    try {
      if (id !== undefined) {
        await atualizarProduto(produto);
      } else {
        await cadastrarProduto(produto);
      }
      navigate("/produtos");
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
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h2>

        <form onSubmit={enviarFormulario} className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-sm font-semibold text-[#1a1a1a]">
              Nome do produto
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={produto.nome}
              onChange={atualizarEstado}
              placeholder="Digite o nome do produto"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 text-base text-[#1a1a1a] focus:border-[#1d2e83] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="preco" className="text-sm font-semibold text-[#1a1a1a]">
              Preço
            </label>
            <input
              type="number"
              name="preco"
              id="preco"
              min={0}
              step="0.01"
              value={produto.preco}
              onChange={atualizarEstado}
              placeholder="0,00"
              required
              className="rounded-lg border border-slate-300 px-3 py-2 text-base text-[#1a1a1a] focus:border-[#1d2e83] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="categoria" className="text-sm font-semibold text-[#1a1a1a]">
              Categoria
            </label>
            <select
              name="categoria"
              id="categoria"
              value={produto.categoria?.id ?? ""}
              onChange={atualizarCategoria}
              required
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-[#1a1a1a] focus:border-[#1d2e83] focus:outline-none"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="foto" className="text-sm font-semibold text-[#1a1a1a]">
              Insira a foto do produto
            </label>
            <input
              type="text"
              name="foto"
              id="foto"
              value={produto.foto}
              onChange={atualizarEstado}
              placeholder="Cole aqui a URL da imagem do produto"
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

export default FormProduto;
