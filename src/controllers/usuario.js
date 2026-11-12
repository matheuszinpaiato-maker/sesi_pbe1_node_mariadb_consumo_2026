const db = require('../db');

const login = async (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?);';

    try {
        const [results] = await db.query(sql, [email, senha]);

        if (results.length == 0) {
            return res.status(404).json("Acesso negado, credenciais inválidas");
        }

        res.json(results);

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao realizar login' });
    }
}

const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const criar = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senha]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    await db.query(
      'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?',
      [nome, email, senha, id]
    );
    res.json({ mensagem: 'Atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const deletar = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuario WHERE id = ?', [id]);
    res.json({ mensagem: 'Removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { login, listar, criar, atualizar, deletar };