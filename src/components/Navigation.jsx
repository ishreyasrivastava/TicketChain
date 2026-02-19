import { ethers } from 'ethers'
import { useState } from 'react'
import { HiTicket, HiMenu, HiX } from 'react-icons/hi'

const Navigation = ({ account, setAccount }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
  }

  return (
    <nav className="sticky top-0 z-50 bg-surface-950/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <HiTicket className="text-primary-400 text-xl" />
            <span className="font-display font-bold text-xl text-white">
              TicketChain
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink>Events</NavLink>
            <NavLink>Sports</NavLink>
            <NavLink>Concerts</NavLink>
            <NavLink>Conferences</NavLink>
          </div>

          <div className="flex items-center gap-3">
            {account ? (
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-mono text-white/70">
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
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

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {['Events', 'Sports', 'Concerts', 'Conferences'].map(item => (
              <a key={item} className="block px-3 py-2 text-white/60 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

const NavLink = ({ children }) => (
  <a className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
    {children}
  </a>
)

export default Navigation
