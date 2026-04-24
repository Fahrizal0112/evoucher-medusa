import { Heading } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-dark-bg">
      {/* Background with glowing effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-blue/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.04),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/80 to-dark-bg z-0"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 max-w-5xl mx-auto gap-8">
        <div className="space-y-4 animate-fade-in-top">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-sm font-medium mb-4 backdrop-blur-sm shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse mr-2"></span>
            #1 Gaming Top-Up Platform
          </div>
          
          <Heading
            level="h1"
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg uppercase font-sans"
            style={{ textShadow: "0 0 20px rgba(0,243,255,0.4)" }}
          >
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Gameplay</span>
          </Heading>
          
          <Heading
            level="h2"
            className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Instant delivery, secure payments, and the best prices for your favorite games. Top up now and dominate the leaderboard!
          </Heading>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-right delay-200">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold text-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)]"
          >
            Top Up Now
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/collections"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-dark-surface/50 border border-gray-600 text-white font-bold text-lg hover:bg-dark-surface transition-all backdrop-blur-md"
          >
            View Offers
          </LocalizedClientLink>
        </div>
        
        {/* Game Stats / Trust Indicators */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-800/50 w-full animate-fade-in-top delay-300">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">1M+</span>
            <span className="text-sm text-gray-400">Gamers</span>
          </div>
          <div className="w-px h-12 bg-gray-800"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">100+</span>
            <span className="text-sm text-gray-400">Games Supported</span>
          </div>
          <div className="w-px h-12 bg-gray-800 hidden md:block"></div>
          <div className="flex flex-col items-center hidden md:flex">
            <span className="text-3xl font-bold text-white">24/7</span>
            <span className="text-sm text-gray-400">Instant Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
