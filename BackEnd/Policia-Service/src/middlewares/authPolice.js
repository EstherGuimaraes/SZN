export default function authPolice(req, res, next) {
    if (req.user.role !== "policia") {
        return res.status(403).json({ erro: "Acesso restrito aos policiais" });
    }
    next();
}