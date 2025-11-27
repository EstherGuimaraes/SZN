import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-temporario";

export default function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ 
            erro: "Token não fornecido",
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
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ erro: "Token expirado" });
        }
        return res.status(401).json({ 
            erro: "Token inválido",
            mensagem: err.message 
        });
    }
}
