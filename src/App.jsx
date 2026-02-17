import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Toaster, toast } from 'react-hot-toast'

import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
import SeatChart from './components/SeatChart'
import Hero from './components/Hero'
import Footer from './components/Footer'

import TokenMasterABI from './abis/TokenMaster.json'
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)
  const [tokenMaster, setTokenMaster] = useState(null)
  const [occasions, setOccasions] = useState([])
  const [occasion, setOccasion] = useState({})
  const [toggle, setToggle] = useState(false)

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const network = await provider.getNetwork()
      const networkConfig = config[network.chainId]

      if (!networkConfig) {
        toast.error('Please connect to a supported network')
        return
      }

      const tokenMaster = new ethers.Contract(
        networkConfig.tokenMaster.address,
        TokenMasterABI,
        provider
      )
      setTokenMaster(tokenMaster)

      const totalOccasions = await tokenMaster.totalOccasions()
      const occasions = []

      for (let i = 1; i <= totalOccasions.toNumber(); i++) {
        const occasion = await tokenMaster.getOccasion(i)
        occasions.push(occasion)
      }

      setOccasions(occasions)

      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account)
      })
    } catch (err) {
      console.error('Error loading blockchain data:', err)
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(30, 27, 75, 0.95)',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            backdropFilter: 'blur(20px)',
          },
          success: { iconTheme: { primary: '#8b5cf6', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      <Navigation account={account} setAccount={setAccount} />

      <Hero />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        <Sort />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {occasions.map((occasion, index) => (
            <Card
              occasion={occasion}
              id={index + 1}
              tokenMaster={tokenMaster}
              provider={provider}
              account={account}
              toggle={toggle}
              setToggle={setToggle}
              setOccasion={setOccasion}
              key={index}
            />
          ))}
        </div>

        {occasions.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-display font-semibold text-white/60">
              No events found
            </h3>
            <p className="text-white/40 mt-2">
              Connect to localhost network with deployed contract
            </p>
          </div>
        )}
      </main>

      {toggle && (
        <SeatChart
          occasion={occasion}
          tokenMaster={tokenMaster}
          provider={provider}
          setToggle={setToggle}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
