import express from 'express';
import pool from '../db/db.js';

const router = express.Router();

// อ่านข้อมูลจาก Table Books
router.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    if (result.rows.length === 0) {
      return res.json({
        msg: "ไม่พบข้อมูลหนังสือ"
      });
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Server Error"
    });
  }
});

export default router;