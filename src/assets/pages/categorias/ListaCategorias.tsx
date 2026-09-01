import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import CardCategoria from "../../components/cardCategoria/CardCategoria";
import { buscarCategorias } from "../../../services/service";
import type { Categoria } from "../../../models";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarLista();
  }, []);

  // busca todas as categorias cadastradas na api
  async function buscarLista() {
    try {
      const resposta = await buscarCategorias();
      setCategorias(resposta.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="w-full bg-[#bfe5ec] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-[#1d2e83]">Categorias</h2>
          <Link
            to="/cadastrar-categoria"
            className="rounded-xl bg-[#1d2e83] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Nova Categoria
          </Link>
        </div>

        {carregando && (
          <div className="flex justify-center py-14">
            <PuffLoader color="#1d2e83" size={60} />
          </div>
        )}

        {!carregando && categorias.length === 0 && (
          <p className="py-10 text-center text-lg text-[#1a1a1a]">Nenhuma categoria cadastrada</p>
        )}

        {!carregando && categorias.length > 0 && (
          <div className="flex flex-col gap-3">
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ListaCategorias;
