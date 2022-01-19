import { config } from './lib/config'

let socket = null

const data = {
    percentageData: 0,
    dateFirst: config.historyData.firstDate,
    chart: {
        trainData: [],
		trainPrediction: [],
		testData: [],
		testPrediction: []
    },
    isDownload: false
}

export const init = io => {
    socket = io

    io.on('connection', webSocket => {
        console.log('Nuevo socket conectado:', webSocket.id);

        webSocket.emit('load-data', data)
    })
}

export const updateTests = i => {
    const dateFirst = new Date(config.historyData.firstDate).getTime()
    const dateFinally = new Date(config.historyData.finallyDate).getTime()

    const diffDate = dateFinally - dateFirst
    const diffDateNow = i - dateFirst

    const tests = Math.floor(diffDateNow * 100 / diffDate)

    data.percentageData = tests

    socket.emit('update-tests', tests)
}

export const updateChart = chart => {
    data.chart = chart

    socket.emit('update-chart', chart)
}

export const updateIsDownload = state => {
    data.isDownload = state

    socket.emit('update-download', state)
}