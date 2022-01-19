export default class PercentageData {
    constructor() {
        this.progressBar = document.getElementById('porcentage-data-progress')
        this.percentageValue = document.getElementById('porcentage-data-value')
    }

    setPercentage(percentage) {
        this.progressBar.setAttribute('aria-valuenow', percentage)
        this.progressBar.style.width = `${percentage}%`
        this.percentageValue.innerText = `${percentage}%`
    }
}