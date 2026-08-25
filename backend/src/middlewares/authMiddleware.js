// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// 1. Middleware pour vérifier l'authentification (Token JWT)
exports.verifyToken = (req, res, next) => {
    try {
        // Le token est généralement envoyé dans le header "Authorization" sous la forme "Bearer <token>"
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
        }

        // On extrait le token (on retire "Bearer ")
        const token = authHeader.split(' ')[1];

        // On vérifie et on décode le token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // On attache les informations de l'utilisateur (id et role) à l'objet requête
        req.user = decoded;

        // Le token est valide, on passe au prochain middleware ou contrôleur
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Votre session a expiré. Veuillez vous reconnecter.' });
        }
        return res.status(401).json({ message: 'Token invalide.' });
    }
};

// 2. Middleware pour vérifier l'autorisation (Rôle ADMIN)
// Note : Ce middleware doit TOUJOURS être appelé APRÈS verifyToken
exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Accès interdit. Droits administrateur requis.' });
    }
    
    // L'utilisateur est bien admin, on continue
    next();
};