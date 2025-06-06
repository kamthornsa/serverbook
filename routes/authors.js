import express from "express"
import pool from "../db/db.js"

const router = express.Router()

// authors table structure
// CREATE TABLE authors (
//     author_id integer NOT NULL,
//     name character varying(100) NOT NULL,
//     birth_date date,
//     nationality character varying(50)
// );

// อ่านข้อมูลจาก Table Authors
router.get('/', async (req , res) => {
  try {
    const result = await pool.query("SELECT * FROM authors")
    if(result.rows.length === 0) {
      return res.json ({
        msg: "ไม่พบข้อมูลผู้เขียน"
      })
    }
    res.json( result.rows)
  } catch (err) {
    res.status(500).json({
      error : "Server Error"
    })
  }
})

// อ่านข้อมูลจาก Table Authors by ID
router.get('/:id', async (req , res) => {
  const { id } = req.params
  try {
    const result = await pool.query("SELECT * FROM authors WHERE author_id = $1", [id])
    if(result.rows.length === 0) {
      return res.json ({
        msg: "ไม่พบข้อมูลผู้เขียน"
      })
    }
    res.json( result.rows)
  } catch (err) {
    res.status(500).json({
      error : "Server Error"
    })
  }
})

export default router
