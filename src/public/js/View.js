import Coin from './components/Coin.js'
import PercentageData from './components/PercentageData.js'
import Chart from './components/Chart.js'

export default class View {
    constructor() {
        this.model = null

        this.coin = new Coin()
        this.firstDateInput = document.getElementById('input-first-date')
        this.finallyDateInput = document.getElementById('input-finally-date')
        this.inputTests = document.getElementById('input-tests')
        this.daysTrain = document.getElementById('days-train-value')
        this.daysTests = document.getElementById('days-tests-value')
        this.percentageData = new PercentageData()
        this.btnDownload = document.getElementById('btn-download')
        this.aDownload = document.getElementById('a-download')
        this.chart = new Chart()

        this.btnDownload.addEventListener('click', () => this.onDownload())
    }

    setModel(model) {
        this.model = model
    }

    async render(data) {
        const { coinId, firstDate, finallyDate, tests, daysTrain, daysTest, domain } = data

        this.firstDateInput.value = firstDate
        this.finallyDateInput.value = finallyDate
        this.inputTests.value = `${tests}%`
        this.daysTrain.innerHTML = daysTrain
        this.daysTests.innerHTML = daysTest

        this.chart.setDomain(domain)

        try {
            const coinData = await this.model.getDataCoin(coinId)

            this.coin.loadData(coinData)
        } catch (err) {
           console.error(err) 
        }
    }

    loadData(data) {
        const { percentageData, isDownload, dateFirst, chart } = data

        // setting is download
        if (isDownload) {
            this.btnDownload.removeAttribute('disabled')
        } else {
            this.btnDownload.setAttribute('disabled', 'true')
        }

        this.percentageData.setPercentage(percentageData)

        // chart
        const day = new Date(dateFirst).getDate()
        const month = new Date(dateFirst).getMonth() + 1
        const year = new Date(dateFirst).getFullYear()

        const { trainData, trainPrediction, testData, testPrediction} = chart

        this.chart.createChart(year, month, day, trainData, trainPrediction, testData, testPrediction)
    }

    updateTests(tests) {
        this.percentageData.setPercentage(tests)
    }

    updateChart(chart) {
        const { trainData, trainPrediction, testData, testPrediction} = chart

        this.chart.render(trainData, trainPrediction, testData, testPrediction)
    }

    isDownload(state) {
        if (state) {
            this.btnDownload.removeAttribute('disabled')
        } else {
            this.btnDownload.setAttribute('disabled', 'true')
        }
    }

    onDownload() {
        this.aDownload.click()
    }
}