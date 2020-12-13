const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');

router.get('/', (req, res) => {
    postgres.query('SELECT * FROM notes ORDER BY id ASC;', (err, results) => {
        res.json(results.rows)
    });
});

router.post('/', (req, res) => {
    postgres.query(`INSERT INTO notes (name, age) VALUES ('${req.body.name}', ${req.body.age})`, (err, results) => {
        postgres.query('SELECT * FROM notes ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

router.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM notes WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM notes ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router.put('/:id', (req, res) => {
    postgres.query(`UPDATE notes SET name = '${req.body.name}', AGE = ${req.body.age} WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM notes ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

module.exports = router;