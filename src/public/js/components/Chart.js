export default class Chart {
	constructor() {
		this.domain = ''
		this.chart = null
	}

	createChart(year, month, day, serie1, serie2, serie3, serie4) {
		this.chart = Highcharts.chart('chart', {

			title: {
				text: 'Historial de precios de la criptomoneda'
			},

			chart: {
				zoomType: 'xy'
			},

			subtitle: {
				text: `Fuente: ${this.domain}`
			},

			credits: {
				enabled: false
			},

			xAxis: {
				type: 'datetime',
				showFirstLabel: true,
				showLastLabel: true
			},

			yAxis: {
				title: {
					text: 'Precio'
				}
			},

			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},

			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointStart: Date.UTC(year, month, day)
				}
			},

			series: [{
				name: 'Datos de entrenamiento',
				data: serie1
			},
			{
				name: 'Prediccion de entrenamiento',
				data: serie2
			},
			{
				name: 'Datos de prueba',
				data: serie3
			},
			{
				name: 'Prediccion de prueba',
				data: serie4
			}],

			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}

		})
	}

	render(serie1, serie2, serie3, serie4) {
		this.chart.series[0].setData(serie1)
		this.chart.series[1].setData(serie2)
		this.chart.series[2].setData(serie3)
		this.chart.series[3].setData(serie4)
	}

	setDomain(domain) {
		this.domain = domain
	}
}