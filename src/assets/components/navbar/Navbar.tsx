import { MagnifyingGlass, ShoppingCart, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="w-full bg-[#1d2e83] text-white">
      <div className="mx-auto flex w-full max-w-none items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10 xl:px-14">
        {/* logo e nome ficam dentro do mesmo link, senao duplica o direcionamento pra home */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img
            src="https://ik.imagekit.io/dinhovdp/produtos_farmacia/farma.png"
            alt="Logo da Farmácia"
            className="h-9 w-9 object-contain"
          />
          <span className="text-2xl font-black uppercase tracking-tight sm:text-3xl">FARMÁCIA</span>
        </Link>

        <div className="hidden flex-1 justify-center px-3 md:flex">
          <div className="flex w-full max-w-[430px] items-center rounded-xl border border-white/80 bg-white px-3 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Procurar"
              className="w-full border-0 bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d2e83] text-white transition hover:brightness-110"
              aria-label="Buscar"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
          </div>
        </div>

        <nav className="hidden items-center gap-4 text-base font-medium md:flex lg:gap-6">
          <Link to="/categorias" className="transition hover:text-slate-200">Categorias</Link>
          <Link to="/cadastrar-categoria" className="transition hover:text-slate-200">Cadastrar Categoria</Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10" aria-label="Perfil">
            <User size={24} weight="bold" />
          </button>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10" aria-label="Carrinho">
            <ShoppingCart size={24} weight="bold" />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
