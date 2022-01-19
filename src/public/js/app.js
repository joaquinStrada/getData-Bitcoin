import Model from './Model.js'
import View from './View.js'


document.addEventListener('DOMContentLoaded', () => {
    const model = new Model()
    const view = new View()

    model.setView(view)
    view.setModel(model)

    model.render()
})