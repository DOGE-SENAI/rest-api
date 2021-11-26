const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest_api'
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/livros', (req, res) => {

    db.query("SELECT * FROM livros", (err, rows) => {
        res.send(rows);
    });
})

app.post('/livro/add', (req, res) => {
    const nome = req.body.nome;
    const autor = req.body.autor;
    const ano = req.body.ano;
    const img = req.body.img;

    db.query("INSERT INTO livros (nome, autor, ano, imagem) VALUES (?, ?, ?, ?);",
        [nome, autor, ano, img],
        (err, result) => {
            if (err) console.log(err);
        })
})

app.delete('/livro/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM livros WHERE id = ?", id);
})

app.listen(3001, () => {
    console.log("running on port 3001");
})