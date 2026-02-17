import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { HiX, HiLocationMarker, HiClock, HiCalendar } from 'react-icons/hi'
import Seat from './Seat'

const SeatChart = ({ occasion, tokenMaster, provider, setToggle }) => {
  const [seatsTaken, setSeatsTaken] = useState([])
  const [hasSold, setHasSold] = useState(false)
  const [buying, setBuying] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState(null)

  const getSeatsTaken = async () => {
    const taken = await tokenMaster.getSeatsTaken(occasion.id)
    setSeatsTaken(taken.map(s => s.toNumber()))
  }

  useEffect(() => {
    getSeatsTaken()
  }, [hasSold])

  const buyHandler = async (_seat) => {
    setSelectedSeat(_seat)
    setBuying(true)
    const loadingToast = toast.loading('Confirm transaction in MetaMask...')

    try {
      const signer = await provider.getSigner()
      const transaction = await tokenMaster.connect(signer).mint(
        occasion.id,
        _seat,
        { value: occasion.cost }
      )

      toast.loading('Mining transaction...', { id: loadingToast })
      await transaction.wait()

      toast.success('🎉 Ticket purchased! NFT minted.', { id: loadingToast })
      setHasSold(true)
    } catch (err) {
      console.error(err)
      toast.error('Transaction failed', { id: loadingToast })
    }

    setBuying(false)
    setSelectedSeat(null)
  }

  const maxTickets = occasion.maxTickets?.toNumber?.() ?? 0
  const cols = Math.min(Math.ceil(Math.sqrt(maxTickets * 1.5)), 20)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setToggle(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative glass border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={() => setToggle(false)}
            className="absolute top-4 right-4 p-2 rounded-full glass glass-hover text-white/60 hover:text-white z-10"
          >
            <HiX size={20} />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-br from-primary-600/30 to-accent-500/20 p-6 sm:p-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white pr-10">
              {occasion.name}
            </h2>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <HiCalendar className="text-primary-400" /> {occasion.date}
              </span>
              <span className="flex items-center gap-1.5">
                <HiClock className="text-primary-400" /> {occasion.time}
              </span>
              <span className="flex items-center gap-1.5">
                <HiLocationMarker className="text-primary-400" /> {occasion.location}
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold gradient-text">
              {ethers.utils.formatUnits(occasion.cost?.toString() || '0', 'ether')} ETH
            </div>
          </div>

          {/* Seat map */}
          <div className="p-6 sm:p-8">
            {/* Stage */}
            <div className="mx-auto max-w-xs mb-8">
              <div className="h-10 bg-gradient-to-r from-primary-500/20 via-primary-500/40 to-primary-500/20 rounded-t-full flex items-center justify-center text-xs font-semibold text-primary-300 tracking-widest uppercase">
                Stage
              </div>
            </div>

            {/* Seats grid */}
            <div
              className="grid gap-1.5 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                maxWidth: `${cols * 2.2}rem`,
              }}
            >
              {Array.from({ length: maxTickets }, (_, i) => (
                <Seat
                  key={i}
                  seatNumber={i + 1}
                  isTaken={seatsTaken.includes(i + 1)}
                  isSelected={selectedSeat === i + 1}
                  buying={buying}
                  buyHandler={buyHandler}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-6 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-500/30 border border-primary-500/50" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-500" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-500/40" /> Taken
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SeatChart
