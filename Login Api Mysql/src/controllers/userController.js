const User = require("../models/userModels");

// Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

// Buscar usuário por ID
const buscarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

// Criar novo usuário
const criarUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoUsuario = await User.create({ nome, email });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

// Atualizar usuário
const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;
    const usuario = await User.findByPk(id);

    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

// Excluir usuário
const excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    await usuario.destroy();
    res.json({ mensagem: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

module.exports = { listarUsuarios, buscarUsuario, criarUsuario, atualizarUsuario, excluirUsuario };
