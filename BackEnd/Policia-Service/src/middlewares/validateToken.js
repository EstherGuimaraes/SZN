import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-temporario";

export default function validateToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ erro: "Token inválido" });
    }
}
