import { Router } from 'express'
import { config } from '../lib/config'
import mimeTypes from 'mime-types'
import path from 'path'
import fs from 'fs'

const router = Router()

router.get('/data', (req, res) => {
    const { coinId, firstDate, finallyDate, tests } = config.historyData

    const dateFirst = new Date(firstDate).getTime()
    const dateFinally = new Date(finallyDate).getTime()
    const percentageTrain = 100 - tests

    const days = (dateFinally - dateFirst) / 86400000

    const daysTrain = Math.floor(percentageTrain * days / 100)
    const daysTest = Math.floor(days - daysTrain)

    res.json({
        coinId,
        firstDate,
        finallyDate,
        tests,
        daysTrain,
        daysTest
    })
})

router.get('/download', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'dataModel.json')
    const existFile = fs.existsSync(filePath)

    if (!existFile) {
        return res.status(404).json({
            message: 'Todavia no se ha creado el archivo'
        })
    }

    // download file
    const mimeType = mimeTypes.lookup(filePath)

    res.setHeader('Content-Disposition', `attachment; filename=${filePath}`)
    res.setHeader('Content-Type', mimeType)
    res.download(filePath)
})

export default router