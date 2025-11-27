export default function authPolice(req, res, next) {
    const userRole = req.user?.role || req.user?.tipo;
    
    if (userRole !== "policia" && userRole !== "police") {
        return res.status(403).json({ 
            erro: "Acesso restrito",
            detalhes: "Apenas usuários com permissão de polícia podem acessar este recurso"
        });
    }
    
    next();
}