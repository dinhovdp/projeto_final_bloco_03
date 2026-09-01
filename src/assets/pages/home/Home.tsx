function Home() {
  return (
    <section className="w-full bg-[#bde3ed] px-4 py-10 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div className="mx-auto grid min-h-[70vh] w-full max-w-[1600px] items-center gap-8 py-6 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="order-2 flex flex-col items-start justify-center md:order-1">
          <h1 className="text-4xl font-black leading-none tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-7xl xl:text-[5rem]">
            Seja bem vinde!
          </h1>
          <p className="mt-4 max-w-[500px] text-lg font-medium text-[#1a1a1a] sm:text-xl lg:text-[2rem] lg:leading-[1.2]">
            Aqui você encontra <span className="font-bold">Medicamentos e Cosméticos!</span>
          </p>

          <button
            type="button"
            className="mt-8 rounded-xl border border-[#1d2e83] bg-[#1d2e83] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:brightness-110 sm:text-lg"
          >
            Cadastrar Produto
          </button>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative flex h-[300px] w-full max-w-[520px] items-center justify-center overflow-hidden rounded-[32px] bg-[#9ed8e8] shadow-[0_20px_35px_rgba(29,46,131,0.15)] sm:h-[360px] md:h-[420px] lg:h-[500px]">
            <img
              src="https://ik.imagekit.io/dinhovdp/produtos_farmacia/balconista.png"
              alt="Balcão da farmácia"
              className="h-full w-full rounded-[32px] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;