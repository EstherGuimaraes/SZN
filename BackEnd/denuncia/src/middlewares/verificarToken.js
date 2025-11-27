import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-temporario";

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      erro: "Token não enviado",
      detalhes: "Adicione Authorization header com formato: Bearer <token>"
    });
  }

  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ 
      erro: "Token inválido ou mal formatado" 
    });
  }

  try {
    req.usuario = jwt.verify(token, SECRET);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        erro: "Token expirado" 
      });
    }
    return res.status(401).json({ 
      erro: "Token inválido",
      mensagem: error.message 
    });
  }
}
