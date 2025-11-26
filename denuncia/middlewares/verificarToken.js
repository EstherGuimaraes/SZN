import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-temporario";

export function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ erro: "Token inválido ou mal formatado" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.usuario = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ erro: "Token inválido" });
    }
}
