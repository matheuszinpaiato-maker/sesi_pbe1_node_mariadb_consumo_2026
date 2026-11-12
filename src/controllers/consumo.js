const db = require('../db');

const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM consumo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const criar = async (req, res) => {
  const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO consumo (usuarioId, local, equipamento, consumoKwh, mesReferencia, status) VALUES (?, ?, ?, ?, ?, ?)',
      [usuarioId, local, equipamento, consumoKwh, mesReferencia, status]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body;
  try {
    await db.query(
      'UPDATE consumo SET usuarioId = ?, local = ?, equipamento = ?, consumoKwh = ?, mesReferencia = ?, status = ? WHERE id = ?',
      [usuarioId, local, equipamento, consumoKwh, mesReferencia, status, id]
    );
    res.json({ mensagem: 'Atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const deletar = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM consumo WHERE id = ?', [id]);
    res.json({ mensagem: 'Removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { listar, criar, atualizar, deletar };