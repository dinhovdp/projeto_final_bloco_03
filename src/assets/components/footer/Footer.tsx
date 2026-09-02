import React from 'react';
import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1d2e83] py-5 text-white">
     
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-2 px-5 text-center">
        <p className="text-2xl font-bold">Farmácia Generation | Copyright: {currentYear}</p>
        <p className="text-lg">Acesse nossas redes sociais</p>
        <div className="mt-1 flex items-center gap-3">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10">
            <LinkedinLogo size={20} weight="bold" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10">
            <InstagramLogo size={20} weight="bold" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 transition hover:bg-white/10">
            <FacebookLogo size={20} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
