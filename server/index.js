const express = require('express')
const cors = require('cors')
const path = require('path')
const tableRouter = require('./routes/table.routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', tableRouter)
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})