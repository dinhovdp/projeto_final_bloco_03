import { useState, type FormEvent } from "react";
import { List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useCarrinho } from "../../../contexts/CarrinhoContext";

// cole aqui os links das imagens dos icones (mesmo esquema da logo acima)
const ICONE_PERFIL_URL = "https://ik.imagekit.io/dinhovdp/produtos_farmacia/user.png";
const ICONE_CARRINHO_URL = "https://ik.imagekit.io/dinhovdp/produtos_farmacia/carrinho.png?updatedAt=1788309546536";

function Navbar() {
  const { quantidadeTotal } = useCarrinho();
  const [menuAberto, setMenuAberto] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const navigate = useNavigate();

  function fecharMenu() {
    setMenuAberto(false);
  }

  // manda pra pagina de resultados com o termo digitado, tanto na busca
  // de cima (desktop) quanto na de dentro do menu mobile
  function pesquisar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const termo = termoBusca.trim();
    if (termo === "") return;
    navigate(`/busca?q=${encodeURIComponent(termo)}`);
    fecharMenu();
  }

  return (
    <header className="w-full bg-[#1d2e83] text-white">
      <div className="mx-auto flex w-full max-w-none items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10 xl:px-14">
        {/* logo e nome ficam dentro do mesmo link, senao duplica o direcionamento pra home */}
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={fecharMenu}>
          <img
            src="https://ik.imagekit.io/dinhovdp/produtos_farmacia/farma.png"
            alt="Logo da Farmácia"
            className="h-9 w-9 object-contain"
          />
          <span className="text-2xl font-black uppercase tracking-tight sm:text-3xl">FARMÁCIA</span>
        </Link>

        <div className="hidden flex-1 justify-center px-3 md:flex">
          <form
            onSubmit={pesquisar}
            className="flex w-full max-w-[430px] items-center rounded-xl border border-white/80 bg-white px-3 py-2 shadow-sm"
          >
            <input
              type="text"
              value={termoBusca}
              onChange={(evento) => setTermoBusca(evento.target.value)}
              placeholder="Procurar produtos ou categorias"
              className="w-full border-0 bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d2e83] text-white transition hover:brightness-110"
              aria-label="Buscar"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          {/* links de texto: so aparecem na barra a partir do md, no celular vao pro menu de baixo */}
          <nav className="hidden items-center gap-4 text-base font-medium lg:gap-6 md:flex">
            <Link to="/categorias" className="transition hover:text-slate-200">Categorias</Link>
            <Link to="/cadastrar-categoria" className="transition hover:text-slate-200">Cadastrar Categoria</Link>
            <Link to="/produtos" className="transition hover:text-slate-200">Produtos</Link>
          </nav>

          {/* perfil e carrinho ficam sempre visiveis, em qualquer tamanho de tela */}
          <button type="button" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/60 transition hover:bg-white/10" aria-label="Perfil">
            <img src={ICONE_PERFIL_URL} alt="Perfil" className="h-full w-full object-cover" />
          </button>
          <Link
            to="/carrinho"
            onClick={fecharMenu}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10"
            aria-label="Carrinho"
          >
            <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full">
              <img src={ICONE_CARRINHO_URL} alt="Carrinho" className="h-full w-full object-cover" />
            </span>
            {quantidadeTotal > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {quantidadeTotal}
              </span>
            )}
          </Link>

          {/* botao hamburguer: so aparece abaixo do md, alterna o menu de baixo */}
          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10 md:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            {menuAberto ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </div>

      {/* painel do menu mobile: so existe abaixo do md, e some acima disso mesmo se ficar aberto */}
      {menuAberto && (
        <div className="flex flex-col gap-3 border-t border-white/20 px-4 py-4 sm:px-6 md:hidden">
          <form
            onSubmit={pesquisar}
            className="flex w-full items-center rounded-xl border border-white/80 bg-white px-3 py-2 shadow-sm"
          >
            <input
              type="text"
              value={termoBusca}
              onChange={(evento) => setTermoBusca(evento.target.value)}
              placeholder="Procurar produtos ou categorias"
              className="w-full border-0 bg-transparent text-base text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1d2e83] text-white transition hover:brightness-110"
              aria-label="Buscar"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
          </form>

          <Link to="/categorias" onClick={fecharMenu} className="py-1 text-base font-medium transition hover:text-slate-200">
            Categorias
          </Link>
          <Link to="/cadastrar-categoria" onClick={fecharMenu} className="py-1 text-base font-medium transition hover:text-slate-200">
            Cadastrar Categoria
          </Link>
          <Link to="/produtos" onClick={fecharMenu} className="py-1 text-base font-medium transition hover:text-slate-200">
            Produtos
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;