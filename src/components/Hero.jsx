import { motion } from 'framer-motion'

const Hero = () => (
  <section className="relative overflow-hidden py-20 sm:py-28">
    {/* Animated gradient orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 glass px-4 py-2 mb-6 text-sm text-primary-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Powered by Ethereum & NFTs
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight">
          <span className="text-white">Your Ticket to the</span>
          <br />
          <span className="gradient-text">Future of Events</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
          Discover and purchase NFT-powered tickets for concerts, sports, and conferences.
          Secure, transparent, and truly yours.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#events" className="btn-primary text-base py-3.5 px-8">
            Explore Events
          </a>
          <a href="#" className="glass glass-hover py-3.5 px-8 font-semibold text-base">
            Learn More
          </a>
        </div>
      </motion.div>
    </div>
  </section>
)

export default Hero
