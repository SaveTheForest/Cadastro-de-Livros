import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livraria'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão estabelecida com o banco de dados.');
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/livros', (req, res) => {
    connection.query('SELECT * FROM livros', (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json(results);
    });
});

app.post('/livros', (req, res) => {
    const { nome, preco, descricao } = req.body;
    const livro = { nome, preco, descricao };
    connection.query('INSERT INTO livros SET ?', livro, (err, result) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

    });
});

app.put('/livros/:id', (req, res) => {
    const livroId = req.params.id;
    const { nome, preco, descricao } = req.body;
    const livro = { nome, preco, descricao };
    connection.query('UPDATE livros SET ? WHERE id = ?', [livro, livroId], (err) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Livro atualizado com sucesso' });
    });
});

app.delete('/livros/:id', (req, res) => {
    const livroId = req.params.id;
    connection.query('DELETE FROM livros WHERE id = ?', livroId, (err) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Livro excluído com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
