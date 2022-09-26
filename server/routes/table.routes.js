const Router = require('express')
const router = new Router()

const tableController = require('../controller/table.controller')

router.post('/row', tableController.createRow)
router.get('/row', tableController.getRows)
router.delete('/row/:id', tableController.deleteRow)

module.exports = router
