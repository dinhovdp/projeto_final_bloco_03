
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./assets/components/footer/Footer";
import Navbar from "./assets/components/navbar/Navbar";
import Home from "./assets/pages/home/Home";
import ListaCategorias from "./assets/pages/categorias/ListaCategorias";
import FormCategoria from "./assets/pages/categorias/FormCategoria";
import DeletarCategoria from "./assets/pages/categorias/DeletarCategoria";

export function App() {
  return (
    <div className="min-h-screen w-full bg-[#bfe5ec]">
      <BrowserRouter>
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastrar-categoria" element={<FormCategoria />} />
            <Route path="/editar-categoria/:id" element={<FormCategoria />} />
            <Route path="/deletar-categoria/:id" element={<DeletarCategoria />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;