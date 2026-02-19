import { ethers } from 'ethers'
import { HiLocationMarker, HiClock, HiCalendar } from 'react-icons/hi'

const emojis = ['🎤', '🏟️', '🌐', '🏀', '🎸']

const Card = ({ occasion, id, setToggle, setOccasion }) => {
  const togglePop = () => {
    setOccasion(occasion)
    setToggle(true)
  }

  const emoji = emojis[(id - 1) % emojis.length]
  const ticketsLeft = occasion.tickets?.toNumber?.() ?? 0
  const maxTickets = occasion.maxTickets?.toNumber?.() ?? 1
  const pctLeft = (ticketsLeft / maxTickets) * 100

  return (
    <div
      onClick={togglePop}
      className="cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
    >
      <div className="bg-white/5 p-6 text-center">
        <span className="text-4xl">{emoji}</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-white">
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

        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-white/40 mb-1.5">
            <span>{ticketsLeft} tickets left</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${pctLeft}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-white">
              {ethers.utils.formatUnits(occasion.cost?.toString() || '0', 'ether')} ETH
            </span>
            <span className="text-xs text-primary-400">
              Buy →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
