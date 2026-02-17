import { ethers } from 'ethers'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiTicket, HiMenu, HiX } from 'react-icons/hi'

const Navigation = ({ account, setAccount }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <HiTicket className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              TicketChain
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink>Events</NavLink>
            <NavLink>Sports</NavLink>
            <NavLink>Concerts</NavLink>
            <NavLink>Conferences</NavLink>
          </div>

          {/* Connect Button */}
          <div className="flex items-center gap-3">
            {account ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass px-4 py-2 text-sm font-mono text-primary-300"
              >
                {account.slice(0, 6)}...{account.slice(-4)}
              </motion.div>
            ) : (
              <button onClick={connectHandler} className="btn-primary text-sm py-2 px-5">
                Connect Wallet
              </button>
            )}

            <button
              className="md:hidden p-2 text-white/60 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-4 space-y-2"
          >
            {['Events', 'Sports', 'Concerts', 'Conferences'].map(item => (
              <a key={item} className="block px-3 py-2 text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

const NavLink = ({ children }) => (
  <a className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer font-medium">
    {children}
  </a>
)

export default Navigation
