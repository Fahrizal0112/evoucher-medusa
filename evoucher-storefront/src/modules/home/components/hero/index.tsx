import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="relative w-full h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-[#0A0F1C]">
      {/* Gaming Background pattern & gradient elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-[#0A0F1C] to-[#050810] z-0"></div>
      
      {/* Accent glow elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px] z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[80px] z-0"></div>

      <div className="relative z-10 w-full px-4 flex flex-col items-center max-w-5xl mx-auto gap-8 text-center mt-[-40px]">
        {/* Small Tag */}
        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          🔥 OFFICIAL ESPORTS PLATFORM
        </span>
        
        {/* Main Headings */}
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-gray-400 uppercase tracking-tight drop-shadow-xl flex flex-col gap-2">
          <span>TOP UP GAMES <span className="text-blue-500">&</span></span>
          <span>VOUCHERS</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl leading-relaxed">
          Layanan top up game termurah, cepat, dan aman. Hadir 24 jam dengan berbagai macam metode pembayaran.
        </p>

        {/* Call to action button */}
        <div className="mt-8 flex gap-6">
          <a
            href="#products"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 rounded-xl bg-blue-600 hover:scale-105 hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.5)] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            <span className="text-lg tracking-wider">BELI SEKARANG</span>
            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
      
      {/* Decorative bottom fade out to next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 dark:from-[#050810]" />
    </div>
  )
}


export default Hero
