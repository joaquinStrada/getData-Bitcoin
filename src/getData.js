import { config } from './lib/config'
import axios from 'axios'
import { updateTests, updateChart, updateIsDownload } from './sockets'
import { delay } from './lib/functions'
import fs from 'fs'

const getData = async () => {
    const { coinId, firstDate, finallyDate, tests } = config.historyData

    const dateFirst = new Date(firstDate).getTime()
    const dateFinally = new Date(finallyDate).getTime()

    const last = {
        current_price_24h: null,
        market_cap_24h: null
    }

    const result = {
        train: {
            data: [],
            prediction: []
        },
        test: {
            data: [],
            prediction: []
        }
    }

    const chart = {
        trainData: [],
        trainPrediction: [],
        testData: [],
        testPrediction: []
    }
    
    try {
        let trainData = []
		let prediction = []

		let chartTrain = []
		let chartPrediction = []

        for (let i = dateFirst; i <= dateFinally; i += 86400000) {
            // Formateamos la fecha con el formato requerido
			const date = new Date(i)
			const day = date.getDate()
			const month = date.getMonth() + 1
			const year = date.getFullYear()

			const dateStr = `${day}-${month}-${year}`

            // Obtenemos los datos
			const url = `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${dateStr}`
            const { data } = await axios.get(url)

            const currentPrice = data.market_data.current_price.usd
			const marketCap = data.market_data.market_cap.usd
			const totalVolume = data.market_data.total_volume.usd

			const priceChange24h = last.current_price_24h === null ? 0 : currentPrice - last.current_price_24h
			const priceChangePercentage24h = priceChange24h * 100 / currentPrice
			const marketCapChange24h = last.market_cap_24h === null ? 0 : marketCap - last.market_cap_24h
			const marketCapChangePercentage24h = marketCapChange24h * 100 / marketCap

            // Add data
			const dataArray = []

			dataArray[0] = currentPrice
			dataArray[1] = marketCap
			dataArray[2] = totalVolume
			dataArray[3] = priceChange24h
			dataArray[4] = priceChangePercentage24h
			dataArray[5] = marketCapChange24h
			dataArray[6] = marketCapChangePercentage24h

            trainData.push(dataArray)
            prediction.push(currentPrice)

            chartTrain.push([i, currentPrice])
            chartPrediction.push([i, currentPrice])

            last.current_price_24h = currentPrice
            last.market_cap_24h = marketCap

            updateTests(i)

            await delay(2000)
        }

        trainData.pop()
        prediction.shift()

        chartTrain.pop()
        chartPrediction.shift()

        const finallyTrain = Math.floor(tests * trainData.length / 100)

        for (let i = 0; i < finallyTrain; i++) {
            result.train.data.push(trainData[i])
            result.train.prediction.push(prediction[i])

            chart.trainData.push(chartTrain[i])
            chart.trainPrediction.push(chartPrediction[i])

            chart.testData.push(null)
            chart.testPrediction.push(null)
        }

        for (let i = finallyTrain; i < trainData.length; i++) {
            result.test.data.push(trainData[i])
            result.test.prediction.push(prediction[i])

            chart.trainData.push(null)
            chart.trainPrediction.push(null)

            chart.testData.push(chartTrain[i])
            chart.testPrediction.push(chartPrediction[i])
        }

        updateChart(chart)

        // saving data
        const jsonResult = JSON.stringify(result)
        fs.writeFileSync('dataModel.json', jsonResult, 'utf-8')
        updateIsDownload(true)
    } catch (err) {
        console.error(err)
    }
}

export default getData