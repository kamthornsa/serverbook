import express from "express"
import pool from "../db/db.js"

const router = express.Router()
// CREATE TABLE publishers (
//     publisher_id integer NOT NULL,
//     publisher_name character varying(100) NOT NULL
// );

// อ่านข้อมูลจาก Table Publishers
router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM publishers")
        if (result.rows.length === 0) {
        return res.json({
            msg: "ไม่พบข้อมูลสำนักพิมพ์"
        })
        }
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({
        error: "Server Error"
        })
    }
    })

// อ่านข้อมูลจาก Table Publishers by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query("SELECT * FROM publishers WHERE publisher_id = $1", [id])
        if (result.rows.length === 0) {
        return res.json({
            msg: "ไม่พบข้อมูลสำนักพิมพ์"
        })
        }
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({
        error: "Server Error"
        })
    }
})

// สร้างข้อมูลใหม่ใน Table Publishers
router.post('/', async (req, res) => {
    const { publisher_name } = req.body
    try {
        const result = await pool.query("INSERT INTO publishers (publisher_name) VALUES ($1) RETURNING *", [publisher_name])
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({
            error: "Server Error"
        })
    }
})

export default router