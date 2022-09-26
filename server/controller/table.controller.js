const db = require('../db')

class TableController {
	async createRow(req, res) {
		const { cur_date, title, amount, distance } = req.body
		const newRow = await db.query(
			'INSERT INTO test_rows (cur_date, title, amount, distance) values ($1, $2, $3, $4) RETURNING *',
			[cur_date, title, amount, distance]
		)
		res.json(newRow.rows[0])
	}

	async getRows(req, res) {
		if (req.query.limit && req.query.offset) {
			const rows = await db.query(`SELECT * FROM test_rows OFFSET ${req.query.offset} LIMIT ${req.query.limit}`)
			res.json(rows.rows)
		}
		else {
			const rows = await db.query(`SELECT * FROM test_rows`)
			res.json(rows.rows)
		}
	}

	async deleteRow(req, res) {
		const id = req.params.id
		const row = await db.query('DELETE FROM test_rows where id = $1', [id])
		res.json(row.rows)
	}
}

module.exports = new TableController()