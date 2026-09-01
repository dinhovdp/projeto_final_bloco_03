
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./assets/components/footer/Footer";
import Navbar from "./assets/components/navbar/Navbar";
import Home from "./assets/pages/home/Home";

export function App() {
  return (
    <div className="min-h-screen w-full bg-[#bfe5ec]">
      <BrowserRouter>
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;