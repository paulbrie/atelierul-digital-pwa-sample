const btcUrl = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json'

if (navigator.serviceWorker) {
    navigator.serviceWorker
             .register('service-worker.js')
             .then(() => console.log('Service Worker Registered!!!'))
             .catch((error) => console.log('error', error))
}

class App {
  constructor() {
    this.state = {
      isLoading: true,   
    }
    this.spinner = document.querySelector('.loader')
    this.container = document.querySelector('.main')
    this.card = document.querySelector('.card')

    this.init()
  }

  async init() {
    // load Bitcoind data
    const btcData = await this.loadBtcInfo()
    
    // if data loading succeeds, mask spinner
    if (btcData) {
      this.spinner.setAttribute('hidden', true)
      this.card.removeAttribute('hidden')
      this.card.innerHTML = `Bitcoin (BTC) - USD ${btcData.bpi.USD.rate_float}`
    } 
  }

  async loadBtcInfo() {
    try {
      const data = await fetch(btcUrl)
      const json = await data.json()
      return json
    } catch (error) {
      console.log('error', error)
      return false
    }
  }
}

const app = new App()