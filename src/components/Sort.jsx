const Sort = () => {
  const categories = ['All', 'Conferences', 'Concerts', 'Sports']

  return (
    <div id="events" className="pt-8">
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6">
        🔥 Upcoming Events
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              i === 0
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                : 'glass glass-hover text-white/60 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Sort
