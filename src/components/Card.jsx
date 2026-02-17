import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiClock, HiCalendar } from 'react-icons/hi'

const gradients = [
  'from-violet-600/40 to-indigo-600/40',
  'from-cyan-600/40 to-blue-600/40',
  'from-fuchsia-600/40 to-pink-600/40',
  'from-emerald-600/40 to-teal-600/40',
  'from-orange-600/40 to-red-600/40',
]

const emojis = ['🎤', '🏟️', '🌐', '🏀', '🎸']

const Card = ({ occasion, id, setToggle, setOccasion }) => {
  const togglePop = () => {
    setOccasion(occasion)
    setToggle(true)
  }

  const gradient = gradients[(id - 1) % gradients.length]
  const emoji = emojis[(id - 1) % emojis.length]
  const ticketsLeft = occasion.tickets?.toNumber?.() ?? 0
  const maxTickets = occasion.maxTickets?.toNumber?.() ?? 1
  const pctLeft = (ticketsLeft / maxTickets) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: id * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={togglePop}
      className="cursor-pointer group"
    >
      <div className="glass glass-hover overflow-hidden h-full flex flex-col">
        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${gradient} p-8 text-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950/50 to-transparent" />
          <span className="relative text-5xl">{emoji}</span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-bold text-lg text-white group-hover:text-primary-300 transition-colors">
            {occasion.name}
          </h3>

          <div className="mt-3 space-y-2 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <HiCalendar className="text-primary-400" />
              {occasion.date}
            </div>
            <div className="flex items-center gap-2">
              <HiClock className="text-primary-400" />
              {occasion.time}
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker className="text-primary-400" />
              {occasion.location}
            </div>
          </div>

          <div className="mt-auto pt-4">
            {/* Tickets bar */}
            <div className="flex items-center justify-between text-xs text-white/40 mb-1.5">
              <span>{ticketsLeft} tickets left</span>
              <span>{Math.round(pctLeft)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-400 transition-all"
                style={{ width: `${pctLeft}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold gradient-text">
                {ethers.utils.formatUnits(occasion.cost?.toString() || '0', 'ether')} ETH
              </span>
              <span className="text-xs glass px-3 py-1 text-primary-300">
                Buy Now →
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
