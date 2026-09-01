import { Link } from "react-router-dom";
import type { Categoria } from "../../../models";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-lg font-semibold text-[#1d2e83]">{categoria.nome}</p>

      <div className="flex gap-2">
        <Link
          to={`/editar-categoria/${categoria.id}`}
          className="rounded-md bg-[#1d2e83] px-3 py-2 text-sm font-medium text-white transition hover:brightness-110"
        >
          Editar
        </Link>
        <Link
          to={`/deletar-categoria/${categoria.id}`}
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:brightness-110"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
