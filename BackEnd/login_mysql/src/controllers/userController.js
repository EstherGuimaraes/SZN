import User from "../models/userModels.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar usuários", erro: error.message });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: error.message });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email) {
      return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
    }

    const novoUsuario = await User.create({ nome, email, senha });
    res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario: novoUsuario });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }
    res.status(500).json({ mensagem: "Erro ao criar usuário", erro: error.message });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    await usuario.save();

    res.json({ mensagem: "Usuário atualizado com sucesso", usuario });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar usuário", erro: error.message });
  }
};

export const excluirUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    await usuario.destroy();

    res.json({ mensagem: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir usuário", erro: error.message });
  }
};
