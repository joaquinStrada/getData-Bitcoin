export default class Coin {
    constructor() {
        this.imgCoin = document.getElementById('img-symbol')
        this.nameCoin = document.getElementById('name-coin')
        this.symbolCoin = document.getElementById('symbol-coin')
        this.priceCoin = document.getElementById('price-coin')
        this.priceChangeCoin = document.getElementById('price-change-coin')
        this.volumeCoin = document.getElementById('volume-coin')
    }

    loadData(data) {
        const {
            image,
            name,
            symbol,
            current_price,
            price_change_percentage_24h,
            total_volume
        } = data

        const price = Math.ceil(current_price * 1000) / 1000
        const price_change = Math.ceil(price_change_percentage_24h * 1000) / 1000
        const volume = Math.ceil(total_volume * 1000) / 1000
        const volumeStr = volume.toLocaleString()

        this.imgCoin.setAttribute('src', image)
        this.nameCoin.innerHTML = name
        this.symbolCoin.innerHTML = symbol
        this.priceCoin.innerHTML = price
        this.priceChangeCoin.innerHTML = price_change
        this.volumeCoin.innerHTML = volumeStr

        const classPrice_Change = price_change > 0 ? 'text-success' : 'text-danger'

        this.priceChangeCoin.setAttribute('class', classPrice_Change)
    }
}