const Sort = () => {
  const categories = ['All', 'Conferences', 'Concerts', 'Sports']

  return (
    <div id="events" className="pt-8">
      <h2 className="font-display font-bold text-2xl text-white mb-6">
        Upcoming Events
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-primary-600 text-white'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
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
