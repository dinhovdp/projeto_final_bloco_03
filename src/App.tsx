
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./assets/components/footer/Footer";
import Navbar from "./assets/components/navbar/Navbar";
import Home from "./assets/pages/home/Home";
import ListaCategorias from "./assets/pages/categorias/ListaCategorias";
import FormCategoria from "./assets/pages/categorias/FormCategoria";
import DeletarCategoria from "./assets/pages/categorias/DeletarCategoria";
import ListaProdutos from "./assets/pages/produtos/ListaProdutos";
import FormProduto from "./assets/pages/produtos/FormProduto";
import DeletarProduto from "./assets/pages/produtos/DeletarProduto";
import Carrinho from "./assets/pages/carrinho/Carrinho";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";

export function App() {
  return (
    <CarrinhoProvider>
        {/* ALTERAÇÃO 1: Adicionado 'flex flex-col' para ativar o layout em coluna */}
      <div className="flex min-h-screen w-full flex-col bg-[#bfe5ec]">
        <BrowserRouter>
          <Navbar />
          {/* ALTERAÇÃO 2: Trocado 'w-full' por 'flex-1' para expandir o conteúdo principal */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrar-categoria" element={<FormCategoria />} />
              <Route path="/editar-categoria/:id" element={<FormCategoria />} />
              <Route path="/deletar-categoria/:id" element={<DeletarCategoria />} />
              <Route path="/produtos" element={<ListaProdutos />} />
              <Route path="/cadastrar-produto" element={<FormProduto />} />
              <Route path="/editar-produto/:id" element={<FormProduto />} />
              <Route path="/deletar-produto/:id" element={<DeletarProduto />} />
              <Route path="/carrinho" element={<Carrinho />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </CarrinhoProvider>
  );
}

export default App;
