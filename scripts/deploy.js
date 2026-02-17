const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  const [deployer] = await ethers.getSigners()

  const TicketChain = await ethers.getContractFactory("TicketChain")
  const tokenMaster = await TicketChain.deploy("TicketChain", "TM")
  await tokenMaster.deployed()

  console.log(`Deployed TicketChain Contract at: ${tokenMaster.address}\n`)

  const occasions = [
    {
      name: "ETH Tokyo",
      cost: tokens(3),
      tickets: 125,
      date: "Jun 2,2026",
      time: "6:00PM JST",
      location: "Tokyo, Japan"
    },
    {
      name: "ETH Privacy",
      cost: tokens(1),
      tickets: 200,
      date: "Jun 9,2026",
      time: "1:00PM JST",
      location: "Osaka, Japan"
    },
    {
      name: "ETH Global",
      cost: tokens(0.25),
      tickets: 300,
      date: "Jun 11,2026",
      time: "10:00AM EST",
      location: "New York, USA"
    },
    {
      name: "Dallas Mavericks vs Warriors",
      cost: tokens(5),
      tickets: 50,
      date: "Jun 15,2026",
      time: "8:00PM CST",
      location: "Dallas, USA"
    },
    {
      name: "Coldplay World Tour",
      cost: tokens(1.5),
      tickets: 500,
      date: "Jun 22,2026",
      time: "7:30PM GMT",
      location: "London, UK"
    }
  ]

  for (let i = 0; i < occasions.length; i++) {
    const tx = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location
    )
    await tx.wait()
    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
