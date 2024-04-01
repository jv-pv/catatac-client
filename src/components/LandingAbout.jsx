const LandingAbout = () => (
  <>
    <article className='grid grid-auto w-[573px] h-[500px]'>
      <div className='flex flex-col gap-2 tracking-tight'>
        <h1 className='text-8xl tracking-tighter leading-tighter'>Welcome to</h1>
        <h2 className='text-6xl leading-10 indent-2'>Catatac Store</h2>
        <h3 className='text-3xl leading-loose indent-3'>by Catalina Pieri</h3>
        <p className='text-xl ml-3 text-justify'>
          Post-ironic helvetica do, health goth mukbang elit raw denim fashion axe ex selfies woke
          pour-over. Fam consectetur ut tonx poke, deep v actually wolf kitsch coloring book.
          Meditation culpa enamel pin artisan banjo pop-up, veniam irony pour-over neutra.
        </p>
      </div>
    </article>

    <article className='flex items-center justify-center bg-red-500 w-[573px] h-[744px]'>
      <div className='flex flex-col items-center justify-evenly w-[520px] h-[700px] text-9xl relative z-10'>
        <h1>CATATAC</h1>
        <h1>CATATAC</h1>
        <h1>CATATAC</h1>
        <h1>CATATAC</h1>
        <h1>CATATAC</h1>
        <img
          src='/images/cover-img.jpg'
          alt='cover-img'
          className='absolute w-[450px] h-[477px] object-contain mb-[13px]'
        />
      </div>
    </article>
  </>
);

export default LandingAbout;