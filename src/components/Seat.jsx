const Seat = ({ seatNumber, isTaken, isSelected, buying, buyHandler }) => {
  if (isTaken) {
    return (
      <div className="aspect-square rounded bg-red-500/20 border border-red-500/30 cursor-not-allowed flex items-center justify-center text-[9px] text-red-400/60">
        {seatNumber}
      </div>
    )
  }

  return (
    <button
      onClick={() => buyHandler(seatNumber)}
      disabled={buying}
      className={`aspect-square rounded transition-all duration-200 flex items-center justify-center text-[9px]
        ${isSelected
          ? 'bg-primary-500 border-primary-400 text-white scale-110 shadow-lg shadow-primary-500/40'
          : 'bg-primary-500/15 border border-primary-500/30 text-primary-300/60 hover:bg-primary-500/40 hover:border-primary-400 hover:text-white hover:scale-105'
        }
        disabled:opacity-50`}
    >
      {seatNumber}
    </button>
  )
}

export default Seat
