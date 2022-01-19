export default class Model {
    constructor() {
        this.view = null

        this.socket = io()

        this.socket.on('load-data', data => this.loadData(data))
        this.socket.on('update-tests', data => this.updateTests(data))
        this.socket.on('update-chart', data => this.updateChart(data))
        this.socket.on('update-download', data => this.isDownload(data))
    }

    setView(view) {
        this.view = view
    }

    async render() {
        try {
            const res = await fetch('/api/data')
            const data = await res.json()

            const url = window.location.href
            const domain = url.replace('https://', '').replace('http://', '').replace('/', '')
            data.domain = domain

            this.view.render(data)
        } catch (err) {
            console.error(err)
        }
    }

    async getDataCoin(coinId) {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`)

            if (res.status !== 200) {
                return new Error('Ocurrio un error al intentar recuperar los datos de la criptomoneda')
            }

            const [data] = await res.json()

            return data
        } catch (err) {
            console.error(err)
        }
    }

    loadData(data) {
        this.view.loadData(data)
    }

    updateTests(data) {
        this.view.updateTests(data)
    }

    updateChart(data) {
        this.view.updateChart(data)
    }

    isDownload(data) {
        this.view.isDownload(data)
    }
}